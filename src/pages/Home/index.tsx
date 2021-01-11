import React from "react";
import strings from "./strings";
import Image from "../../components/Image";
import Video from "../../components/Video";

const HomePage = (): JSX.Element => {
	const selectedLanguage =
		localStorage.getItem("selectedLanguage")?.toString() ?? "pl";
	strings.setLanguage(selectedLanguage ?? "pl");

	return (
		<div>
			<Video
				src={
					"http://localhost:8080/api/videos/5ff7b64b8438804e301f9af8"
				}
				title={"Video"}
			/>
			<Image
				title={"Image"}
				alt={"image"}
				src={
					"https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"
				}
			/>
		</div>
	);
};

export default HomePage;
