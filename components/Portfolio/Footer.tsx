import styles from "@/styles/Portfolio.module.css"
import { GithubIcon, GitlabIcon, InstagramIcon, LinkedinIcon, MediumIcon, QuoraIcon, TwitterIcon, YoutubeIcon } from "../icons"

export default function PortfolioFooter() {
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