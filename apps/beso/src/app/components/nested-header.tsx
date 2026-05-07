import Link from 'next/link';

import { getProcedures } from '../lib/procedures';

export async function NestedHeader() {
  const procedures = await getProcedures();

  return (
    <header className="sticky top-0 z-40 border-b border-brief-line bg-brief-bg/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-brief-line bg-brief-panel text-sm font-semibold text-brief-accent transition group-hover:border-brief-accent">
            B
          </span>
          <p className="text-sm font-semibold tracking-display">BESO Intelligence Network</p>
        </Link>

        <nav className="flex items-center gap-2">
          <div className="group relative">
            <button className="rounded-full border border-brief-line bg-brief-panel px-4 py-2 text-sm font-medium text-brief-muted transition hover:border-brief-accent hover:text-brief-ink">
              Procedures
            </button>
            <div className="invisible absolute right-0 top-full z-10 min-w-64 pt-2 opacity-0 transition duration-150 group-hover:visible group-hover:opacity-100">
              <div className="rounded-2xl border border-brief-line bg-brief-panel p-2 shadow-panel">
                {procedures.map((procedure) => (
                  <Link
                    key={procedure.slug}
                    href={`/procedures/${procedure.slug}`}
                    className="block rounded-xl px-3 py-2 text-sm text-brief-muted transition hover:bg-brief-line/40 hover:text-brief-ink"
                  >
                    {procedure.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="group relative">
            <button className="rounded-full border border-brief-line bg-brief-panel px-4 py-2 text-sm font-medium text-brief-muted transition hover:border-brief-accent hover:text-brief-ink">
              Complications
            </button>
            <div className="invisible absolute right-0 top-full z-10 min-w-96 pt-2 opacity-0 transition duration-150 group-hover:visible group-hover:opacity-100">
              <div className="rounded-2xl border border-brief-line bg-brief-panel p-2 shadow-panel">
                {procedures.map((procedure) => (
                  <div
                    key={procedure.slug}
                    className="mb-2 rounded-xl border border-brief-line/70 bg-brief-bg/30 p-2 last:mb-0"
                  >
                    <p className="px-2 pb-1 text-xs uppercase tracking-display text-brief-accent">
                      {procedure.name}
                    </p>
                    {procedure.complications.map((complication) => (
                      <Link
                        key={`${procedure.slug}-${complication.slug}`}
                        href={`/procedures/${procedure.slug}/complications/${complication.slug}`}
                        className="ml-2 block rounded-lg px-3 py-1.5 text-sm text-brief-muted transition hover:bg-brief-line/40 hover:text-brief-ink"
                      >
                        {complication.name}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="group relative">
            <button className="rounded-full border border-brief-line bg-brief-panel px-4 py-2 text-sm font-medium text-brief-muted transition hover:border-brief-accent hover:text-brief-ink">
              Recovery
            </button>
            <div className="invisible absolute right-0 top-full z-10 min-w-96 pt-2 opacity-0 transition duration-150 group-hover:visible group-hover:opacity-100">
              <div className="rounded-2xl border border-brief-line bg-brief-panel p-2 shadow-panel">
                {procedures.map((procedure) => (
                  <div
                    key={procedure.slug}
                    className="mb-2 rounded-xl border border-brief-line/70 bg-brief-bg/30 p-2 last:mb-0"
                  >
                    <p className="px-2 pb-1 text-xs uppercase tracking-display text-brief-accent">
                      {procedure.name}
                    </p>
                    <Link
                      href={`/procedures/${procedure.slug}/recovery`}
                      className="ml-2 block rounded-lg px-3 py-1.5 text-sm text-brief-muted transition hover:bg-brief-line/40 hover:text-brief-ink"
                    >
                      Overview
                    </Link>
                    {procedure.recoveryStages.map((stage) => (
                      <Link
                        key={`${procedure.slug}-${stage.slug}`}
                        href={`/procedures/${procedure.slug}/recovery/${stage.slug}`}
                        className="ml-2 block rounded-lg px-3 py-1.5 text-sm text-brief-muted transition hover:bg-brief-line/40 hover:text-brief-ink"
                      >
                        {stage.name}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
