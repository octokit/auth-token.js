import { request } from "@octokit/request";
import fetchMock, { MockMatcherFunction } from "fetch-mock";

import { createTokenAuth } from "../src/index";

test("README example", async () => {
  const auth = createTokenAuth("ghp_PersonalAccessToken01245678900000000");
  const authentication = await auth();

  expect(authentication).toEqual({
    type: "token",
    token: "ghp_PersonalAccessToken01245678900000000",
    tokenType: "oauth",
  });
});

test("installation token (old format)", async () => {
  const auth = createTokenAuth("v1.1234567890abcdef1234567890abcdef12345678");
  const authentication = await auth();

  expect(authentication).toEqual({
    type: "token",
    token: "v1.1234567890abcdef1234567890abcdef12345678",
    tokenType: "installation",
  });
});

test("installation token (new format)", async () => {
  const auth = createTokenAuth("ghs_InstallallationOrActionToken00000000");
  const authentication = await auth();

  expect(authentication).toEqual({
    type: "token",
    token: "ghs_InstallallationOrActionToken00000000",
    tokenType: "installation",
  });
});

test("JSON Web Token (GitHub App Authentication)", async () => {
  const auth = createTokenAuth(
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOi0zMCwiZXhwIjo1NzAsImlzcyI6MX0.q3foRa78U3WegM5PrWLEh5N0bH1SD62OqW66ZYzArp95JBNiCbo8KAlGtiRENCIfBZT9ibDUWy82cI4g3F09mdTq3bD1xLavIfmTksIQCz5EymTWR5v6gL14LSmQdWY9lSqkgUG0XCFljWUglEP39H4yeHbFgdjvAYg3ifDS12z9oQz2ACdSpvxPiTuCC804HkPVw8Qoy0OSXvCkFU70l7VXCVUxnuhHnk8-oCGcKUspmeP6UdDnXk-Aus-eGwDfJbU2WritxxaXw6B4a3flTPojkYLSkPBr6Pi0H2-mBsW_Nvs0aLPVLKobQd4gqTkosX3967DoAG8luUMhrnxe8Q"
  );
  const authentication = await auth();

  expect(authentication).toEqual({
    type: "token",
    token:
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOi0zMCwiZXhwIjo1NzAsImlzcyI6MX0.q3foRa78U3WegM5PrWLEh5N0bH1SD62OqW66ZYzArp95JBNiCbo8KAlGtiRENCIfBZT9ibDUWy82cI4g3F09mdTq3bD1xLavIfmTksIQCz5EymTWR5v6gL14LSmQdWY9lSqkgUG0XCFljWUglEP39H4yeHbFgdjvAYg3ifDS12z9oQz2ACdSpvxPiTuCC804HkPVw8Qoy0OSXvCkFU70l7VXCVUxnuhHnk8-oCGcKUspmeP6UdDnXk-Aus-eGwDfJbU2WritxxaXw6B4a3flTPojkYLSkPBr6Pi0H2-mBsW_Nvs0aLPVLKobQd4gqTkosX3967DoAG8luUMhrnxe8Q",
    tokenType: "app",
  });
});

test("User-to-server token (User authentication through app installation)", async () => {
  const auth = createTokenAuth("ghu_InstallationUserToServer000000000000");
  const authentication = await auth();

  expect(authentication).toEqual({
    type: "token",
    token: "ghu_InstallationUserToServer000000000000",
    tokenType: "user-to-server",
  });
});

test("invalid token", async () => {
  const auth = createTokenAuth("whatislove");
  const authentication = await auth();

  expect(authentication).toEqual({
    type: "token",
    token: "whatislove",
    tokenType: "oauth",
  });
});

test("no token", async () => {
  try {
    // @ts-ignore
    const auth = createTokenAuth();
    throw new Error("Should not resolve");
  } catch (error: any) {
    expect(error.message).toMatch(/no token passed to createTokenAuth/i);
  }
});

test("token is not a string", async () => {
  try {
    // @ts-ignore
    const auth = createTokenAuth({});
    throw new Error("Should not resolve");
  } catch (error: any) {
    expect(error.message).toMatch(
      /token passed to createTokenAuth is not a string/i
    );
  }
});

