export type Complication = {
  slug: string;
  name: string;
  content: string[];
  preventionTips: string[];
  whenToCall: string[];
};

export type RecoveryStage = {
  slug: string;
  name: string;
  content: string[];
  dos: string[];
  donts: string[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Procedure = {
  slug: string;
  name: string;
  imageUrl: string;
  imageAlt: string;
  overview: string[];
  benefits: string[];
  idealCandidates: string[];
  preparation: string[];
  recoveryOverview: string[];
  aftercareTips: string[];
  faq: FaqItem[];
  complications: Complication[];
  recoveryStages: RecoveryStage[];
};

const procedures: Procedure[] = [
  {
    slug: 'lipsFilling',
    name: 'Lips Filling',
    imageUrl:
      'https://besoaesthetics.com/wp-content/uploads/sites/295/2025/03/lip-filler_AdobeStock_307742356-min-scaled_webp-1024x683.jpg.webp',
    imageAlt: 'Close-up of enhanced lips after filler treatment',
    overview: [
      'Lip fillers use injectable dermal filler, usually hyaluronic acid, to add volume, refine borders, and improve lip symmetry.',
      'Treatment is personalized after a consultation that reviews facial balance, goals, medical history, and prior injectable experience.',
      'Appointments are typically around 30 minutes, with careful placement in small amounts for natural movement and expression.',
      'Results are visible immediately, then continue to refine as early swelling settles over the next several days.',
      'Because most fillers are HA-based, the lips maintain softness while appearing hydrated and naturally contoured.',
      'Many patients use periodic maintenance sessions to preserve a balanced, subtle enhancement over time.',
    ],
    benefits: [
      'Improves lip volume without surgery',
      'Enhances lip border definition and shape',
      'Supports better upper-to-lower lip balance',
      'Can soften fine lines around the mouth area',
      'Has minimal downtime for most patients',
      'Is adjustable and temporary compared to permanent procedures',
    ],
    idealCandidates: [
      'Adults seeking fuller or better-defined lips with non-surgical treatment',
      'Patients with naturally thin lips or age-related volume loss',
      'People wanting improved symmetry and contour',
      'Individuals in good overall health with realistic expectations',
      'Patients willing to follow aftercare and attend follow-up if needed',
    ],
    preparation: [
      'Share your full medical history, allergy details, and prior injectable treatments.',
      'Arrive with clean skin and avoid irritating lip products before treatment.',
      'Discuss your target shape and fullness using reference goals during consultation.',
      'Plan around social events because mild swelling or bruising can occur for a few days.',
    ],
    recoveryOverview: [
      'Recovery is usually minimal, and many patients return to normal daily activity shortly after treatment.',
      'Temporary swelling, tenderness, redness, or bruising can occur and generally improve quickly within the first few days.',
      'High-intensity exercise and pressure on the lips are often postponed briefly to reduce irritation during early healing.',
      'Final appearance is easier to judge once swelling resolves, while hydration and gentle care support comfort.',
      'In many cases, early asymmetry improves naturally during settling and does not require immediate correction.',
      'A short follow-up window is useful for evaluating final contour and deciding whether touch-up is appropriate.',
    ],
    aftercareTips: [
      'Use intermittent cool compresses on day one to reduce swelling comfortably.',
      'Stay hydrated and avoid prolonged sun/heat exposure for the first 24 hours.',
      'Avoid lip pressure, aggressive massage, and high-intensity workouts initially.',
      'Sleep with your head slightly elevated the first night when possible.',
      'Contact your injector promptly if symptoms feel unusual or progressively worse.',
    ],
    faq: [
      {
        question: 'How long does a lip filler appointment usually take?',
        answer:
          'Most sessions are around 30 minutes, though timing can vary with assessment and treatment complexity.',
      },
      {
        question: 'When do final results become clear?',
        answer:
          'You can see immediate volume, but the more representative result appears after early swelling settles over several days.',
      },
      {
        question: 'How long can results last?',
        answer:
          'Duration varies by product choice and individual metabolism, but many patients maintain results with periodic follow-up.',
      },
      {
        question: 'Can lip filler look natural?',
        answer:
          'Yes. Conservative placement and anatomy-based planning can preserve natural movement and avoid an overfilled look.',
      },
    ],
    complications: [
      {
        slug: 'swelling',
        name: 'Swelling',
        content: [
          'Temporary swelling is one of the most common short-term effects after lip filler and is typically mild.',
          'Swelling is usually most noticeable during the first 24-72 hours, then improves gradually.',
          'Applying cold compresses, staying hydrated, and avoiding unnecessary pressure can help with comfort.',
          'If swelling appears severe, worsens after initial improvement, or comes with unusual pain, follow-up assessment is recommended.',
          'Mild asymmetry can accompany swelling early and often resolves as tissue inflammation decreases.',
        ],
        preventionTips: [
          'Use conservative filler volume and staged treatment when needed.',
          'Avoid strenuous activity and heat exposure immediately after treatment.',
          'Follow all post-treatment care instructions during the first 48 hours.',
        ],
        whenToCall: [
          'Swelling is significantly increasing after day two',
          'Pain is intense, persistent, or not improving',
          'Skin color changes or unusual symptoms appear',
        ],
      },
      {
        slug: 'bruising',
        name: 'Bruising',
        content: [
          'Small bruises at injection points can happen even with careful injection technique.',
          'Most bruising fades naturally over several days to about one week.',
          'Early tenderness in bruised areas is expected and usually decreases as color changes resolve.',
          'Conservative treatment planning and aftercare adherence help reduce the chance and visibility of bruising.',
          'Color transition from purple/blue to yellow-green is a normal part of bruise resolution.',
        ],
        preventionTips: [
          'Use a gentle post-treatment routine and avoid repeated pressure on treated areas.',
          'Keep follow-up timing flexible if you need to heal before events or photography.',
          'Work with an experienced injector using anatomy-aware technique.',
        ],
        whenToCall: [
          'Bruising keeps expanding rather than stabilizing',
          'Tenderness sharply worsens instead of gradually improving',
          'Any symptom feels atypical compared with expected recovery',
        ],
      },
    ],
    recoveryStages: [
      {
        slug: 'day-1',
        name: 'Day 1',
        content: [
          'Expect immediate plumping with early swelling and mild tenderness.',
          'Redness near injection points can appear and usually remains temporary.',
          'Avoid strenuous exercise, heat exposure, and pressure on the lips for the initial period.',
          'Use gentle care and hydration while the filler settles into the treated areas.',
          'Do not judge final shape during this stage because inflammation is still active.',
        ],
        dos: [
          'Apply cool compresses in short intervals',
          'Drink water consistently throughout the day',
          'Keep post-treatment care simple and gentle',
        ],
        donts: [
          'Do not perform vigorous workouts immediately',
          'Do not use excessive heat exposure',
          'Do not press or manipulate the lips repeatedly',
        ],
      },
      {
        slug: 'week-1',
        name: 'Week 1',
        content: [
          'Swelling and bruising usually continue to improve, and lip contours become more representative of the result.',
          'Movement and softness should feel increasingly natural as tissue irritation decreases.',
          'If needed, this is a useful checkpoint to review symmetry, shape goals, and whether refinement is desired later.',
          'Any persistent or unusual symptoms should be reviewed promptly with your injector.',
          'By the end of the week, most patients feel more confident evaluating the final aesthetic direction.',
        ],
        dos: [
          'Continue hydration and gentle skincare',
          'Document progress photos in consistent lighting',
          'Schedule review if contour adjustments are desired',
        ],
        donts: [
          'Do not over-correct based on early impressions',
          'Do not skip consultation if concerns persist',
          'Do not assume persistent discomfort is normal',
        ],
      },
    ],
  },
];

const wait = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

export async function getProcedures() {
  await wait(200);
  return [...procedures];
}

export async function getProcedureBySlug(procedureSlug: string) {
  await wait(200);
  return procedures.find((procedure) => procedure.slug === procedureSlug) ?? null;
}

export async function getComplication(
  procedureSlug: string,
  complicationSlug: string
) {
  await wait(200);
  const procedure = procedures.find((item) => item.slug === procedureSlug);
  if (!procedure) return null;

  return (
    procedure.complications.find((item) => item.slug === complicationSlug) ?? null
  );
}

export async function getRecoveryStage(procedureSlug: string, stageSlug: string) {
  await wait(200);
  const procedure = procedures.find((item) => item.slug === procedureSlug);
  if (!procedure) return null;

  return procedure.recoveryStages.find((item) => item.slug === stageSlug) ?? null;
}
