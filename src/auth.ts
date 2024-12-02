import { isJWT } from "./is-jwt.js";
import type { Token, Authentication } from "./types.js";

export async function auth(token: Token): Promise<Authentication> {
  const isApp = isJWT(token);
  const isInstallation = token.startsWith("v1.") || token.startsWith("ghs_");
  const isUserToServer = token.startsWith("ghu_");

  const tokenType = isApp
    ? "app"
    : isInstallation
      ? "installation"
      : isUserToServer
        ? "user-to-server"
        : "oauth";

  return {
    type: "token",
    token,
    tokenType,
  };
}
