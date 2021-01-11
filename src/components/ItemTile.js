import React from "react";
import Tile from "./Tile";
import { NavLink } from "react-router-dom";

const CourseTile = ({ title, description, url }) => {
	return (
		<Tile title={title}>
			<div className={"course-wrapper"}>
				<p className={"course-description"}>{description}</p>
				<div className={"link"}>
					<NavLink to={url}>Przejdź do kursu</NavLink>
				</div>
			</div>
		</Tile>
	);
};

export default CourseTile;
