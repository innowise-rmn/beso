import type { Metadata } from 'next';

const SITE_URL = 'https://besoaesthetics.com';
const SITE_NAME = 'Beso Intelligence Network';

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  imageUrl?: string;
  keywords?: string[];
};

export function buildPageMetadata({
  title,
  description,
  path,
  imageUrl,
  keywords = [],
}: BuildMetadataInput): Metadata {
  const canonical = `${SITE_URL}${path}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      type: 'article',
      url: canonical,
      title,
      description,
      siteName: SITE_NAME,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

type BuildWebPageJsonLdInput = {
  title: string;
  description: string;
  path: string;
  imageUrl?: string;
};

export function buildWebPageJsonLd({
  title,
  description,
  path,
  imageUrl,
}: BuildWebPageJsonLdInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: title,
    description,
    url: `${SITE_URL}${path}`,
    image: imageUrl,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
  };
}

export function buildFaqJsonLd(
  faq: Array<{ question: string; answer: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
