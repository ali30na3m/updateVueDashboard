module.exports = {
  darkMode : 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pinkPrimary' : ' #fbc2eb',
        'pinkSecondary' : '#471AAA',
        'purplePrimary' : '#a18cd1',
        'purpleSecondary' : '#391588',
      },
      fontFamily: {
        "Dana": "Dana",
        "DanaMadium": "Dana Madium",
        "DanaDemiBold": "Dana DemiBold",
      }
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *');
    }
  ],
}
