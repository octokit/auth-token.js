import { auth } from "./auth";
import { Token } from "./types";

export function createTokenAuth(token: Token) {
  if (!token) {
    throw new Error("[@octokit/auth-token] No token passed to createTokenAuth");
  }
  if (typeof token !== "string") {
    throw new Error(
      "[@octokit/auth-token] Token passed to createTokenAuth is not a string"
    );
  }
  return auth.bind(null, token);
}
