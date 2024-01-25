import type { Config } from "tailwindcss";
import type { Config as DaiConfig } from "daisyui";

const config: Config & { daisyui: DaiConfig } = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		fontFamily: {
			comfortaa: ["Comfortaa", "Open Sans"],
		},
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: [
			{
				redux: {
					...require("daisyui/src/theming/themes")["fantasy"],
				},
			},
		],
	},
};
export default config;
