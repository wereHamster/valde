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

~~~image|span-6,plain
src: /static/TunaIntro.png
~~~

# <Matrix>

This component displays the different cuts, grouped by weight (ie. regular and italic on the same row).

${<Matrix cuts={[tunaLight, tunaRegular, tunaRegularItalic, tunaBoldItalic]} />}

# <Fallback>

The \`<Fallback>\` component is used to test the font-family stack. It overlays the fallback fonts over the first preference and shows how well the metrics match. The closer the two fonts are, the less page reflow the user will experience when the browser switches from the fallback font to the primary font.

${<Fallback cuts={[tunaLight, tunaRegular, tunaRegularItalic, tunaBoldItalic]} />}

# <Font>

This component displays a single font. A font has a name, a sample text that is used to showcase the font, and CSS properties that define it.

${(
  <Font
    name="keylineA"
    fontType={tunaRegular}
    sample="The quick brown fox jumps over the lazy dog"
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
    sample="The quick brown fox jumps over the lazy dog"
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
    sample="The quick brown fox jumps over the lazy dog"
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
        <p>
          Interdum varius sit amet mattis vulputate enim. Ut enim blandit volutpat maecenas volutpat. At in tellus
          integer feugiat scelerisque varius morbi enim nunc. Quisque non tellus orci ac auctor augue. Posuere lorem
          ipsum dolor sit amet consectetur adipiscing elit. Aliquam ut porttitor leo a diam sollicitudin tempor. Amet
          justo donec enim diam vulputate ut pharetra sit. Id consectetur purus ut faucibus pulvinar. Elementum sagittis
          vitae et leo duis ut diam. Ut placerat orci nulla pellentesque dignissim. Vel fringilla est ullamcorper eget
          nulla. Nunc aliquet bibendum enim facilisis gravida neque convallis a. Odio aenean sed adipiscing diam donec
          adipiscing tristique risus.
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
    sample="Username"
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
