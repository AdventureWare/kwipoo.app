# Analytics Environment Verification

This runbook verifies that website analytics are pointed at the correct PostHog project for each environment and that the core website events still land where expected.

Use it after:

- changing PostHog tokens or hosts
- changing Vercel environment variables
- switching which PostHog project owns production or staging traffic
- fixing analytics bootstrapping or CTA tracking code

## Environment Matrix

- Production website traffic should go to the shared `Kwipoo` PostHog project.
- Preview and development website traffic should go to `Kwipoo Staging`.
- E2E should stay isolated from both and use its own stubbed or test-only path.

## Verify Vercel Environment Variables

Run these from the website repo:

```bash
vercel env ls production
vercel env ls development
vercel env ls preview develop
vercel env ls preview colin-work
```

Each target should have:

- `PUBLIC_ANALYTICS_PROVIDER`
- `PUBLIC_POSTHOG_KEY`
- `PUBLIC_POSTHOG_HOST`

Expected split:

- `production` uses the real `Kwipoo` token
- `development` and preview branches use the `Kwipoo Staging` token

## Verify Production Website Analytics

1. Visit `https://www.kwipoo.app/` with unique UTM params.
2. Click a primary app-handoff CTA such as `Get Started`.
3. Confirm the browser sends a successful request to `https://us.i.posthog.com/e/`.
4. In the production `Kwipoo` PostHog project, confirm the tagged flow appears:
   - `$pageview`
   - `marketing_cta_clicked`
   - `resource_guide_selected` when you enter through the resources hub
   - `resource_guide_selected` when you click a related guide inside a guide
5. Refresh `Acquisition to Activation Overview` and confirm the website tiles reflect the tagged flow.

## Verify Non-Production Analytics

Prefer a real preview branch when it is accessible. If the Vercel preview alias is protected by Vercel auth, use a local production-style preview build instead.

### Local Staging Verification

Build and preview the site with the staging values injected:

```bash
PUBLIC_ANALYTICS_PROVIDER=posthog \
PUBLIC_POSTHOG_KEY=<kwipoo-staging-token> \
PUBLIC_POSTHOG_HOST=https://us.i.posthog.com \
npm run build

npm run preview -- --host 127.0.0.1 --port 4174
```

Then:

1. Visit `http://127.0.0.1:4174/` with unique UTM params.
2. Click a primary app-handoff CTA.
3. Confirm a successful request is sent to `https://us.i.posthog.com/e/`.
4. In the `Kwipoo Staging` project, confirm the tagged flow appears:
   - `$pageview`
   - `marketing_cta_clicked`
   - `resource_guide_selected` when you enter through the resources hub
   - `resource_guide_selected` when you click a related guide inside a guide

## Expected Outcomes

- Production website traffic appears only in `Kwipoo`.
- Preview and development website traffic appears only in `Kwipoo Staging`.
- The tagged CTA click preserves:
  - `utm_source`
  - `utm_medium`
  - `utm_campaign`
  - `landing_path`
  - `cta_location`
  - `cta_kind`
- Resource guide CTA clicks also preserve:
  - `content_slug`
  - `content_title`
  - `content_audience`
- Resource hub guide clicks preserve:
  - `location`
  - `content_slug`
  - `content_title`
  - `content_audience`
  - `content_format`
  - `content_read_time`
  - `destination`
- In-guide related-guide clicks also preserve:
  - `location`
  - `content_slug`
  - `content_title`
  - `content_audience`
  - `content_format`
  - `content_read_time`
  - `destination`
  - `parent_content_slug`
  - `parent_content_title`
  - `parent_content_audience`

## Failure Signs

- No PostHog request appears in the browser network log.
- Website traffic shows up in the wrong PostHog project.
- Production and staging both use the same token unintentionally.
- CTA navigation works but `marketing_cta_clicked` does not appear.
- Website dashboard tiles stay flat after a tagged verification flow.

## Cleanup

- Remove any temporary verification insights created in PostHog.
- Stop any local preview server you started for verification.
- If the check required branch updates, make sure the intended preview branches still track current `main`.
