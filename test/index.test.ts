import { request } from "@octokit/request";
import fetchMock, { MockMatcherFunction } from "fetch-mock";

import { createTokenAuth } from "../src/index";

test("README example", async () => {
  const auth = createTokenAuth("1234567890abcdef1234567890abcdef12345678");
  const authentication = await auth();

  expect(authentication).toEqual({
    type: "token",
    token: "1234567890abcdef1234567890abcdef12345678",
    tokenType: "oauth"
  });
});

test("installation token", async () => {
  const auth = createTokenAuth("v1.1234567890abcdef1234567890abcdef12345678");
  const authentication = await auth();

  expect(authentication).toEqual({
    type: "token",
    token: "v1.1234567890abcdef1234567890abcdef12345678",
    tokenType: "installation"
  });
});

test("invalid token", async () => {
  const auth = createTokenAuth("whatislove");
  const authentication = await auth();

  expect(authentication).toEqual({
    type: "token",
    token: "whatislove",
    tokenType: "oauth"
  });
});

test("no token", async () => {
  try {
    // @ts-ignore
    const auth = createTokenAuth();
    throw new Error("Should not resolve");
  } catch (error) {
    expect(error.message).toMatch(/no token passed to createTokenAuth/i);
  }
});

test("token is not a string", async () => {
  try {
    // @ts-ignore
    const auth = createTokenAuth({});
    throw new Error("Should not resolve");
  } catch (error) {
    expect(error.message).toMatch(
      /token passed to createTokenAuth is not a string/i
    );
  }
});

test('auth.hook(request, "GET /user")', async () => {
  const expectedRequestHeaders = {
    accept: "application/vnd.github.v3+json",
    authorization: "token 1234567890abcdef1234567890abcdef12345678",
    "user-agent": "test"
  };

  const matchGetUser: MockMatcherFunction = (url, { body, headers }) => {
    expect(url).toEqual("https://api.github.com/user");
    expect(headers).toStrictEqual(expectedRequestHeaders);
    return true;
  };

  const requestMock = request.defaults({
    headers: {
      "user-agent": "test"
    },
    request: {
      fetch: fetchMock.sandbox().getOnce(matchGetUser, { id: 123 })
    }
  });

  const { hook } = createTokenAuth("1234567890abcdef1234567890abcdef12345678");
  const { data } = await hook(requestMock, "GET /user");

  expect(data).toStrictEqual({ id: 123 });
});
