import React from "react";
import strings from "./strings";

const HomePage = (): JSX.Element => {
	const selectedLanguage =
		localStorage.getItem("selectedLanguage")?.toString() ?? "pl";
	strings.setLanguage(selectedLanguage ?? "pl");

	return (
		<div>
			<h1>View Video</h1>
			<video width="400" controls>
				<source
					src={
						"http://localhost:8080/api/videos/5ff7b64b8438804e301f9af8"
					}
				/>
			</video>
			<h1>View Image</h1>
			<img
				src={
					"http://localhost:8080/api/images/5ff7c6403c807b6f48590c1f"
				}
			/>
		</div>
	);
};

export default HomePage;
