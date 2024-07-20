/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        sekret: {
          50: '#fdf6fb',
          100: '#fbecf8',
          200: '#f7d7f1',
          300: '#efb8e2',
          400: '#e58dd0',
          500: '#d560b8',
          600: '#b33f94',
          700: '#98337b',
          800: '#7d2b65',
          900: '#672853',
          950: '#430f32',
        },
      },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      const enabledColors = new Set(['-rose', '-sekret']);
      function extractColorVars(colorObj, colorGroup = '') {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey];

          if (typeof value === 'string' && !enabledColors.has(colorGroup)) {
            return vars;
          }

          const newVars =
            typeof value === 'string'
              ? { [`--color${colorGroup}-${colorKey}`]: value }
              : extractColorVars(value, `-${colorKey}`);

          return { ...vars, ...newVars };
        }, {});
      }

      addBase({
        ':root': extractColorVars(theme('colors')),
      });
    },
  ],
};
