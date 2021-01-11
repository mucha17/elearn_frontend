import React from "react";
import Tile from "./Tile";

const Video = ({ src, title }) => {
	return (
		<Tile title={title}>
			<video width="100%" controls>
				<source src={src} />
			</video>
		</Tile>
	);
};

export default Video;
