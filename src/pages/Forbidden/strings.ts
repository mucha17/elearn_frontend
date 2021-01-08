import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
	en: {
		title: "Access forbidden",
		messages: {
			noPermissions: "You do not have permissions to view this page.",
			requiresLogin:
				"Viewing this page requires user authorization. Log in to view this page.",
		},
	},
	pl: {
		title: "Dostęp wzbroniony",
		messages: {
			noPermissions:
				"Nie posiadasz uprawnień do wyświetlenia tej strony.",
			requiresLogin:
				"Do wyświetlenia tej strony konieczne jest uwierzytelnienie użytkownika. Zaloguj się, aby wyświetlić tą stronę",
		},
	},
});

export default strings;
