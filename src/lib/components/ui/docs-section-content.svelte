<script lang="ts">
  import { resolve } from "$app/paths";
  import { getDocsSubsectionId, type DocsSection } from "$lib/content/docs";
  import { shouldResolveInternalHref } from "$lib/config/site";

  let {
    section,
    id,
  }: {
    section: DocsSection;
    id: string;
  } = $props();

  const calloutToneClasses = {
    note: "docs-callout docs-callout-note",
    tip: "docs-callout docs-callout-tip",
    warning: "docs-callout docs-callout-warning",
  } as const;
  const resolvePath = resolve as unknown as (path: string) => string;

  function getExampleHref(href: string): string {
    return shouldResolveInternalHref(href) ? resolvePath(href) : href;
  }
</script>

<section {id} class="scroll-mt-28 space-y-5">
  <div class="max-w-4xl">
    <div class="flex flex-wrap items-start justify-between gap-3">
      <h2 class="text-3xl font-semibold tracking-tight text-color sm:text-5xl">
        {section.heading}
      </h2>
      <a
        href={`#${id}`}
        aria-label={`Link to section ${section.heading}`}
        class="inline-flex shrink-0 items-center rounded-full border border-surface-300 px-2.5 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-brand-muted transition-colors hover:border-primary-300 hover:text-color"
      >
        Link
      </a>
    </div>

    {#if section.summary}
      <p class="mt-3 text-lg leading-8 text-brand-body">
        {section.summary}
      </p>
    {/if}

    {#if section.paragraphs?.length}
      <div class="mt-5 space-y-4 text-lg leading-8 text-color">
        {#each section.paragraphs as paragraph (paragraph)}
          <p>{paragraph}</p>
        {/each}
      </div>
    {/if}

    {#if section.bullets}
      <ul
        class="mt-6 list-disc space-y-4 pl-8 text-lg leading-8 text-color marker:text-primary-500"
      >
        {#each section.bullets as bullet (bullet)}
          <li>{bullet}</li>
        {/each}
      </ul>
    {/if}

    {#if section.subsections}
      <div class="mt-8 space-y-8">
        {#each section.subsections as subsection (subsection.heading)}
          <section
            id={getDocsSubsectionId(section.heading, subsection.heading)}
            class="scroll-mt-28 space-y-4"
          >
            <div class="flex flex-wrap items-start justify-between gap-3">
              <h3
                class="text-[1.2rem] font-semibold leading-tight text-color sm:text-[1.35rem]"
              >
                {subsection.heading}
              </h3>
              <a
                href={`#${getDocsSubsectionId(section.heading, subsection.heading)}`}
                aria-label={`Link to subsection ${subsection.heading}`}
                class="inline-flex shrink-0 items-center rounded-full border border-surface-300 px-2.5 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-brand-muted transition-colors hover:border-primary-300 hover:text-color"
              >
                Link
              </a>
            </div>

            {#if subsection.paragraphs?.length}
              <div class="space-y-4 text-lg leading-8 text-color">
                {#each subsection.paragraphs as paragraph (paragraph)}
                  <p>{paragraph}</p>
                {/each}
              </div>
            {/if}

            {#if subsection.bullets?.length}
              <ul
                class="list-disc space-y-3 pl-8 text-lg leading-8 text-color marker:text-primary-500"
              >
                {#each subsection.bullets as bullet (bullet)}
                  <li>{bullet}</li>
                {/each}
              </ul>
            {/if}
          </section>
        {/each}
      </div>
    {/if}

    {#if section.table}
      <div
        class="card preset-filled-surface-50-950 mt-8 overflow-hidden rounded-[1.25rem] border border-surface-200-800 shadow-sm"
      >
        <div class="overflow-x-auto">
          <table
            class="min-w-full border-collapse text-left text-sm leading-6 text-surface-100"
          >
            <thead class="preset-tonal-surface border-b border-surface-200-800">
              <tr>
                {#each section.table.columns as column (column)}
                  <th class="px-4 py-3 font-semibold text-surface-50"
                    >{column}</th
                  >
                {/each}
              </tr>
            </thead>
            <tbody>
              {#each section.table.rows as row, index (`${row[0]}-${index}`)}
                <tr class="border-b border-surface-200-800 last:border-b-0">
                  {#each row as cell, cellIndex (`${cellIndex}-${cell}`)}
                    <td
                      class={`align-top px-4 py-3 ${
                        cellIndex === 0
                          ? "font-semibold text-surface-50"
                          : "text-surface-100"
                      }`}
                    >
                      {cell}
                    </td>
                  {/each}
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    {/if}

    {#if section.callout}
      <div
        class={`card mt-8 rounded-[1.25rem] border px-5 py-4 ${
          calloutToneClasses[section.callout.tone ?? "note"]
        }`}
      >
        <p class="docs-callout-label text-sm font-semibold uppercase tracking-[0.18em]">
          {section.callout.tone ?? "note"}
        </p>
        <h3 class="mt-2 text-lg font-semibold">{section.callout.title}</h3>
        <p class="docs-callout-copy mt-2 text-sm leading-6">
          {section.callout.body}
        </p>
      </div>
    {/if}

    {#if section.codeSample}
      <div
        class="card preset-filled-surface-950-50 mt-8 overflow-hidden rounded-[1.25rem] border border-surface-700-300 shadow-sm"
      >
        <div
          class="flex items-center justify-between gap-3 border-b border-surface-700-300 px-4 py-3"
        >
          <p class="text-sm font-semibold">{section.codeSample.label}</p>
          <span
            class="text-xs uppercase tracking-[0.18em] text-surface-300-700"
          >
            {section.codeSample.language ?? "text"}
          </span>
        </div>
        <pre class="overflow-x-auto px-4 py-4 text-sm leading-6"><code
            >{section.codeSample.code}</code
          ></pre>
      </div>
    {/if}

    {#if section.example}
      <details
        class="card preset-filled-surface-50-950 mt-8 rounded-[1.25rem] border border-surface-200-800 px-5 py-4 shadow-sm"
      >
        <summary
          class="cursor-pointer list-none text-base font-semibold text-surface-50"
        >
          {section.example.title}
        </summary>
        <p class="mt-3 text-sm leading-6 text-surface-100">
          {section.example.summary}
        </p>

        <ol class="mt-4 space-y-3">
          {#each section.example.steps as step, index (step)}
            <li class="flex gap-3 text-sm leading-6 text-surface-100">
              <span
                class="badge preset-filled-primary-500 mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-surface-950"
              >
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          {/each}
        </ol>

        {#if section.example.ctaHref && section.example.ctaLabel}
          <!-- eslint-disable svelte/no-navigation-without-resolve -->
          <a
            href={getExampleHref(section.example.ctaHref)}
            class="btn btn-sm preset-filled-primary-500 mt-5 inline-flex w-fit rounded-full text-surface-950"
          >
            {section.example.ctaLabel}
          </a>
          <!-- eslint-enable svelte/no-navigation-without-resolve -->
        {/if}
      </details>
    {/if}
  </div>
</section>
