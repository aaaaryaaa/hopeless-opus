module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',          // Applies to all files in src folder
    './src/components/**/*.{js,jsx,ts,tsx}', // Applies specifically to all files in src/components
    'node_modules/daisyui/**/*.js',        // Applies to all JS files in the daisyui package
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
};

