import { Env } from "./env-model";

export const environment: Env = {
  production: true,
  contentful: {
    environmentId: "/opt/buildhome/process.env.environmentId",
    spaceId: "/opt/buildhome/process.env.spaceId",
    accessToken: "/opt/buildhome/process.env.accessToken"
  }
};
