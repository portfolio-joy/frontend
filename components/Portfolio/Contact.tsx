import styles from "@/styles/Portfolio.module.css"
import { AddressIcon, EmailIcon, MobileIcon } from "../icons"
import Link from "next/link"

export default function PortfolioContact() {
    return (
        <section id="contact" className={styles['contact-me']}>
            <h1>Contact Me</h1>
            <div className={styles['contact-details']}>
                <div>
                    <AddressIcon />
                    <address><Link href={`http://maps.google.com/?q=Above Muthoot Finance Sindhi Colony, Itarsi, Dist: Narmadapuram, Pin: 461111`}>Above Muthoot Finance Sindhi Colony, Itarsi, Dist: Narmadapuram, Pin: 461111</Link></address>
                </div>
                <div>
                    <MobileIcon />
                    <address><Link href='tel:7440267010'>7440267010</Link></address>
                </div>
                <div>
                    <EmailIcon />
                    <address><Link href="mailto:abcd@gmail.com">abcd@gmail.com</Link></address>
                </div>
            </div>
        </section >
    )
}