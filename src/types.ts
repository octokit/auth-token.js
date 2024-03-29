import type * as OctokitTypes from "@octokit/types";

export type AnyResponse = OctokitTypes.OctokitResponse<any>;
export type StrategyInterface = OctokitTypes.StrategyInterface<
  [Token | BearerToken],
  [],
  Authentication
>;
export type EndpointDefaults = OctokitTypes.EndpointDefaults;
export type EndpointOptions = OctokitTypes.EndpointOptions;
export type RequestParameters = OctokitTypes.RequestParameters;
export type RequestInterface = OctokitTypes.RequestInterface;
export type Route = OctokitTypes.Route;

export type ActionToken = `ghs_${string}`;
export type InstallallationToken = `ghs_${string}`;
export type InstallallationTokenV1 = `v1.${string}`;
export type InstallationUserToServerToken = `ghu_${string}`;
export type OAuthToken = `${string}.${string}.${string}`;
/**
 * Personal access tokens are an alternative to using passwords for
 * authentication to GitHub when using the [GitHub API](https://docs.github.com/en/rest/overview/authenticating-to-the-rest-api)
 * or the [command line](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#using-a-personal-access-token-on-the-command-line).
 *
 * @see https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token
 */
export type PersonalAccessToken = `ghp_${string}`;

export type Token =
  | PersonalAccessToken
  | InstallallationTokenV1
  | InstallallationToken
  | ActionToken
  | InstallationUserToServerToken
  | OAuthToken;

export type BearerToken =
  | `bearer ${Token}`
  | `Bearer ${Token}`
  | `token ${Token}`
  | `Token ${Token}`;

export type OAuthTokenAuthentication = {
  type: "token";
  tokenType: "oauth";
  token: Token;
};
export type InstallationTokenAuthentication = {
  type: "token";
  tokenType: "installation";
  token: Token;
};
export type AppAuthentication = {
  type: "token";
  tokenType: "app";
  token: Token;
};
export type UserToServerAuthentication = {
  type: "token";
  tokenType: "user-to-server";
  token: Token;
};
export type Authentication =
  | OAuthTokenAuthentication
  | InstallationTokenAuthentication
  | AppAuthentication
  | UserToServerAuthentication;

export type Types = {
  StrategyOptions: Token;
  AuthOptions: never;
  Authentication: Authentication;
};
