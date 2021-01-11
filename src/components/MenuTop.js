import React from "react";
import MenuTopItem from "./MenuTopItem";
import { top as items } from "../data/menu";

const MenuTop = () => {
	return (
		<nav className={"menu-top"}>
			{items.map((item) => (
				<MenuTopItem
					key={item.id}
					name={item.name}
					to={item.to}
					action={item.action}
					condition={item.condition}
				/>
			))}
		</nav>
	);
};

export default MenuTop;
