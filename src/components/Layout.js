import React from "react";
import MenuLeft from "./MenuLeft";
import MenuTop from "./MenuTop";

const Layout = ({ children, header, title, smallTiles, leftMenu }) => (
	<div className={"layout"}>
		<MenuTop />
		<div className={"content"}>
			<MenuLeft items={leftMenu} />
			<div className={"content-wrapper"}>
				{title && <h1 className={"site-title"}>{title}</h1>}
				<div
					className={`${smallTiles ? "content-wrapper-small" : null}`}
				>
					{children}
				</div>
			</div>
		</div>
	</div>
);

export default Layout;
