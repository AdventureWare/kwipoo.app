<script lang="ts">
  import { onMount } from "svelte";
  import { resolve } from "$app/paths";
  import {
    ANALYTICS_CONSENT_CHANGED_EVENT,
    ANALYTICS_CONSENT_SETTINGS_EVENT,
    getAnalyticsConsentPreference,
    isGlobalPrivacyControlEnabled,
    setAnalyticsConsentPreference,
    type AnalyticsConsentChangedDetail,
    type AnalyticsConsentPreference,
  } from "$lib/analytics/consent";

  let isVisible = $state(false);
  let preference = $state<AnalyticsConsentPreference | undefined>();
  let isGpcEnabled = $state(false);

  function syncPreferenceState(): void {
    preference = getAnalyticsConsentPreference();
    isGpcEnabled = isGlobalPrivacyControlEnabled();
    isVisible = !isGpcEnabled && preference === undefined;
  }

  function choosePreference(nextPreference: AnalyticsConsentPreference): void {
    setAnalyticsConsentPreference(nextPreference);
    preference = nextPreference;
    isVisible = false;
  }

  function openSettings(): void {
    syncPreferenceState();
    isVisible = true;
  }

  function handleConsentChanged(event: Event): void {
    const { detail } = event as CustomEvent<AnalyticsConsentChangedDetail>;

    preference = detail.preference;
    isVisible = false;
  }

  onMount(() => {
    syncPreferenceState();
    window.addEventListener(ANALYTICS_CONSENT_SETTINGS_EVENT, openSettings);
    window.addEventListener(
      ANALYTICS_CONSENT_CHANGED_EVENT,
      handleConsentChanged,
    );

    return () => {
      window.removeEventListener(
        ANALYTICS_CONSENT_SETTINGS_EVENT,
        openSettings,
      );
      window.removeEventListener(
        ANALYTICS_CONSENT_CHANGED_EVENT,
        handleConsentChanged,
      );
    };
  });
</script>

{#if isVisible}
  <section
    class="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-4xl rounded-[1.25rem] border border-brand-border bg-brand-panel p-4 shadow-2xl sm:bottom-5 sm:p-5"
    aria-labelledby="cookie-consent-heading"
  >
    <div
      class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
    >
      <div class="max-w-2xl">
        <h2
          id="cookie-consent-heading"
          class="text-sm font-semibold uppercase tracking-[0.14em] text-primary-800"
        >
          Cookie choices
        </h2>
        <p class="mt-2 text-sm leading-relaxed text-brand-body sm:text-base">
          {#if isGpcEnabled}
            Your browser is sending Global Privacy Control, so optional
            analytics tracking is turned off for this website.
          {:else}
            Kwipoo uses necessary browser storage for this choice. With your
            permission, we also use privacy-conscious analytics cookies to learn
            which pages and calls to action are useful.
          {/if}
        </p>
        <a
          href={resolve("/privacy-policy")}
          class="mt-2 inline-flex text-sm font-semibold text-primary-700 underline-offset-4 hover:text-primary-800 hover:underline"
        >
          Review privacy policy
        </a>
      </div>

      <div class="grid gap-2 sm:grid-cols-2 md:min-w-72 md:grid-cols-1">
        {#if !isGpcEnabled}
          <button
            type="button"
            class="kw-button kw-button--primary btn min-h-11 w-full border px-4 text-sm font-semibold"
            onclick={() => choosePreference("accepted")}
          >
            Accept analytics
          </button>
        {/if}
        <button
          type="button"
          class="kw-button kw-button--outline btn min-h-11 w-full border px-4 text-sm font-semibold"
          onclick={() => choosePreference("declined")}
        >
          {isGpcEnabled ? "Close" : "Decline"}
        </button>
      </div>
    </div>
  </section>
{/if}
