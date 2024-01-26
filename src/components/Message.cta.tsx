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
import { useToggle } from "@uidotdev/usehooks";
import { useEffect } from "react";
import { Formik, FormikHelpers } from "formik";
import { withZodSchema } from "formik-validator-zod";

const schema = z.object({
	msg: z
		.string()
		.refine((string) => string.trim().length > 0, {
			message: "No puede estar vacío.",
		})
		.refine((string) => !/^\s*$/.test(string), {
			message: "No se permiten solo espacios vacíos.",
		}),
});

export const MessageCTA = () => {
	const [submit] = useFormspark({
		formId: process.env.NEXT_PUBLIC_FORMSPARK_ID!,
	});

	const [showFeedback, toggleFeedback] = useToggle(false);

	const handleSubmit = async (
		data: typeof schema._type,
		form: FormikHelpers<typeof schema._type>
	) => {
		try {
			await submit({ msg: data.msg.replace(/\\n/g, "") });
			toggleFeedback(true);
			setTimeout(() => {
				form.resetForm();
				toggleFeedback(false);
			}, 3000);
		} catch (error) {
			form.setFieldError("msg", JSON.stringify(error));
			setTimeout(() => {
				form.setFieldError("msg", undefined);
				toggleFeedback(false);
			}, 3000);
		}
	};

	useEffect(() => {
		let timeoutId: any;
		if (showFeedback) {
			timeoutId = setTimeout(() => {
				toggleFeedback(false);
			}, 3000);
		}

		return () => clearTimeout(timeoutId);
	}, [showFeedback]);

	return (
		<Formik<typeof schema._type>
			initialValues={{
				msg: "",
			}}
			validate={withZodSchema(schema)}
			onSubmit={handleSubmit}
		>
			{({
				handleBlur,
				handleSubmit,
				setFieldValue,
				values,
				errors,
				touched,
				isSubmitting,
				isValid,
			}) => {
				const disabledFields = isSubmitting || showFeedback;
				return (
					<Form onSubmit={handleSubmit} validationErrors={errors}>
						<TextField
							className={`form-control relative`}
							name="msg"
							value={values.msg}
							onChange={(x) => setFieldValue("msg", x)}
							onBlur={handleBlur}
							isInvalid={Boolean(errors.msg && touched.msg)}
						>
							<Label className="absolute start-2.5 -top-3 p-0.5 text-sm text-neutral bg-white select-none">
								Contactame
								<ChatBubbleLeftIcon className="w-6 ml-1 inline" />
							</Label>
							<TextArea
								name="msg"
								className={`textarea resize-none disabled:textarea-bordered disabled:border disabled:border-solid disabled:text-neutral/50 invalid:textarea-error valid:textarea-info`}
								placeholder="ej: Hola Patricio, me comunico contigo para ... este es mi correo ejemplo@gmail.com"
								disabled={disabledFields}
							/>
							<FieldError className="label-text-alt text-error text-sm absolute top-full">
								{errors?.msg}
							</FieldError>
							{showFeedback && !errors?.msg && (
								<span className="label-text-alt text-sm text-secondary absolute top-full left-1/2 -translate-x-1/2">
									¡Mensaje enviado!
								</span>
							)}
							<Button
								type="submit"
								isDisabled={disabledFields || !isValid}
								className={`btn btn-circle absolute text-white -bottom-6 -right-6 btn-info`}
							>
								<EnvelopeIcon className="w-6" />
							</Button>
						</TextField>
					</Form>
				);
			}}
		</Formik>
	);
};
