import { Token, Authentication } from "./types";

export async function auth(token: Token): Promise<Authentication> {
  const tokenType = /^v\d+\./.test(token) ? "installation" : "oauth";

  return {
    type: "token",
    token: token,
    tokenType
  };
}