test("OAuth token with prefix", async () => {
  const auth = createTokenAuth(
    "bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOi0zMCwiZXhwIjo1NzAsImlzcyI6MX0.q3foRa78U3WegM5PrWLEh5N0bH1SD62OqW66ZYzArp95JBNiCbo8KAlGtiRENCIfBZT9ibDUWy82cI4g3F09mdTq3bD1xLavIfmTksIQCz5EymTWR5v6gL14LSmQdWY9lSqkgUG0XCFljWUglEP39H4yeHbFgdjvAYg3ifDS12z9oQz2ACdSpvxPiTuCC804HkPVw8Qoy0OSXvCkFU70l7VXCVUxnuhHnk8-oCGcKUspmeP6UdDnXk-Aus-eGwDfJbU2WritxxaXw6B4a3flTPojkYLSkPBr6Pi0H2-mBsW_Nvs0aLPVLKobQd4gqTkosX3967DoAG8luUMhrnxe8Q"
  );
  const authentication = await auth();

  expect(authentication).toEqual({
    type: "token",
    token:
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOi0zMCwiZXhwIjo1NzAsImlzcyI6MX0.q3foRa78U3WegM5PrWLEh5N0bH1SD62OqW66ZYzArp95JBNiCbo8KAlGtiRENCIfBZT9ibDUWy82cI4g3F09mdTq3bD1xLavIfmTksIQCz5EymTWR5v6gL14LSmQdWY9lSqkgUG0XCFljWUglEP39H4yeHbFgdjvAYg3ifDS12z9oQz2ACdSpvxPiTuCC804HkPVw8Qoy0OSXvCkFU70l7VXCVUxnuhHnk8-oCGcKUspmeP6UdDnXk-Aus-eGwDfJbU2WritxxaXw6B4a3flTPojkYLSkPBr6Pi0H2-mBsW_Nvs0aLPVLKobQd4gqTkosX3967DoAG8luUMhrnxe8Q",
    tokenType: "app",
  });
});

test("JWT with prefix", async () => {
  const auth = createTokenAuth(
    "token ghp_PersonalAccessToken01245678900000000"
  );
  const authentication = await auth();

  expect(authentication).toEqual({
    type: "token",
    token: "ghp_PersonalAccessToken01245678900000000",
    tokenType: "oauth",
  });
});

test("JWT with capitalized prefix", async () => {
  const auth = createTokenAuth(
    "Token ghp_PersonalAccessToken01245678900000000"
  );
  const authentication = await auth();

  expect(authentication).toEqual({
    type: "token",
    token: "ghp_PersonalAccessToken01245678900000000",
    tokenType: "oauth",
  });
});

test("JWT with capitalized prefix", async () => {
  const auth = createTokenAuth(
    "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOi0zMCwiZXhwIjo1NzAsImlzcyI6MX0.q3foRa78U3WegM5PrWLEh5N0bH1SD62OqW66ZYzArp95JBNiCbo8KAlGtiRENCIfBZT9ibDUWy82cI4g3F09mdTq3bD1xLavIfmTksIQCz5EymTWR5v6gL14LSmQdWY9lSqkgUG0XCFljWUglEP39H4yeHbFgdjvAYg3ifDS12z9oQz2ACdSpvxPiTuCC804HkPVw8Qoy0OSXvCkFU70l7VXCVUxnuhHnk8-oCGcKUspmeP6UdDnXk-Aus-eGwDfJbU2WritxxaXw6B4a3flTPojkYLSkPBr6Pi0H2-mBsW_Nvs0aLPVLKobQd4gqTkosX3967DoAG8luUMhrnxe8Q"
  );
  const authentication = await auth();

  expect(authentication).toEqual({
    type: "token",
    token:
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOi0zMCwiZXhwIjo1NzAsImlzcyI6MX0.q3foRa78U3WegM5PrWLEh5N0bH1SD62OqW66ZYzArp95JBNiCbo8KAlGtiRENCIfBZT9ibDUWy82cI4g3F09mdTq3bD1xLavIfmTksIQCz5EymTWR5v6gL14LSmQdWY9lSqkgUG0XCFljWUglEP39H4yeHbFgdjvAYg3ifDS12z9oQz2ACdSpvxPiTuCC804HkPVw8Qoy0OSXvCkFU70l7VXCVUxnuhHnk8-oCGcKUspmeP6UdDnXk-Aus-eGwDfJbU2WritxxaXw6B4a3flTPojkYLSkPBr6Pi0H2-mBsW_Nvs0aLPVLKobQd4gqTkosX3967DoAG8luUMhrnxe8Q",
    tokenType: "app",
  });
});

