import { Cut, Matrix, Fallback, Font } from "../src/index";
import { markdown } from "@catalog/core";

const tunaLight: Cut = {
  name: "Tuna Light",

  fontFamily: "Tuna",
  fallback: ["Arial", "serif"],

  cssProperties: {
    fontWeight: 100,
    fontStyle: "normal"
  }
};

const tunaRegular: Cut = {
  name: "Tuna Regular",

  fontFamily: "Tuna",
  fallback: ["Arial", "serif"],

  cssProperties: {
    fontWeight: 400,
    fontStyle: "normal"
  }
};

const tunaRegularItalic: Cut = {
  name: "Tuna Regular Italic",

  fontFamily: "Tuna",
  fallback: ["Arial", "serif"],

  cssProperties: {
    fontWeight: 400,
    fontStyle: "italic"
  }
};

const tunaBoldItalic: Cut = {
  name: "Tuna Bold",

  fontFamily: "Tuna",
  fallback: ["Arial", "serif"],

  cssProperties: {
    fontWeight: 700,
    fontStyle: "italic"
  }
};

const component = () => markdown`

## Constraints

 * Styles based on CSS.
 * For documentation, not exploration.

## Terminology

 * **Typeface:** The name of a whole family of fonts. Examples: _Helvetica Neue_, _Circular Pro_ etc.
 * **Font:** Corresponds to a file that we store on our computers, and also to a \`@font-face\` definition in CSS. You will typically have \`<num weights> * 2\` of these in your project (normal + italic variant for each weight). Its definition includes the fallback (stack).
 * **???:** The reusable building block that combines a _Font_ with a particular size, line height, and other typographic properties.

# <Matrix>

This component displays the different fonts, grouped by weight (ie. regular and italic on the same row).

${<Matrix cuts={[tunaLight, tunaRegular, tunaRegularItalic, tunaBoldItalic]} />}

# <Fallback>

The \`<Fallback>\` component is used to test the font stack. It overlays the selected fallback font over the primary font to illustrate how well the metrics match. The closer the two fonts are, the less page reflow the user will experience.

${<Fallback cuts={[tunaLight, tunaRegular, tunaRegularItalic, tunaBoldItalic]} />}

# <?Unknown?>

This component displays a single ???. It has a name, a sample text, and CSS properties that define it.

${(
  <Font
    name="keylineA"
    fontType={tunaRegular}
    sample="Data Explorer"
    cssProperties={{
      fontFamily: "Tuna",
      fontSize: "56px",
      fontWeight: 400,
      lineHeight: 1.1
    }}
  />
)}

${(
  <Font
    name="keylineB"
    fontType={tunaRegular}
    sample="The data behind Prices and Earnings"
    cssProperties={{
      fontFamily: "Tuna",
      fontSize: "44px",
      fontWeight: 400,
      lineHeight: 1.1
    }}
  />
)}

${(
  <Font
    name="keylineC"
    fontType={tunaRegular}
    sample="Cost of a dinner date or a party night around the world"
    cssProperties={{
      fontFamily: "Tuna",
      fontSize: "32px",
      fontWeight: 400,
      lineHeight: 1.1
    }}
  />
)}

${(
  <Font
    name="body"
    fontType={tunaRegular}
    sample={
      <>
        <p>
          The first edition of Prices and Earnings came out in 1971 when electronic calculators and fax machines were
          just about to enter the workplace. It was a printed black-and-white brochure, covered only 31 cities and was
          used mainly to compare expat compensation packages.
        </p>
        <p>
          Fast-forward to the current smartphone era and this year's study covers 77 cities and has over 75,000 data
          points for comparison. With research so large in scope and scale, and communication capabilities far beyond a
          fax machine, it was time to bring Prices and Earnings out of print and into the fully digital world.
        </p>
        <p>
          Explore the evolution of Prices and Earnings over the past 50 years and see how the 2018 edition helps you
          learn more.
        </p>
      </>
    }
    cssProperties={{
      fontFamily: "Tuna",
      fontSize: "18px",
      fontWeight: 400,
      lineHeight: "1.3"
    }}
  />
)}

${(
  <Font
    name="label"
    fontType={tunaRegular}
    sample="Next Story"
    cssProperties={{
      fontFamily: "Tuna",
      fontSize: "16px",
      fontWeight: 700,
      lineHeight: "1.3",
      letterSpacing: "3px",
      textTransform: "uppercase"
    }}
  />
)}
`;

export default {
  title: "typography",
  path: "/packages/typography",
  component
};
