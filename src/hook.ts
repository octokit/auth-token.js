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
  // If hookMethod is `@octokit/request`, then use its `.endpoint` method so that its
  // defaults are inherrited. But if no `.endpoint` method is set, it most likely means
  // that the hook was not passed as first hook to `octokit.hook.wrap("request", hook)`,
  // in which case `hookMethod` is a pre-bound method without the .endpoint key.
  const endpoint: EndpointDefaults =
    "endpoint" in hookMethod
      ? hookMethod.endpoint.merge(route as string, parameters)
      : (route as EndpointDefaults);

  endpoint.headers.authorization = withAuthorizationPrefix(token);

  return hookMethod(endpoint as EndpointOptions);
}
