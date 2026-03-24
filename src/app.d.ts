// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  interface Window {
    posthog?: {
      init: (apiKey: string, options?: Record<string, unknown>) => void;
      capture: (event: string, properties?: Record<string, unknown>) => void;
      __kwipooInitialized?: boolean;
    };
  }

  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
