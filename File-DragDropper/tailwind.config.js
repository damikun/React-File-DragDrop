const defaultTheme = require("tailwindcss/defaultTheme");

const colors = require("tailwindcss/colors");

module.exports = {
  purge: {
    preserveHtmlElements: false,
    content: ["./src/**/*.{ts,tsx}"],
  },
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000",
      white: "#fff",
      gray: colors.coolGray,
      red: colors.red,
      blue: colors.blue,
      yellow: colors.amber,
      indigo: colors.indigo,
      purple: colors.purple,
      pink: colors.pink,
      green: colors.green,
      white: colors.white,
      black: colors.black,
    },

    extend: {
      transitionDuration: {
        0: "0ms",
        2000: "2000ms",
      },

      height: {
        128: "512px",
        96: "384px",
      },

      colors: {
        gray: {
          166: "#f0f0f0",
        },
      },

      margin: {
        18: "4.5rem",
      },

      width: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
        sm: "600px",
        md: "728px",
        lg: "984px",
      },

      maxHeight: {
        132: "32rem",
      },

      maxWidth: {
        5: "5rem",
        6: "6rem",
        7: "7rem",
        8: "8rem",
        10: "10rem",
        12: "12rem",
        16: "16rem",
      },

      fontSize: {
        xxxs: ".65rem",
      },

      truncate: {
        lines: {
          1: "1",
          2: "2",
          3: "3",
          5: "5",
          8: "8",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-truncate-multiline")(),
  ],
  corePlugins: {
    alignContent: true,
    gradientColorStops: true,
  },
  variants: {
    gradientColorStops: [
      "responsive",
      "hover",
      "focus",
      "active",
      "group-hover",
    ],
    boxShadow: ["responsive", "hover", "focus"],
    outline: ["responsive", "focus"],
    backgroundColor: ["responsive", "hover", "focus"],
    borderColor: [
      "responsive",
      "hover",
      "focus",
      "focus-within",
      "active",
      "group-hover",
    ],
    borderWidth: ["responsive", "last", "hover", "focus", "focus-within"],
    margin: ["responsive", "last"],
    alignContent: ["responsive", "hover", "focus"],
  },
};
