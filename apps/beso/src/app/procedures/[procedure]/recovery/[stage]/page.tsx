import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ProcedureContentPage } from '../../../../components';
import { getProcedureBySlug, getProcedures, getRecoveryStage } from '../../../../lib/procedures';
import { buildPageMetadata, buildWebPageJsonLd } from '../../../../lib/seo';

type RecoveryStagePageProps = {
  params: Promise<{ procedure: string; stage: string }>;
};

export async function generateStaticParams() {
  const procedures = await getProcedures();
  return procedures.flatMap((procedure) =>
    procedure.recoveryStages.map((stage) => ({
      procedure: procedure.slug,
      stage: stage.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: RecoveryStagePageProps): Promise<Metadata> {
  const { procedure, stage } = await params;
  const [procedureData, stageData] = await Promise.all([
    getProcedureBySlug(procedure),
    getRecoveryStage(procedure, stage),
  ]);
  if (!procedureData || !stageData) return {};

  return buildPageMetadata({
    title: `${procedureData.name} ${stageData.name} Recovery | What to Expect`,
    description:
      stageData.content[0] ??
      `${procedureData.name} recovery stage details and aftercare guidance.`,
    path: `/procedures/${procedureData.slug}/recovery/${stageData.slug}`,
    imageUrl: procedureData.imageUrl,
    keywords: [
      `${procedureData.name} ${stageData.name.toLowerCase()} recovery`,
      'post filler care',
      'recovery do and avoid list',
      'treatment recovery stage',
    ],
  });
}

export default async function RecoveryStagePage({ params }: RecoveryStagePageProps) {
  const { procedure, stage } = await params;
  const [procedureData, stageData] = await Promise.all([
    getProcedureBySlug(procedure),
    getRecoveryStage(procedure, stage),
  ]);

  if (!procedureData || !stageData) {
    notFound();
  }

  const firstComplicationPath = procedureData.complications[0]
    ? `/procedures/${procedureData.slug}/complications/${procedureData.complications[0].slug}`
    : `/procedures/${procedureData.slug}`;

  return (
    <ProcedureContentPage
      title={`${procedureData.name} Recovery - ${stageData.name}`}
      imageUrl={procedureData.imageUrl}
      imageAlt={procedureData.imageAlt}
      introParagraphs={stageData.content}
      relatedLinks={[
        {
          label: 'See procedure',
          href: `/procedures/${procedureData.slug}`,
          description: 'Main procedure details and treatment goals.',
        },
        {
          label: 'See recovery overview',
          href: `/procedures/${procedureData.slug}/recovery`,
          description: 'Full aftercare overview and planning notes.',
        },
        {
          label: 'See complications',
          href: firstComplicationPath,
          description: 'Risk awareness and provider contact triggers.',
        },
      ]}
      sections={[
        { title: 'Do', type: 'list', content: stageData.dos },
        { title: 'Avoid', type: 'list', content: stageData.donts },
      ]}
      structuredData={[
        buildWebPageJsonLd({
          title: `${procedureData.name} Recovery ${stageData.name}`,
          description:
            stageData.content[0] ??
            `${procedureData.name} recovery stage ${stageData.name}`,
          path: `/procedures/${procedureData.slug}/recovery/${stageData.slug}`,
          imageUrl: procedureData.imageUrl,
        }),
      ]}
    />
  );
}
