import { expect, test } from "jest/global";
import { cssFontStack } from '../types'

test("cssFontStack", () => {
  expect(cssFontStack({
    name: "",
    fontFamily: "Tuna",
    fallback: [],
    cssProperties: {}
  })).toBe("Tuna");

  expect(cssFontStack({
    name: "",
    fontFamily: "Tuna",
    fallback: ["with-dashes", "serif"],
    cssProperties: {}
  })).toBe("Tuna,with-dashes,serif");

  expect(cssFontStack({
    name: "",
    fontFamily: "Tuna",
    fallback: ["Roboto Slab", "serif"],
    cssProperties: {}
  })).toBe("Tuna,\"Roboto Slab\",serif");
});
