const responsiveWidth = 65;
const halfResponsiveWidth = responsiveWidth / 2;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['../../**/*.tsx'],
  theme: {
    borderRadius: { DEFAULT: '0.25rem', none: '0', full: '5rem' },
    colors: {
      transparent: 'transparent',
      primary: {
        DEFAULT: '#162f4b',
        50: '#f2f8fd',
        100: '#e5eef9',
        200: '#c5ddf2',
        300: '#91c1e8',
        400: '#57a0d9',
        500: '#3185c6',
        600: '#2169a8',
        700: '#1c5488',
        800: '#1b4871',
        900: '#1c3e5e',
        950: '#162f4b',
      },
      grayscale: {
        standard: '#171717',
        neutral: '#737373',
        inverse: '#fafafa',
        50: '#fafafa',
        100: '#f5f5f5',
        200: '#e5e5e5',
        300: '#d4d4d4',
        400: '#a3a3a3',
        500: '#737373',
        600: '#525252',
        700: '#404040',
        800: '#262626',
        900: '#171717',
        950: '#0a0a0a',
      },
      error: {
        DEFAULT: '#cc0000',
        accent: '#fff0f0',
      },
      info: {
        DEFAULT: '#0f62be',
        accent: '#edfaff',
      },
      success: {
        DEFAULT: '#06752c',
        accent: '#edfff2',
      },
      warning: {
        DEFAULT: '#b2500b',
        accent: '#fffbeb',
      },
    },
    fontFamily: { sans: ['var(--font-next)'] },
    fontSize: {
      cta: ['clamp(2rem,3.75vw,3rem)', { letterSpacing: '-.025em', lineHeight: '1.3' }],
      subheader: ['clamp(1rem,1.75vw,1.45rem)', { letterSpacing: '-.025em', lineHeight: '1.3' }],
      '5xl': ['3rem', { letterSpacing: '-.025em', lineHeight: '1.3' }],
      '4xl': ['2.5rem', { letterSpacing: '-.025em', lineHeight: '1.3' }],
      '3xl': ['2rem', { letterSpacing: '-.025em', lineHeight: '1.3' }],
      '2xl': ['1.725rem', { letterSpacing: '-.025em', lineHeight: '1.3' }],
      xl: ['1.45rem', { letterSpacing: '-.025em', lineHeight: '1.3' }],
      lg: ['1.2rem', { letterSpacing: '-.025em', lineHeight: '1.4' }],
      base: ['1rem', { lineHeight: '1.5' }],
      small: ['.875rem', { lineHeight: '1.5' }],
    },
    transitionDuration: { base: '350ms' },
    extend: {
      width: {
        responsive: `min(90%,${responsiveWidth}rem)`,
        'half-responsive': `min(90%,${halfResponsiveWidth}rem)`,
        'split-form': 'min(90%,27rem)',
      },
      blur: { '4xl': '84px' },
    },
  },
  plugins: [],
};
