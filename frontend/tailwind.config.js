/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {},
    colors : {
      almond : "#E3D6C9",
      darker_almond : "#C8AD93",
      create_button : "#A37952",
      darkest_almond : "#886544",
      rasin_black : "#2C2726",
      walnut : "#564D4A",
      pumpkin : {
        default :"#FA6D0F",
        dark: "#B44A04"
      },
      offwhite : "#F1EBE4"
    },
    fontFamily : {
      title : ["Allura", "cursive"],
      simple_text : ["Montserrat", "sans-serif"]
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

