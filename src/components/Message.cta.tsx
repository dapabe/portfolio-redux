"use client";
import { ChatBubbleLeftIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import * as z from "zod";
import { useFormspark } from "@formspark/use-formspark";
import {
	Button,
	FieldError,
	Form,
	Label,
	TextArea,
	TextField,
} from "react-aria-components";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getValidationErrors } from "$/common/helpers";
import { useToggle } from "@uidotdev/usehooks";
import { useEffect } from "react";

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

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting, isValid },
	} = useForm<typeof schema._type>({
		defaultValues: {
			msg: "",
		},
		resolver: zodResolver(schema),
	});

	const [showFeedback, toggleFeedback] = useToggle(false);

	const onSubmit: SubmitHandler<typeof schema._type> = async (data) => {
		// "use server";
		toggleFeedback();
		// await fetch(process.env.FORMSPARK_URL!, {
		// 	method: "post",
		// });
		// console.log(data);
		setTimeout(() => {
			reset();
			toggleFeedback();
		}, 3000);
	};

	useEffect(() => {
		let timeoutId: any;
		if (showFeedback) {
			timeoutId = setTimeout(() => {
				toggleFeedback();
			}, 3000);
		}

		return () => clearTimeout(timeoutId);
	}, [showFeedback]);

	const disabledField = isSubmitting || showFeedback;
	console.log(errors);
	return (
		<Form
			onSubmit={handleSubmit(onSubmit)}
			validationErrors={getValidationErrors(errors)}
		>
			<TextField className={`form-control relative`}>
				<Label
					aria-describedby="msg"
					htmlFor="msg"
					className="absolute start-2.5 -top-3 p-0.5 text-sm text-neutral bg-white select-none"
				>
					Contactame
					<ChatBubbleLeftIcon className="w-6 ml-1 inline" />
				</Label>
				<TextArea
					className={`textarea resize-none disabled:textarea-bordered disabled:border disabled:border-solid disabled:text-neutral/50 ${
						errors.msg ? "textarea-error" : "textarea-info"
					}`}
					placeholder="ej: Hola Patricio, me comunico contigo para ... este es mi correo ejemplo@gmail.com"
					{...register("msg", { required: true })}
					disabled={disabledField}
				/>
				<FieldError className="label-text-alt text-error text-sm absolute top-full" />
				{showFeedback && (
					<span className="label-text-alt text-sm text-secondary absolute top-full left-1/2 -translate-x-1/2">
						¡Mensaje enviado!
					</span>
				)}
				<Button
					type="submit"
					isDisabled={disabledField || !isValid}
					className={`btn btn-circle absolute text-white -bottom-6 -right-6 ${
						isValid ? "btn-info" : "btn-disabled"
					}`}
				>
					<EnvelopeIcon className="w-6" />
				</Button>
			</TextField>
		</Form>
	);
};
