module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        red: {
          DEFAULT : "#FF0000",
        },
        "m-green": "#00A483",
        "m-black": "#212121",
        "m-grey": "#F9F9F9",
        "m-white": "#FFFFFF",
        "m-yellow": "#F7941D",
        "m-grey-1": "#4E4E4E",
        "m-grey-2": "#707070",
        "m-grey-3": "#0000000A",
        "m-grey-4": "#00000008",
        "m-grey-5": "#EAEAEA",
        "m-green-dark": "#00634F",
        "gray-nurse": "#e7ece7",
        "gray-1": "#CCCCCC",
        "gray-2": "#7E7E7E",
        steps: "#e0e6e1",
        "black-1": "#000000",
        "black-20": "#202020",
        "black-60": "#606060",
        "green-1": "#007B63",
        "yellow-1": "#FBB215",
        "gray-1f": "#0000001F",
        "gray-ef": "#EFEFEF",
      },
      backgroundImage: {
        "sell-step": "url('../assets/bg_buy_step.png')",
        "buy-step": "url('../assets/bg_sell_step.png')",
        "arrow-left": "url('../assets/arrow-left.svg')",
        banner: "url('../assets/bg_mask_1.svg')",
        "download-app": "url('../assets/download_app.png')",
        "app-download": "url('../assets/app_download.png')",
        "app-store": "url('../assets/app_store.svg')",
        "play-store": "url('../assets/play_store.png')",
        "bg-mask-1": "url('../assets/bg_mask_1.svg')",
      },
      fontFamily: {
        "open-sans": '"Open Sans", Helvetica, Arial, sans-serif',
      },
      transformOrigin: {
        0: "0%",
      },
      zIndex: {
        "-1": "-1",
      },
      display: ["group-hover", "group-focus"],
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        lg: "1024px",
        xl: "1200px",
        "2xl": "1200px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp"), require("@tailwindcss/forms")],
};
