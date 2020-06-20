import { Env } from "./env-model";

export const environment: Env = {
  production: true,
  contentful: {
    environmentId: `${process.env.environmentId}`,
    spaceId: `${process.env.spaceId}`,
    accessToken: `${process.env.accessToken}`
  }
};
