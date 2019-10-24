import {
  AnyResponse,
  EndpointDefaults,
  EndpointOptions,
  RequestInterface,
  RequestParameters,
  Route,
  Token
} from "./types";

export async function hook(
  token: Token,
  request: RequestInterface,
  route: Route | EndpointOptions,
  parameters?: RequestParameters
): Promise<AnyResponse> {
  const endpoint: EndpointDefaults = request.endpoint.merge(
    route as string,
    parameters
  );

  endpoint.headers.authorization = `token ${token}`;

  return request(endpoint as EndpointOptions);
}
