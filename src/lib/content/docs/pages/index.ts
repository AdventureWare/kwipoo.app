import type { DocsPage } from "../schema";
import { eventsDocsPage } from "./events";
import { gettingStartedDocsPage } from "./getting-started";
import { placesDocsPage } from "./places";
import { profileDocsPage } from "./profile";
import { setsDocsPage } from "./sets";
import { socialDocsPage } from "./social";
import { spotsDocsPage } from "./spots";
import { thingsDocsPage } from "./things";

export const docsPages: DocsPage[] = [
  gettingStartedDocsPage,
  thingsDocsPage,
  placesDocsPage,
  spotsDocsPage,
  setsDocsPage,
  eventsDocsPage,
  socialDocsPage,
  profileDocsPage,
];
