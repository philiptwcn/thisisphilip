export interface Env {
  production: boolean;
  contentful: {
    environmentId: string;
    spaceId: string;
    accessToken: string;
  };
}
