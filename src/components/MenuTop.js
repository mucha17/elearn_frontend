import React from "react";
import { NavLink } from "react-router-dom";

const MenuLeft = () => {
	// TODO: fetchowanie jakichs tam nadkursami
	const Items = [
		{
			id: 0,
			name: "Home",
			to: "/home",
		},
		{
			id: 1,
			name: "Java",
			to: "/java",
		},
		{
			id: 2,
			name: "PHP",
			to: "/php",
		},
		{
			id: 3,
			name: "CSS",
			to: "/css",
		},
		{
			id: 4,
			name: "HTML",
			to: "/html",
		},
	];

	return (
		<nav className={"menu-left"}>
			{Items.map((item) => (
				<NavLink key={item.id} to={item.to}>
					<div className={"menu-left-item"}>{item.name}</div>
				</NavLink>
			))}
		</nav>
	);
};

export default MenuLeft;
