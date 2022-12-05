import { globalCss } from "../../stitches.config"

export const globalStyles = globalCss({
	'*': { margin: 0, padding: 0 },

	body: {
		backgroundColor: "$gray100",
		fontFamily: "$text",
		fontSmooth: "always",
		color: "$gray900"
	}
})
