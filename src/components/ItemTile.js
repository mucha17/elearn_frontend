import React from "react";
import Tile from "./Tile";
import { NavLink } from "react-router-dom";

const ItemTile = ({ title, description, url, type }) => {
	switch (type) {
		case "lesson":
			type = "lekcji";
			break;
		case "module":
			type = "modułu";
			break;
		case "course":
			type = "kursów";
			break;
	}

	return (
		<Tile title={title}>
			<div className={"item-wrapper"}>
				<p className={"item-description"}>{description}</p>
				<div className={"link"}>
					<NavLink to={url}>Przejdź do {type}</NavLink>
				</div>
			</div>
		</Tile>
	);
};

export default ItemTile;
