import { Env } from "./env-model";

export const environment: Env = {
  production: true,
  contentful: {
    environmentId: "{ENVIRONMENT_ID}",
    spaceId: "{SPACE_ID}",
    accessToken: "{ACCESS_TOKEN}"
  }
};
