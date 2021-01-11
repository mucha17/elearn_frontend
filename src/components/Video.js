import React from "react";
import Tile from "./Tile";

const Video = ({ src, title }) => {
	return (
		<Tile title={title}>
			<iframe width="100%" src={src} className={"video"} />
		</Tile>
	);
};

export default Video;
