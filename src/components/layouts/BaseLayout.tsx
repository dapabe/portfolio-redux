"use client";
import Link from "next/link";
import { FC, PropsWithChildren } from "react";
import { Icon } from "../Icons";
import { MessageCTA } from "../Message.cta";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

const Header = () => {
	const pathname = usePathname();
	const activeLink = (href: string) =>
		pathname === href
			? "text-teal-500 border-b-4 border-b-teal-500"
			: "text-teal-400 border-b-2 border-b-teal-400 border-dotted";
	return (
		<header className="bg-gray-50 border-dashed border-b-2 border-b-teal-400">
			<div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 ">
				<nav className="flex items-center justify-center gap-4 font-bold uppercase">
					<Link href="/" className={activeLink("/")}>
						Inicio
					</Link>
					<Link href="/about" className={activeLink("/about")}>
						Acerca
					</Link>
					<Link href="/services" className={activeLink("/services")}>
						Servicios
					</Link>
				</nav>
			</div>
		</header>
	);
};

const Footer = () => (
	<footer className="border-t-2 border-dashed border-t-teal-400">
		<div className="mx-auto max-w-screen-xl space-y-8 px-4 py-8 sm:px-6 lg:space-y-16 lg:px-8">
			<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
				<div>
					<div className="text-teal-600 font-comfortaa font-bold text-lg">
						dapabe
					</div>
					<p className="mt-4 max-w-xs text-gray-500">
						Tu desarrollador de aplicaciones web y software ideal para tus
						trabajos, y emprendimientos.
					</p>
					<ul className="mt-8 flex gap-6">
						<li>
							<a
								href="https://github.com/dapabe"
								rel="noreferrer"
								target="_blank"
								className="text-gray-700 transition hover:opacity-75"
							>
								<span className="sr-only">GitHub</span>
								<Icon.Github className="w-6" />
							</a>
						</li>
						<li>
							<a
								href="https://twitter.com/_danzen"
								rel="noreferrer"
								target="_blank"
								className="text-gray-700 transition hover:opacity-75"
							>
								<span className="sr-only">Twitter</span>
								<Icon.Twitter className="w-6" />
							</a>
						</li>
						<li>
							<a
								href="/"
								rel="noreferrer"
								target="_blank"
								className="text-gray-700 transition hover:opacity-75"
							>
								<span className="sr-only">Instagram</span>
								<Icon.Instagram className="w-6" />
							</a>
						</li>
					</ul>
				</div>

				<div className="max-w-sm">
					<MessageCTA />
				</div>

				<div className="grid gap-8 sm:grid-cols-2 sm:col-span-2 lg:col-span-1">
					<div>
						<p className="font-medium text-gray-900">Servicios</p>
						<ul className="mt-6 space-y-4 text-sm">
							<li>
								<a
									href="#"
									className="text-gray-700 transition hover:opacity-75"
								>
									Optimizaciones SEO
								</a>
							</li>
						</ul>
					</div>
					<div>
						<p className="font-medium">Ayuda</p>
						<ul className="mt-6 space-y-4 text-sm">
							<li>
								<a
									href="#"
									className="text-gray-700 transition hover:opacity-75"
								>
									Contacto
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</footer>
);

export const BaseLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="flex flex-col min-h-dvh text-black">
			<Header />
			<main>{children}</main>
			<div className="mt-auto">
				<Footer />
			</div>
		</div>
	);
};
