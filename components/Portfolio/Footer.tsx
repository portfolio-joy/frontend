import styles from "@/styles/Portfolio.module.css"
import { GithubIcon, GitlabIcon, InstagramIcon, LinkedinIcon, QuoraIcon, TwitterIcon, YoutubeIcon } from "../icons"
import dynamic from "next/dynamic"

export default function PortfolioFooter() {
    const MediumIcon = dynamic<{}>(() => import('../icons').then(module => module.MediumIcon))
    return(
        <footer className={styles['footer']}>
            <MediumIcon />
            <YoutubeIcon />
            <QuoraIcon />
            <TwitterIcon />
            <GithubIcon />
            <GitlabIcon />
            <InstagramIcon />
            <LinkedinIcon />
        </footer>
    )
}