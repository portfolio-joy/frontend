import React from "react";
import { Navbar, NavbarMenuToggle, NavbarMenu, NavbarContent, Link } from "@nextui-org/react";
import styles from "@/styles/Portfolio.module.css"

export default function PortfolioHeader() {
    const menuItems = [
        {
            name: "About Me",
            id: "aboutMe"
        },
        {
            name: "Technical Skills",
            id: "technicalSkills"
        },
        {
            name: "Soft Skills",
            id: "softSkills"
        },
        {
            name: "Projects",
            id: "projects"
        },
        {
            name: "Testimonial",
            id: "testimonial"
        },
        {
            name: "Contact",
            id: "contact"
        },
    ];

    return (
        <Navbar isBordered className={styles['navbar']}>
            <NavbarContent className="md:hidden" justify="end">
                <NavbarMenuToggle />
            </NavbarContent>

            <NavbarContent className={`hidden md:flex ${styles['navbar-menu']}`} justify="end">
                {menuItems.map((item, index) => (
                    <Link key={index} href={`#${item.id}`}>
                        {item.name}
                    </Link>
                ))}
            </NavbarContent>

            <NavbarMenu className={styles['navbar-menu']}>
                {menuItems.map((item, index) => (
                    <Link key={index} href={`#${item.id}`}>
                        {item.name}
                    </Link>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
