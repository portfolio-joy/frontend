import React from "react";
import { Navbar, NavbarMenuToggle, NavbarMenu, NavbarContent, Link } from "@nextui-org/react";
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

            <NavbarContent className={`hidden md:flex ${styles['navbar-menu']}`} justify="end">
                {menuItems.map((item, index) => (
                        <Link key={index} href="#">
                            {item}
                        </Link>
                ))}
            </NavbarContent>

            <NavbarMenu className={styles['navbar-menu']}>
                {menuItems.map((item, index) => (
                        <Link key={index} className="w-full" href="#" size="lg">
                            {item}
                        </Link>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
