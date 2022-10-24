import { auth } from "./auth";
import { hook } from "./hook";
import { StrategyInterface, Token, Authentication } from "./types";

export type Types = {
  StrategyOptions: Token;
  AuthOptions: never;
  Authentication: Authentication;
};

export const createTokenAuth: StrategyInterface = function createTokenAuth(
  token: Token
) {
  if (!token) {
    throw new Error("[@octokit/auth-token] No token passed to createTokenAuth");
  }

  if (typeof token !== "string") {
    throw new Error(
      "[@octokit/auth-token] Token passed to createTokenAuth is not a string"
    );
  }

  token = token.replace(/^(token|bearer) +/i, "");

  return Object.assign(auth.bind(null, token), {
    hook: hook.bind(null, token),
  });
};
