/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      zIndex: {
        loader: 100,
        dialog: 90,
        toast: 90,
        menu: 50,
      },
      width: {
        em: '1em',
      },
      height: {
        em: '1em',
      },
      colors: {
        blue: { DEFAULT: 'hsl(210, 100%, 52%)' },
        orange: { DEFAULT: 'hsl(36, 100%, 52%)' },
        green: { DEFAULT: 'hsl(135, 64%, 50%)' },
        red: { DEFAULT: 'hsl(3, 100%, 61%)' },
        accent: 'hsl(210, 100%, 52%)',
        separator: 'hsla(240, 2%, 34%, .65)',
        foreground: {
          primary: 'hsl(0, 0%, 100%)',
          secondary: 'hsla(240, 33%, 94%, .6)',
          tertiary: 'hsla(240, 33%, 94%, .3)',
          quaternary: 'hsla(240, 33%, 94%, .18)',
        },
        background: {
          primary: 'hsl(0, 0%, 0%)',
          secondary: 'hsl(240, 3%, 11%)',
          tertiary: 'hsl(240, 2%, 18%)',
        },
        fill: {
          primary: 'hsla(240, 3%, 49%, .36)',
          secondary: 'hsla(240, 3%, 49%, .32)',
          tertiary: 'hsla(240, 4%, 48%, .24)',
          quaternary: 'hsla(240, 5%, 48%, .18)',
        },
      },
    },
  },
  plugins: [],
};
