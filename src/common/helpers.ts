import { FieldErrors } from "react-hook-form";

export const getValidationErrors = (errors: FieldErrors) => {
	const obj: Record<string, string> = {};

	for (const field of Object.entries(errors)) {
		if (field[1]?.message) obj[field[0]] = field[1].message;
	}
	return obj;
};
