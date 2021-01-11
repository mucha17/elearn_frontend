import React from "react";
import { NavLink } from "react-router-dom";

const MenuTopItem = ({ name, to, action, condition }) => {
	condition = condition ?? true;
	action = action ?? false;

	if (condition) {
		if (action) {
			return (
				<div onClick={() => action()}>
					<div className={"menu-top-item"}>{name}</div>
				</div>
			);
		} else {
			return (
				<NavLink to={to}>
					<div className={"menu-top-item"}>{name}</div>
				</NavLink>
			);
		}
	} else {
		return (
			<div>
				<div className={"menu-top-item"}>{name}</div>
			</div>
		);
	}
};

export default MenuTopItem;
