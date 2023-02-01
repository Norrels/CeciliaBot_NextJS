/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.tsx",
  ],
  theme: {
    fontFamily: {
      Roboto: 'Roboto, sans-serif',
    },
    extend: {
      colors: {
        'dark-blue': {
          900: '#1A1924',
          200: '#282843',
        },
        violet: {
          950: '#633BBC'
        },
        cyan: {
          550: '#07847E'
        },
        'overlay-background': {
          200: 'rgba(0, 0, 0, 0.25)'
        },
        'modal-background': {
          500: '#282843'
        },
        'gray-purple' : {
          100: '#7F7FA8'
        }
      },
      width: {
        '1120': '1120px'
      }
    },
  },
  plugins: [],
}
