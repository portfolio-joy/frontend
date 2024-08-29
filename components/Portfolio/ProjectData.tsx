import styles from "@/styles/Portfolio.module.css"
import { useRouter } from "next/router";
import { useEffect } from "react";
import UserImage from "@/public/user.jpg"
import Image from "next/image";

export default function ProjectData() {
    const router = useRouter();
    useEffect(() => {
        console.log((router.query.user as string[])[1]);
    }, [])
    return (
        <section className={styles['project-data']}>
            <h1>Server Us</h1>
            <div className="project-detail">
                <Image alt="User Image" src={UserImage}></Image>
                <div>
                    <h3>Project Data Heading</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A vel assumenda, modi veritatis mollitia quam nemo distinctio provident numquam dolorem nostrum libero possimus impedit, quasi doloribus beatae harum aspernatur nihil!</p>
                </div>
            </div>
            <div className="project-detail">
                <Image alt="User Image" src={UserImage}></Image>
                <div>
                    <h3>Project Data Heading</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A vel assumenda, modi veritatis mollitia quam nemo distinctio provident numquam dolorem nostrum libero possimus impedit, quasi doloribus beatae harum aspernatur nihil!</p>
                </div>
            </div>
            <div className="project-detail">
                <Image alt="User Image" src={UserImage}></Image>
                <div>
                    <h3>Project Data Heading</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A vel assumenda, modi veritatis mollitia quam nemo distinctio provident numquam dolorem nostrum libero possimus impedit, quasi doloribus beatae harum aspernatur nihil!</p>
                </div>
            </div>
            <div className="project-detail">
                <Image alt="User Image" src={UserImage}></Image>
                <div>
                    <h3>Project Data Heading</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A vel assumenda, modi veritatis mollitia quam nemo distinctio provident numquam dolorem nostrum libero possimus impedit, quasi doloribus beatae harum aspernatur nihil!</p>
                </div>
            </div>
            <div className="project-detail">
                <Image alt="User Image" src={UserImage}></Image>
                <div>
                    <h3>Project Data Heading</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A vel assumenda, modi veritatis mollitia quam nemo distinctio provident numquam dolorem nostrum libero possimus impedit, quasi doloribus beatae harum aspernatur nihil!</p>
                </div>
            </div>
        </section>
    )
}