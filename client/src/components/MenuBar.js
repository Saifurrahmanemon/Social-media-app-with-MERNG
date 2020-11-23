import React, { useState, useContext } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
function MenuBar() {
    const { user, logout } = useContext(AuthContext);
    const pathname = window.location.pathname;
    const path = pathname === "/" ? "home" : pathname.substr(1);

    const [activeItem, setActiveItem] = useState(path);
    const handleItemClick = (e, { name }) => setActiveItem(name);
    const MenuBar = user ? (
        <Menu pointing secondary size="huge" color="violet">
            <Menu.Item name={user.username} active as={Link} to="/" />

            <Menu.Menu position="right">
                <Menu.Item name="Logout" onClick={logout} />
            </Menu.Menu>
        </Menu>
    ) : (
        <Menu pointing secondary size="huge" color="violet">
            <Menu.Item
                name="home"
                active={activeItem === "home"}
                onClick={handleItemClick}
                as={Link}
                to="/"
            />

            <Menu.Menu position="right">
                <Menu.Item
                    name="Login"
                    active={activeItem === "Login"}
                    onClick={handleItemClick}
                    as={Link}
                    to="/login"
                />

                <Menu.Item
                    name="register"
                    active={activeItem === "register"}
                    onClick={handleItemClick}
                    as={Link}
                    to="/register"
                />
            </Menu.Menu>
        </Menu>
    );

    return MenuBar;
}

export default MenuBar;
