import React from "react";
import Tile from "./Tile";

const Image = ({ src, alt, title }) => {
	return (
		<Tile title={title}>
			<img src={src} alt={alt} />
		</Tile>
	);
};

export default Image;
