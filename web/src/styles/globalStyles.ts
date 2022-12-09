import { globalCss } from "../../stitches.config"

export const globalStyles = globalCss({
	'*': {
		margin: 0,
		padding: 0
	},

	a: {
		textDecoration: 'none'
	},

	body: {
		backgroundColor: "$gray100",
		fontFamily: "$text",
		fontSmooth: "always",
		color: "$gray900",

		'&::-webkit-scrollbar': {
			width: '8px'
		},
		'&::-webkit-scrollbar-track': {
			backgroundColor: '$gray300'
		},
		'&::-webkit-scrollbar-thumb': {
			backgroundColor: '$gray500',
			borderRadius: '4px',
			border: '2px solid $gray300'
		}
	}
})
