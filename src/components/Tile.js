import React from "react";

const Tile = ({ children, title }) => {
	return (
		<div className={"tile-wrapper"}>
			<div className={"tile-title"}>{title}</div>
			<div className={"tile-content-wrapper"}>{children}</div>
		</div>
	);
};

export default Tile;
