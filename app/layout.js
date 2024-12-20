import { Fugaz_One, Open_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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
			<Link href='/' className={`text-base sm:text-lg textGradient ${fugaz.className}`}>Mood Map</Link>
			<Link href='/dashboard' className='flex items-center justify-between'>
				TODO - CTA button || stats
			</Link>
		</header>
	)

	const footer = (
		<footer className='p-4 sm:p-8 text-center'>
			<p className={`text-majesticPurple ${fugaz.className}`}>
				©Copyright {new Date().getFullYear()}, Lost Boys Technologies
			</p>
		</footer>
	)

	return (
		<html lang="en">
			<body
				className={`w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col antialiased bg-[var(--background)] ${opensans.className}`}
			>
				{header}
				{children}
				{footer}
			</body>
		</html>
	);
}
