import { request as Request } from "@octokit/request";

import {
  AnyResponse,
  Defaults,
  Endpoint,
  Parameters,
  Route,
  Token
} from "./types";

export async function hook(
  token: Token,
  request: typeof Request,
  route: Route | Endpoint,
  parameters?: Parameters
): Promise<AnyResponse> {
  const endpoint: Defaults = request.endpoint.merge(
    route as string,
    parameters
  );

  endpoint.headers.authorization = `token ${token}`;

  return request(endpoint as Endpoint);
}
