import type { Config } from 'tailwindcss'

export default <Config>{
  content: [],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        surface: '#121212',
        primary: '#3B82F6', // Electric Blue
        secondary: '#8B5CF6', // Electric Violet
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-tech': 'linear-gradient(to right, #3B82F6, #8B5CF6)',
      }
    }
  },
  plugins: [],
}
