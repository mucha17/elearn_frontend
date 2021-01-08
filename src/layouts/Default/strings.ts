import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
	en: {
		pleaseWait: "Please wait...",
		connecting: "Initializing connection with IoTES Connect",
	},
	pl: {
		pleaseWait: "Proszę czekać...",
		connecting: "Inicjowanie połączenia z KN IoTES Connect",
	},
});

export default strings;
