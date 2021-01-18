import React from "react";
import Tile from "./Tile";
import { NavLink } from "react-router-dom";

const ItemTile = ({ title, description, url, type }) => {
	switch (type) {
		case "lesson":
			type = "Przejdź do lekcji";
			break;
		case "module":
			type = "Przejdź do modułu";
			break;
		case "course":
			type = "Przejdź do kursów";
			break;
		case "edit":
			type = "Edytuj";
			break;
		case "create":
			type = "Stwórz";
			break;
		default:
			type = "Przejdź";
			break;
	}

	return (
		<Tile title={title}>
			<div className={"item-wrapper"}>
				<p className={"item-description"}>{description}</p>
				<div className={"link"}>
					<NavLink to={url}>{type}</NavLink>
				</div>
			</div>
		</Tile>
	);
};

export default ItemTile;
