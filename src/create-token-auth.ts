import { auth } from "./auth.js";
import { hook } from "./hook.js";
import type { BearerToken, StrategyInterface, Token } from "./types.js";

export const createTokenAuth: StrategyInterface = function createTokenAuth(
  token: Token | BearerToken,
) {
  if (!token) {
    throw new Error("[@octokit/auth-token] No token passed to createTokenAuth");
  }

  if (typeof token !== "string") {
    throw new Error(
      "[@octokit/auth-token] Token passed to createTokenAuth is not a string",
    );
  }

  token = toToken(token);

  return Object.assign(auth.bind(null, token), {
    hook: hook.bind(null, token),
  });
};

/** Turns a {@link BearerToken} into a {@link Token}. */
function toToken(token: BearerToken | Token): Token {
  return token.replace(/^(token|bearer) +/i, "") as Token;
}
