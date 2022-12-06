import { createStitches } from '@stitches/react'

export const { styled, getCssText, globalCss, theme, keyframes } = createStitches({
	media: {
		sm: '(min-width: 768px)',
		md: '(min-width: 1024px)',
		lg: '(min-width: 1360px)'
	},
	theme: {
		colors: {
			white: '#FFFFFF',

			gray100: '#F2F2F2',
			gray300: '#E1E1E1',
			gray500: '#70707C',
			gray800: '#222226',
			gray900: '#121214',

			blue100: '#2686ED',
			blue600: '#2F6D87',
			blue800: '#214C5E',

			pink500: '#ED2484',

			purple500: '#6324ED',

			red500: '#ED2440',

			green500: '#10C36D'
		},
		fonts: {
			text: "'Inter', sans-serif",
			heading: "'Poppins', sans-serif"
		},
		fontSizes: {
			xs: '0.625rem',
			sm: '0.75rem',
			md: '1rem',
			lg: '1.25rem',
			xl: '1.5rem'
		},
		fontWeights: {
			regular: '400',
			medium: '500'
		}
	}
})
