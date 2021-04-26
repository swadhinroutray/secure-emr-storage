export const validateRequired = (value, name) =>
	value && value !== '' ? '' : `${name} required`;

export const validateWithError = (predicate, err) => (predicate ? '' : err);

export const chainValidations = (...validations) => {
	for (const v of validations) {
		if (v.length > 0) return v;
	}
	return '';
};
