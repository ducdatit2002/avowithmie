/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: ['index.html', 'src/**/*.{js,jsx}'],
  corePlugins: { preflight: true },
  theme: {
    extend: {
      colors: {
        bg_top: '#F3F3F3',
        bg_mid: '#61856B',
        bg_bottom: '#61856B',
        light_bg: '#E1E2E1',
        dark_bg: '181B18',
        background: '#A6BFAA',
        primary: '#79B482',
        secondary: '#416847',
        dark: '#070807',
        accent: '#E4E7E4',
        font_small: '#405944',
        light_font: 'E4E7E4',
        card_bg: '#94AA9A'
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
        'luckiest-guy': ['Luckiest Guy', 'cursive']
      },
      fontSize: {
        h1: '3rem',
        h2: '2rem',
        h3: '1.125rem',
        h4: '1rem',
        h5: '0.813rem',
        h6: '0.67rem'
      },
      backgroundImage: {
        'profile-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.60) 0%, #183D3D 100%)'
      }
    }
  },
  plugins: [daisyui]
}
