import * as React from "react";
import { FontFamilyProperty } from "csstype";

export interface Cut {
  /**
   * The name of the font cut as it's published by the foundry.
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
