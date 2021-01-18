import React from "react";

const Tile = ({ children, title, list }) => {
	return (
		<div className={"tile-wrapper"}>
			<div className={"tile-title"}>{title}</div>
			<div className={`tile-content-wrapper ${list ? 'list' : null}`}>{children}</div>
		</div>
	);
};

export default Tile;
