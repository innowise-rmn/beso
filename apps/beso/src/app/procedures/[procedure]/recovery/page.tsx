import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ProcedureContentPage } from '../../../components';
import { getProcedureBySlug, getProcedures } from '../../../lib/procedures';
import { buildPageMetadata, buildWebPageJsonLd } from '../../../lib/seo';

type RecoveryOverviewPageProps = {
  params: Promise<{ procedure: string }>;
};

export async function generateStaticParams() {
  const procedures = await getProcedures();
  return procedures.map((procedure) => ({ procedure: procedure.slug }));
}

export async function generateMetadata({
  params,
}: RecoveryOverviewPageProps): Promise<Metadata> {
  const { procedure } = await params;
  const data = await getProcedureBySlug(procedure);
  if (!data) return {};

  return buildPageMetadata({
    title: `${data.name} Recovery Guide | Aftercare and Timeline`,
    description:
      data.recoveryOverview[0] ??
      `${data.name} recovery expectations, aftercare guidance, and timeline.`,
    path: `/procedures/${data.slug}/recovery`,
    imageUrl: data.imageUrl,
    keywords: [
      `${data.name} recovery`,
      'lip filler aftercare',
      'post treatment recovery',
      'swelling and bruising timeline',
    ],
  });
}

export default async function RecoveryOverviewPage({
  params,
}: RecoveryOverviewPageProps) {
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
      title={`${data.name} Recovery`}
      imageUrl={data.imageUrl}
      imageAlt={data.imageAlt}
      introParagraphs={data.recoveryOverview}
      relatedLinks={[
        {
          label: 'See procedure',
          href: `/procedures/${data.slug}`,
          description: 'Treatment overview, benefits, and FAQs.',
        },
        {
          label: 'See complications',
          href: firstComplicationPath,
          description: 'Swelling, bruising, and escalation guidance.',
        },
        {
          label: 'See recovery stages',
          href: firstRecoveryStagePath,
          description: 'Stage-by-stage recovery details.',
        },
      ]}
      sections={[
        { title: 'Aftercare tips', type: 'list', content: data.aftercareTips },
        {
          title: 'Pre-treatment planning',
          type: 'list',
          content: data.preparation,
        },
      ]}
      structuredData={[
        buildWebPageJsonLd({
          title: `${data.name} Recovery`,
          description: data.recoveryOverview[0] ?? `${data.name} recovery guide`,
          path: `/procedures/${data.slug}/recovery`,
          imageUrl: data.imageUrl,
        }),
      ]}
    />
  );
}
