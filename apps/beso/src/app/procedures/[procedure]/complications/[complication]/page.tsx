import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ProcedureContentPage } from '../../../../components';
import { getComplication, getProcedureBySlug, getProcedures } from '../../../../lib/procedures';
import { buildPageMetadata, buildWebPageJsonLd } from '../../../../lib/seo';

type ComplicationPageProps = {
  params: Promise<{ procedure: string; complication: string }>;
};

export async function generateStaticParams() {
  const procedures = await getProcedures();
  return procedures.flatMap((procedure) =>
    procedure.complications.map((complication) => ({
      procedure: procedure.slug,
      complication: complication.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: ComplicationPageProps): Promise<Metadata> {
  const { procedure, complication } = await params;
  const [procedureData, complicationData] = await Promise.all([
    getProcedureBySlug(procedure),
    getComplication(procedure, complication),
  ]);
  if (!procedureData || !complicationData) return {};

  return buildPageMetadata({
    title: `${procedureData.name} ${complicationData.name} | Causes, Prevention, and Guidance`,
    description:
      complicationData.content[0] ??
      `${procedureData.name} ${complicationData.name} overview and safety guidance.`,
    path: `/procedures/${procedureData.slug}/complications/${complicationData.slug}`,
    imageUrl: procedureData.imageUrl,
    keywords: [
      `${procedureData.name} ${complicationData.name.toLowerCase()}`,
      'injectable complication care',
      'filler safety guidance',
      'when to contact provider',
    ],
  });
}

export default async function ComplicationPage({ params }: ComplicationPageProps) {
  const { procedure, complication } = await params;
  const [procedureData, complicationData] = await Promise.all([
    getProcedureBySlug(procedure),
    getComplication(procedure, complication),
  ]);

  if (!procedureData || !complicationData) {
    notFound();
  }

  const firstRecoveryStagePath = procedureData.recoveryStages[0]
    ? `/procedures/${procedureData.slug}/recovery/${procedureData.recoveryStages[0].slug}`
    : `/procedures/${procedureData.slug}/recovery`;

  return (
    <ProcedureContentPage
      title={`${procedureData.name} Complication - ${complicationData.name}`}
      imageUrl={procedureData.imageUrl}
      imageAlt={procedureData.imageAlt}
      introParagraphs={complicationData.content}
      relatedLinks={[
        {
          label: 'See procedure',
          href: `/procedures/${procedureData.slug}`,
          description: 'Full procedure plan and candidate guidance.',
        },
        {
          label: 'See recovery',
          href: `/procedures/${procedureData.slug}/recovery`,
          description: 'Healing timeline and aftercare instructions.',
        },
        {
          label: 'See recovery stage',
          href: firstRecoveryStagePath,
          description: 'Detailed recovery actions for early healing.',
        },
      ]}
      sections={[
        {
          title: 'Prevention tips',
          type: 'list',
          content: complicationData.preventionTips,
        },
        {
          title: 'When to contact provider',
          type: 'list',
          content: complicationData.whenToCall,
        },
      ]}
      structuredData={[
        buildWebPageJsonLd({
          title: `${procedureData.name} Complication ${complicationData.name}`,
          description:
            complicationData.content[0] ??
            `${procedureData.name} complication guidance`,
          path: `/procedures/${procedureData.slug}/complications/${complicationData.slug}`,
          imageUrl: procedureData.imageUrl,
        }),
      ]}
    />
  );
}
