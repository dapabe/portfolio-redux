"use client";
import { ChatBubbleLeftIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import * as z from "zod";
import { useFormspark } from "@formspark/use-formspark";
import {
	Button,
	Form,
	Label,
	TextArea,
	TextField,
} from "react-aria-components";
import { useZorm } from "react-zorm";

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
			if (zo.validation?.success) await submit(evt.data);
		},
	});

	return (
		<Form ref={zo.ref}>
			<TextField name={zo.fields.msg()} className={`form-control relative`}>
				<Label
					aria-describedby={zo.fields.msg("id")}
					htmlFor={zo.fields.msg("id")}
					className="absolute start-2.5 -top-3 p-0.5 text-sm text-neutral bg-white"
				>
					Contactame
					<ChatBubbleLeftIcon className="w-6 ml-1 inline" />
				</Label>
				<TextArea
					className={`textarea resize-none ${
						zo.errors.msg("textarea-error") ?? "textarea-info"
					}`}
					placeholder="ej: Hola Patricio, me comunico contigo para ... este es mi correo ejemplo@gmail.com"
				/>

				<div className="label relative">
					{zo.errors.msg((e) => (
						<span className="label-text-alt text-error text-sm absolute top-0.5">
							{e.message}
						</span>
					))}
				</div>
				<Button
					type="submit"
					className={`btn btn-circle absolute text-white bottom-0 -right-4 ${
						zo.errors.msg("btn-error") ?? "btn-info"
					}`}
				>
					<EnvelopeIcon className="w-6" />
				</Button>
			</TextField>
		</Form>
	);
};
