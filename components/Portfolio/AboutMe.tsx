import styles from "@/styles/Portfolio.module.css"
import Image from "next/image"
import portfolioImage from '@/public/user.jpg'
import { Chip } from "@nextui-org/react"

export default function PortfolioAboutMe() {
    return (
        <section className={styles['about-me']}>
            <div className={styles['user-detail']}>
                <h1>I'm Chirag Panjwani</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptas minima architecto nam, placeat at sunt perspiciatis officia nesciunt porro animi assumenda corporis cumque expedita iste, repellendus natus quia obcaecati.</p>
                <div className={styles['skill-chips']}>
                    <Chip className="mr-5 mt-5"> HTML </Chip>
                    <Chip className="mr-5 mt-5"> JavaScript </Chip>
                    <Chip className="mr-5 mt-5"> Web Development </Chip>
                    <Chip className="mr-5 mt-5"> Android </Chip>
                </div>
            </div>
            <div className={styles['user-image']}>
                <Image src={portfolioImage} alt="portfolioImage"></Image>
            </div>
        </section>
    )
}