test('auth.hook(request, "GET /user")', async () => {
  const expectedRequestHeaders = {
    accept: "application/vnd.github.v3+json",
    authorization: "token ghp_PersonalAccessToken01245678900000000",
    "user-agent": "test",
  };

  const matchGetUser: MockMatcherFunction = (url, { body, headers }) => {
    expect(url).toEqual("https://api.github.com/user");
    expect(headers).toStrictEqual(expectedRequestHeaders);
    return true;
  };

  const requestMock = request.defaults({
    headers: {
      "user-agent": "test",
    },
    request: {
      fetch: fetchMock.sandbox().getOnce(matchGetUser, { id: 123 }),
    },
  });

  const { hook } = createTokenAuth("ghp_PersonalAccessToken01245678900000000");
  const { data } = await hook(requestMock, "GET /user");

  expect(data).toStrictEqual({ id: 123 });
});

test("auth.hook() with JWT", async () => {
  const expectedRequestHeaders = {
    accept: "application/vnd.github.v3+json",
    authorization:
      "bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOi0zMCwiZXhwIjo1NzAsImlzcyI6MX0.q3foRa78U3WegM5PrWLEh5N0bH1SD62OqW66ZYzArp95JBNiCbo8KAlGtiRENCIfBZT9ibDUWy82cI4g3F09mdTq3bD1xLavIfmTksIQCz5EymTWR5v6gL14LSmQdWY9lSqkgUG0XCFljWUglEP39H4yeHbFgdjvAYg3ifDS12z9oQz2ACdSpvxPiTuCC804HkPVw8Qoy0OSXvCkFU70l7VXCVUxnuhHnk8-oCGcKUspmeP6UdDnXk-Aus-eGwDfJbU2WritxxaXw6B4a3flTPojkYLSkPBr6Pi0H2-mBsW_Nvs0aLPVLKobQd4gqTkosX3967DoAG8luUMhrnxe8Q",
    "user-agent": "test",
  };

  const matchGetUser: MockMatcherFunction = (url, { body, headers }) => {
    expect(url).toEqual("https://api.github.com/user");
    expect(headers).toStrictEqual(expectedRequestHeaders);
    return true;
  };

  const requestMock = request.defaults({
    headers: {
      "user-agent": "test",
    },
    request: {
      fetch: fetchMock.sandbox().getOnce(matchGetUser, { id: 123 }),
    },
  });

  const { hook } = createTokenAuth(
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOi0zMCwiZXhwIjo1NzAsImlzcyI6MX0.q3foRa78U3WegM5PrWLEh5N0bH1SD62OqW66ZYzArp95JBNiCbo8KAlGtiRENCIfBZT9ibDUWy82cI4g3F09mdTq3bD1xLavIfmTksIQCz5EymTWR5v6gL14LSmQdWY9lSqkgUG0XCFljWUglEP39H4yeHbFgdjvAYg3ifDS12z9oQz2ACdSpvxPiTuCC804HkPVw8Qoy0OSXvCkFU70l7VXCVUxnuhHnk8-oCGcKUspmeP6UdDnXk-Aus-eGwDfJbU2WritxxaXw6B4a3flTPojkYLSkPBr6Pi0H2-mBsW_Nvs0aLPVLKobQd4gqTkosX3967DoAG8luUMhrnxe8Q"
  );
  const { data } = await hook(requestMock, "GET /user");

  expect(data).toStrictEqual({ id: 123 });
});
