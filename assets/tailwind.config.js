const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    '../lib/**/*.ex',
    '../lib/**/*.leex',
    '../lib/**/*.eex',
    './js/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        cyan: colors.cyan,
        teal: colors.teal,
        // teal: {
        //   100: '#75D6D2',
        //   200: '#4ECAC5',
        //   // DEFAULT: '#44B3AF',
        //   DEFAULT: colors.teal,
        //   300: '#35B0AB',
        //   400: '#298985',
        // },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    // ...
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
