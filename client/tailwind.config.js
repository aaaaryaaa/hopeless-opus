module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',          // Applies to all files in src folder
    './src/components/**/*.{js,jsx,ts,tsx}', // Applies specifically to all files in src/components
    'node_modules/daisyui/**/*.js',        // Applies to all JS files in the daisyui package
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-bg': "url('/src/Resources/Landingbgbubble.svg')"
      },
      fontFamily: {
        guerrilla: ['ProtestGuerrilla','sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 1.5s ease-in-out',
      },
    },
  },
  plugins: [require('daisyui')],
};

