export type UserForm = {
	email?: string;
	firstName?: string;
	lastName?: string;
	addressAutocomplete?: string;
	birthday?: {
		day: string;
		month: string;
		year: string;
	};
};
