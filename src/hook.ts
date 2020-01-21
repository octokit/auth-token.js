import {
  AnyResponse,
  EndpointDefaults,
  EndpointOptions,
  RequestInterface,
  RequestParameters,
  Route,
  Token
} from "./types";

import { withAuthorizationPrefix } from "./with-authorization-prefix";

export async function hook(
  token: Token,
  hookMethod: RequestInterface | Function,
  route: Route | EndpointOptions,
  parameters?: RequestParameters
): Promise<AnyResponse> {
  const endpoint: EndpointDefaults =
    "endpoint" in hookMethod
      ? hookMethod.endpoint.merge(route as string, parameters)
      : (route as EndpointDefaults);

  endpoint.headers.authorization = withAuthorizationPrefix(token);

  return hookMethod(endpoint as EndpointOptions);
}
