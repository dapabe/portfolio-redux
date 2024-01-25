"use client";
import { ChatBubbleLeftIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { useZorm } from "react-zorm";
import * as z from "zod";
import { useFormspark } from "@formspark/use-formspark";

const schema = z.object({
	msg: z
		.string()
		.min(1, { message: "No puede estar vacio." })
		.refine(
			(string) => !/^[\n\r]+$/.test(string),
			"No se admiten renglones vacios."
		),
});
export const MessageCTA = () => {
	const [submit] = useFormspark({
		formId: process.env.NEXT_PUBLIC_FORMSPARK_ID!,
	});

	const zo = useZorm("cta", schema, {
		onValidSubmit: async (evt) => {
			evt.preventDefault();
			await submit({ message: evt.data.msg });
		},
	});

	return (
		<form ref={zo.ref} className="relative">
			<label
				htmlFor="htmlCTA"
				className={`relative block rounded-md border shadow-sm ${
					zo.errors.msg("border-red-600 focus-within:border-red-600") ??
					"border-gray-400 focus-within:border-teal-400 focus-within:ring-teal-400"
				}`}
			>
				<span className="pointer-events-none absolute start-2.5 -top-3 bg-white p-0.5 text-sm text-gray-700">
					Contactame
					<ChatBubbleLeftIcon className="w-6 ml-1 inline" />
				</span>
				<textarea
					id="htmlCTA"
					name={zo.fields.msg()}
					className={`peer border-none bg-transparent py-4 px-2 resize-none w-full focus:border-transparent focus:outline-none focus:ring-0`}
					placeholder="Hola Patricio, me comunico contigo para ... este es mi correo ejemplo@gmail.com"
				/>
				<button
					type="submit"
					className={`bg-white p-2 rounded-full hover:cursor-pointer absolute -bottom-4 -right-4 transition-colors border ${
						zo.errors.msg(
							"border-red-600 hover:bg-white text-red-600 hover:text-red-600 peer-focus:border-red-600 "
						) ??
						"text-gray-400 border-gray-400 hover:text-white hover:bg-teal-400 active:bg-teal-600 peer-focus:border-teal-600"
					}`}
				>
					<EnvelopeIcon className="w-6" />
				</button>
			</label>
			{zo.errors.msg((e) => (
				<span tabIndex={-1} className="text-red-600 text-sm absolute top-full">
					{e.message}
				</span>
			))}
		</form>
	);
};
