import { describe, test, expect } from "vitest";
import { isJWT } from "../src/is-jwt.js";

describe("isJWT", () => {
  test("valid JWT", () => {
    expect(isJWT("a.a.a")).toBe(true);
    expect(
      isJWT(
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOi0zMCwiZXhwIjo1NzAsImlzcyI6MX0.q3foRa78U3WegM5PrWLEh5N0bH1SD62OqW66ZYzArp95JBNiCbo8KAlGtiRENCIfBZT9ibDUWy82cI4g3F09mdTq3bD1xLavIfmTksIQCz5EymTWR5v6gL14LSmQdWY9lSqkgUG0XCFljWUglEP39H4yeHbFgdjvAYg3ifDS12z9oQz2ACdSpvxPiTuCC804HkPVw8Qoy0OSXvCkFU70l7VXCVUxnuhHnk8-oCGcKUspmeP6UdDnXk-Aus-eGwDfJbU2WritxxaXw6B4a3flTPojkYLSkPBr6Pi0H2-mBsW_Nvs0aLPVLKobQd4gqTkosX3967DoAG8luUMhrnxe8Q",
      ),
    ).toBe(true);
  });
  test("invalid JWT", () => {
    expect(isJWT("")).toBe(false);
    expect(isJWT(".")).toBe(false);
    expect(isJWT("..")).toBe(false);
    expect(isJWT("...")).toBe(false);
    expect(isJWT("....")).toBe(false);
    expect(isJWT("a.a.")).toBe(false);
    expect(isJWT(".a.a")).toBe(false);
    expect(isJWT("a..a")).toBe(false);
    expect(isJWT("a/.a.a")).toBe(false);
    expect(isJWT("a.a.a=")).toBe(false);
    expect(isJWT("a.a.a==")).toBe(false);
  });
});
