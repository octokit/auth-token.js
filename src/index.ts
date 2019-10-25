import { auth } from "./auth";
import { hook } from "./hook";
import {
  AuthInterface,
  EndpointOptions,
  RequestInterface,
  Token
} from "./types";

export function createTokenAuth(token: Token): AuthInterface {
  if (!token) {
    throw new Error("[@octokit/auth-token] No token passed to createTokenAuth");
  }
  if (typeof token !== "string") {
    throw new Error(
      "[@octokit/auth-token] Token passed to createTokenAuth is not a string"
    );
  }

  return Object.assign(auth.bind(null, token), {
    hook: hook.bind(null, token)
  });
}
