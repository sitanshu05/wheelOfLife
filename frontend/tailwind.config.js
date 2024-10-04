/** @type {import('tailwindcss').Config} */
export default {
  darkMode : 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      transitionProperty: {
        'bg-color': 'background-color',
        'text-color': 'color',
      },
      transitionTimingFunction: {
        'ease-in-out': 'ease-in-out',
      },
      transitionDuration: {
        '300': '300ms',
      },
    },
    colors : {
      title_orange : "#D8937D",
      div_orange : "#E77E36",
      button_orange : "#FFC65C",
      darkmode_bg : "#121212",
      font_brown : "#564D4A",
      gradient : {
        light_end : "#F09819",
        light_start:"#FFC65C",
        dark_start : "#F09819",
        dark_end: "#FF512F"
      }
    },
    fontFamily : {
      title_font : ['amaranth', 'sans-serif'],
      body_font : ['antic', 'sans-serif']

    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

