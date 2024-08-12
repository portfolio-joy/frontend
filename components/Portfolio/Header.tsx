import React from "react";
import { Navbar, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarContent, NavbarItem, Link } from "@nextui-org/react";
import styles from "@/styles/Portfolio.module.css"

export default function PortfolioHeader() {
    const menuItems = [
        "About Me",
        "Technical Skills",
        "Soft Skills",
        "Projects",
        "Testimonials",
        "Contact",
    ];

    return (
        <Navbar isBordered className={styles['navbar']}>
            <NavbarContent className="md:hidden" justify="end">
                <NavbarMenuToggle />
            </NavbarContent>

            <NavbarContent className={`hidden md:flex`} justify="end">
                {menuItems.map((item, index) => (
                    <NavbarItem key={index}>
                        <Link color="foreground" href="#">
                            {item}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            <NavbarMenu className={styles['navbar-menu']}>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={index}>
                        <Link className="w-full" href="#" size="lg">
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
