import { FontFamilyProperty } from "csstype";
import * as React from "react";

export interface FontFace {
  /**
   * The name of the typeface as it's published by the foundry.
   *
   * Example: "Circular Pro Medium Italic"
   */
  name: string;

  /**
   * The font-family name in the @font-face declaration.
   */
  fontFamily: FontFamilyProperty;

  /**
   * Fallback font families. Include "serif" or "sans-serif" as the
   * last entry in the list.
   *
   * Example: ["sans-serif"]
   */
  fallback: FontFamilyProperty[];

  /**
   * CSS properties like font-weight and font-style, which must be consistent
   * across the base font and all fallback fonts.
   */
  cssProperties: React.CSSProperties;
}

/**
 * Render a FontFace's fontFamily and fallback font families as a CSS font stack
 * string for use with the CSS font-family property.
 * 
 * @example
 * const fontFace = { fontFamily: 'Tuna', fallback: ['Roboto Slab', 'serif'], ... }
 * cssFontStack(fontFace) // "Tuna, 'Roboto Slab', serif"
 */
export const cssFontStack = (fontFace: FontFace) => {
  const hasSpaces = /\s+/
  const wrapInQuotes = (x: string) => hasSpaces.test(x) ? `"${x}"` : x
  return [fontFace.fontFamily, ...fontFace.fallback].map(wrapInQuotes).join(',')
}
