import Link from 'next/link';

import { NestedHeader } from './nested-header';

export type ContentSection =
  | {
      title: string;
      type: 'paragraphs';
      content: string[];
    }
  | {
      title: string;
      type: 'list';
      content: string[];
    }
  | {
      title: string;
      type: 'qa';
      content: Array<{ question: string; answer: string }>;
    };

type ProcedureContentPageProps = {
  title: string;
  imageUrl: string;
  imageAlt: string;
  introParagraphs: string[];
  sections: ContentSection[];
  relatedLinks?: Array<{
    label: string;
    href: string;
    description?: string;
  }>;
  structuredData?: Record<string, unknown>[];
};

export function ProcedureContentPage({
  title,
  imageUrl,
  imageAlt,
  introParagraphs,
  sections,
  relatedLinks = [],
  structuredData = [],
}: ProcedureContentPageProps) {
  return (
    <main className="min-h-screen bg-brief-bg text-brief-ink">
      <NestedHeader />
      <section className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-3xl font-semibold">{title}</h1>
        <img
          src={imageUrl}
          alt={imageAlt}
          className="mt-6 h-auto w-full rounded-2xl border border-brief-line object-cover"
        />
        <div className="mt-5 space-y-4 text-brief-muted">
          {introParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {relatedLinks.length > 0 ? (
          <div className="mt-8 rounded-2xl border border-brief-line bg-brief-panel p-5">
            <h2 className="text-lg font-medium">See also</h2>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              {relatedLinks.map((item) => (
                <Link
                  key={`${item.label}-${item.href}`}
                  href={item.href}
                  className="rounded-xl border border-brief-line px-4 py-3 transition hover:border-brief-accent"
                >
                  <p className="font-medium">{item.label}</p>
                  {item.description ? (
                    <p className="mt-1 text-sm text-brief-muted">
                      {item.description}
                    </p>
                  ) : null}
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {sections.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl border border-brief-line bg-brief-panel p-5 md:odd:col-span-1 md:even:col-span-1"
            >
              <h2 className="text-lg font-medium">{section.title}</h2>

              {section.type === 'list' ? (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-brief-muted">
                  {section.content.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}

              {section.type === 'paragraphs' ? (
                <div className="mt-3 space-y-3 text-brief-muted">
                  {section.content.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              ) : null}

              {section.type === 'qa' ? (
                <div className="mt-3 space-y-4">
                  {section.content.map((item) => (
                    <div key={item.question}>
                      <p className="font-medium">{item.question}</p>
                      <p className="mt-1 text-brief-muted">{item.answer}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {structuredData.map((item, index) => (
        <script
          key={`ld-${index + 1}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </main>
  );
}
