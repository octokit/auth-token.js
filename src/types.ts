export type Token = string;

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
export type Authentication = BasicAuthentication | TokenAuthentication;
