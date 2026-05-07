import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ProcedureContentPage } from '../../components';
import { getProcedureBySlug, getProcedures } from '../../lib/procedures';
import { buildFaqJsonLd, buildPageMetadata, buildWebPageJsonLd } from '../../lib/seo';

type ProcedurePageProps = {
  params: Promise<{ procedure: string }>;
};

export async function generateStaticParams() {
  const procedures = await getProcedures();
  return procedures.map((procedure) => ({ procedure: procedure.slug }));
}

export async function generateMetadata({
  params,
}: ProcedurePageProps): Promise<Metadata> {
  const { procedure } = await params;
  const data = await getProcedureBySlug(procedure);
  if (!data) return {};

  return buildPageMetadata({
    title: `${data.name} NYC | Benefits, Candidates, and FAQs`,
    description:
      data.overview[0] ??
      `${data.name} overview, treatment details, candidate guidance, and recovery expectations.`,
    path: `/procedures/${data.slug}`,
    imageUrl: data.imageUrl,
    keywords: [
      `${data.name} nyc`,
      'lip filler consultation',
      'hyaluronic acid filler',
      'lip augmentation recovery',
      'med spa injectables',
    ],
  });
}

export default async function ProcedurePage({ params }: ProcedurePageProps) {
  const { procedure } = await params;
  const data = await getProcedureBySlug(procedure);

  if (!data) {
    notFound();
  }

  const firstComplicationPath = data.complications[0]
    ? `/procedures/${data.slug}/complications/${data.complications[0].slug}`
    : `/procedures/${data.slug}`;
  const firstRecoveryStagePath = data.recoveryStages[0]
    ? `/procedures/${data.slug}/recovery/${data.recoveryStages[0].slug}`
    : `/procedures/${data.slug}/recovery`;

  return (
    <ProcedureContentPage
      title={data.name}
      imageUrl={data.imageUrl}
      imageAlt={data.imageAlt}
      introParagraphs={data.overview}
      relatedLinks={[
        {
          label: 'See recovery',
          href: `/procedures/${data.slug}/recovery`,
          description: 'Post-treatment timeline and aftercare guidance.',
        },
        {
          label: 'See complications',
          href: firstComplicationPath,
          description: 'Common side effects and when to contact provider.',
        },
        {
          label: 'See day 1 recovery',
          href: firstRecoveryStagePath,
          description: 'What to expect in the first 24 hours.',
        },
      ]}
      sections={[
        { title: 'Benefits', type: 'list', content: data.benefits },
        {
          title: 'Ideal candidates',
          type: 'list',
          content: data.idealCandidates,
        },
        { title: 'Preparation', type: 'list', content: data.preparation },
        { title: 'FAQ', type: 'qa', content: data.faq },
      ]}
      structuredData={[
        buildWebPageJsonLd({
          title: `${data.name} Procedure`,
          description: data.overview[0] ?? `${data.name} procedure overview`,
          path: `/procedures/${data.slug}`,
          imageUrl: data.imageUrl,
        }),
        buildFaqJsonLd(data.faq),
      ]}
    />
  );
}
