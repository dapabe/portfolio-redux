import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BaseLayout } from "$/components/layouts/BaseLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Daniel Porfolio",
	description:
		"Porfolio de desarrollador de software y programador full-stack, Daniel Patricio Becerra.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="es" data-theme="redux">
			<body className={inter.className}>
				<BaseLayout>{children}</BaseLayout>
			</body>
		</html>
	);
}
