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
        teal: {
          100: '#75D6D2',
          200: '#4ECAC5',
          // DEFAULT: '#44B3AF',
          DEFAULT: '#49BFB5',
          300: '#35B0AB',
          400: '#298985',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
