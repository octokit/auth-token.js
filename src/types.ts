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

/** GitHub App server-to-server token
 * @see https://docs.github.com/en/developers/apps/authenticating-with-github-apps#authenticating-as-an-installation */
export type ServerToServerToken = `ghs_${string}`;
export type InstallallationTokenV1 = `v1.${string}`;
/** Your app can make API requests on behalf of a user. API requests made by an
 * app on behalf of a user will be attributed to that user. For example, if your
 * app posts a comment on behalf of a user, the GitHub UI will show the user's
 * avatar photo along with the app's identicon badge as the author of the issue.
 *
 * @see https://docs.github.com/en/developers/apps/identifying-and-authorizing-users-for-github-apps
 * */
export type InstallationUserToServerToken = `ghu_${string}`;
/** In order to authenticate as an app or generate an installation access token,
 * you must generate a JSON Web Token (JWT). If a REST API endpoint requires a
 * JWT, the documentation for that endpoint will indicate that you must use a
 * JWT to access the endpoint.
 *
 * @see https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-json-web-token-jwt-for-a-github-app
 */
export type JWT = `${string}.${string}.${string}`;
/** This access token allows you to make requests to the API on a behalf of a
 * user.
 *
 * @see https://docs.github.com/en/developers/apps/authorizing-oauth-apps
 */
export type OAuthToken = `gho_${string}`;
/**
 * Personal access tokens are an alternative to using passwords for
 * authentication to GitHub when using the [GitHub API](https://docs.github.com/en/rest/overview/authenticating-to-the-rest-api)
 * or the [command line](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#using-a-personal-access-token-on-the-command-line).
 *
 * @see https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token
 */
export type PersonalAccessToken = `ghp_${string}`;

export type Token =
  | ServerToServerToken
  | InstallallationTokenV1
  | InstallationUserToServerToken
  | JWT
  | OAuthToken
  | PersonalAccessToken;

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
