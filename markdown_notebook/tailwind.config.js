const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, "$1")
    .replace(/\.0$/, "");
const rem = (px) => `${round(px / 16)}rem`;
const em = (px, base) => `${round(px / base)}em`;

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            p: {
              marginTop: em(10, 16),
              marginBottom: em(10, 16),
            },
            '[class~="lead"]': {
              marginTop: em(12, 20),
              marginBottom: em(12, 20),
            },
            blockquote: {
              marginTop: em(16, 20),
              marginBottom: em(16, 20),
            },
            h1: {
              marginTop: "0",
              marginBottom: em(16, 36),
            },
            h2: {
              marginTop: em(24, 24),
              marginBottom: em(12, 24),
            },
            h3: {
              marginTop: em(16, 20),
              marginBottom: em(6, 20),
            },
            h4: {
              marginTop: em(12, 16),
              marginBottom: em(4, 16),
            },
            img: {
              marginTop: em(16, 16),
              marginBottom: em(16, 16),
            },
            video: {
              marginTop: em(16, 16),
              marginBottom: em(16, 16),
            },
            figure: {
              marginTop: em(16, 16),
              marginBottom: em(16, 16),
            },
            figcaption: {
              marginTop: em(6, 14),
            },
            code: {
              fontSize: em(7, 16),
            },
            "h2 code": {
              fontSize: em(10, 24),
            },
            "h3 code": {
              fontSize: em(8, 20),
            },
            pre: {
              marginTop: em(12, 14),
              marginBottom: em(12, 14),
            },
            ol: {
              marginTop: em(0, 16),
              marginBottom: em(0, 16),
            },
            ul: {
              marginTop: em(0, 16),
              marginBottom: em(0, 16),
            },
            li: {
              marginTop: em(0, 16),
              marginBottom: em(0, 16),
            },
            "> ul > li p": {
              marginTop: em(0, 16),
              marginBottom: em(0, 16),
            },
            "> ul > li > *:first-child": {
              marginTop: em(0, 16),
            },
            "> ul > li > *:last-child": {
              marginBottom: em(0, 16),
            },
            "> ol > li > *:first-child": {
              marginTop: em(0, 16),
            },
            "> ol > li > *:last-child": {
              marginBottom: em(0, 16),
            },
            "ul ul, ul ol, ol ul, ol ol": {
              marginTop: em(0, 16),
              marginBottom: em(0, 16),
            },
            hr: {
              marginTop: em(24, 16),
              marginBottom: em(24, 16),
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
