import { Token, Authentication } from "./types";

export async function auth(token: Token): Promise<Authentication> {
  const tokenType =
    token.split(/\./).length === 3
      ? "app"
      : /^v\d+\./.test(token)
      ? "installation"
      : "oauth";

  return {
    type: "token",
    token: token,
    tokenType,
  };
}
