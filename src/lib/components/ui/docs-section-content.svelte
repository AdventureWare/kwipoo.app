<script lang="ts">
  import { resolve } from "$app/paths";
  import type { Pathname } from "$app/types";
  import type { DocsSection } from "$lib/content/docs";
  import { isExternalHref } from "$lib/config/site";

  let {
    section,
    id,
  }: {
    section: DocsSection;
    id: string;
  } = $props();

  const calloutToneClasses = {
    note: "preset-tonal-tertiary border-tertiary-200-800 text-color",
    tip: "preset-tonal-success border-success-200-800 text-color",
    warning: "preset-tonal-warning border-warning-200-800 text-color",
  } as const;

  function getExampleHref(href: string): string {
    return isExternalHref(href) ? href : resolve(href as Pathname);
  }
</script>

<section
  {id}
  class="scroll-mt-28 space-y-5"
>
  <div class="max-w-4xl">
    <h2
      class="text-3xl font-semibold tracking-tight text-color sm:text-5xl"
    >
      {section.heading}
    </h2>

    {#if section.summary}
      <p class="mt-3 text-lg leading-8 text-brand-body">
        {section.summary}
      </p>
    {/if}

    <div class="mt-5 space-y-4 text-lg leading-8 text-color">
      {#each section.paragraphs as paragraph (paragraph)}
        <p>{paragraph}</p>
      {/each}
    </div>

    {#if section.bullets}
      <ul
        class="mt-6 list-disc space-y-4 pl-8 text-lg leading-8 text-color marker:text-primary-500"
      >
        {#each section.bullets as bullet (bullet)}
          <li>{bullet}</li>
        {/each}
      </ul>
    {/if}

    {#if section.callout}
      <div
        class={`card mt-8 rounded-[1.25rem] border px-5 py-4 ${
          calloutToneClasses[section.callout.tone ?? "note"]
        }`}
      >
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-brand-muted">
          {section.callout.tone ?? "note"}
        </p>
        <h3 class="mt-2 text-lg font-semibold">{section.callout.title}</h3>
        <p class="mt-2 text-sm leading-6 text-color">{section.callout.body}</p>
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
          <span class="text-xs uppercase tracking-[0.18em] text-surface-300-700">
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
          class="cursor-pointer list-none text-base font-semibold text-color"
        >
          {section.example.title}
        </summary>
        <p class="mt-3 text-sm leading-6 text-color">
          {section.example.summary}
        </p>

        <ol class="mt-4 space-y-3">
          {#each section.example.steps as step, index (step)}
            <li class="flex gap-3 text-sm leading-6 text-color">
              <span
                class="badge preset-filled-primary-500 mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
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
            class="btn btn-sm preset-filled-primary-500 mt-5 inline-flex w-fit rounded-full"
          >
            {section.example.ctaLabel}
          </a>
          <!-- eslint-enable svelte/no-navigation-without-resolve -->
        {/if}
      </details>
    {/if}
  </div>
</section>
