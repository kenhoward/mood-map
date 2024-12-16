import { Fugaz_One, Open_Sans } from "next/font/google";
import "./globals.css";

const opensans = Open_Sans({
	subsets: ["latin"],
	weight: ['400'],
})
const fugaz = Fugaz_One({
	subsets: ["latin"],
	weight: ['400'],
})

export const metadata = {
	title: "Mood Map",
	description: "Mood Map - Visually see how you are doing",
};

export default function RootLayout({ children }) {
	const header = (
		<header className='p-4 sm:p-8 flex items-center justify-between gap-4'>
			<h1 className={`text-base sm:text-lg textGradient ${fugaz.className}`}>Mood Map</h1>
			<div className='flex items-center justify-between'>
				TODO - CTA button || stats
			</div>
		</header>
	)

	const footer = (
		<footer className='p-4 sm:p-8 text-center'>
			<p className={`text-neonPink ${fugaz.className}`}>©Copyright {new Date().getFullYear()}, Lost Boys Technologies</p>
		</footer>
	)

	return (
		<html lang="en">
			<body
				className={`w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col antialiased ${opensans.className}}`}
			>
				{header}
				{children}
				{footer}
			</body>
		</html>
	);
}
