export const colors = {
  bg: {
    primary:   '#0a0a0a',
    secondary: '#111111',
    tertiary:  '#181818',
    elevated:  '#1e1e1e',
  },
  surface: {
    '01': '#141414',
    '02': '#1a1a1a',
  },
  border: {
    subtle:  '#1f1f1f',
    default: '#2a2a2a',
    strong:  '#3a3a3a',
  },
  text: {
    primary:   '#f0f0f0',
    secondary: '#999999',
    muted:     '#555555',
    inverse:   '#0a0a0a',
  },
  accent:         '#C8E63C',
  accentDim:      '#A8C230',
  accentGlow:     'rgba(200,230,60,0.08)',
  error:          '#ff4d4d',
  success:        '#4dff91',
}

export const typography = {
  fontFamily: {
    serif:   "'DM Serif Display', Georgia, serif",
    display: "'SUIT Variable', 'SUIT', sans-serif",
    body:    "'Pretendard Variable', 'Pretendard', sans-serif",
  },
  scale: {
    'display-hero': { mobile: '56px', desktop: '160px', weight: 400, lineHeight: 0.95, letterSpacing: '-0.03em' },
    'display-2xl': { mobile: '48px', desktop: '96px',  weight: 800, lineHeight: 1.0,  letterSpacing: '-0.03em' },
    'display-xl':  { mobile: '36px', desktop: '72px',  weight: 700, lineHeight: 1.1,  letterSpacing: '-0.03em' },
    'display-lg':  { mobile: '28px', desktop: '48px',  weight: 700, lineHeight: 1.1,  letterSpacing: '-0.03em' },
    'heading-xl':  { mobile: '22px', desktop: '32px',  weight: 600, lineHeight: 1.3,  letterSpacing: '-0.02em' },
    'heading-lg':  { mobile: '18px', desktop: '24px',  weight: 600, lineHeight: 1.3,  letterSpacing: '-0.02em' },
    'heading-md':  { mobile: '16px', desktop: '20px',  weight: 500, lineHeight: 1.3,  letterSpacing: '-0.01em' },
    'body-lg':     { mobile: '16px', desktop: '18px',  weight: 400, lineHeight: 1.6,  letterSpacing: '-0.01em' },
    'body-md':     { mobile: '15px', desktop: '16px',  weight: 400, lineHeight: 1.7,  letterSpacing: '-0.01em' },
    'body-sm':     { mobile: '13px', desktop: '14px',  weight: 400, lineHeight: 1.6,  letterSpacing: '-0.01em' },
    'caption':     { mobile: '11px', desktop: '12px',  weight: 400, lineHeight: 1.5,  letterSpacing: '0em'     },
  },
}

export const spacing = {
  '0':  '0px',
  '1':  '4px',
  '2':  '8px',
  '3':  '12px',
  '4':  '16px',
  '5':  '20px',
  '6':  '24px',
  '8':  '32px',
  '10': '40px',
  '12': '48px',
  '16': '64px',
  '20': '80px',
  '24': '96px',
  '32': '128px',
}

export const screens = {
  xs:  '320px',
  sm:  '390px',
  md:  '768px',
  lg:  '1024px',
  xl:  '1280px',
  '2xl': '1440px',
  '3xl': '1920px',
}

export const layout = {
  maxWidth:           '1440px',
  maxWidthWide:       '1440px',
  headerWidth:        '80px',
  mobileHeaderHeight: '56px',
  pagePadding: {
    mobile:  'px-4',      // 16px
    tablet:  'md:px-6',   // 24px
    desktop: 'lg:px-10',  // 40px
    wide:    '2xl:px-12', // 48px
  },
}

export const easing = {
  outExpo: 'cubic-bezier(0.16, 1, 0.3, 1)',
  inOut:   'cubic-bezier(0.4, 0, 0.2, 1)',
  smooth:  'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
}

export const motion = {
  fadeDuration:      '400ms',
  transitionDuration:'300ms',
  hoverScale:        'scale(1.02)',
  hoverScaleDuration:'250ms',
}
