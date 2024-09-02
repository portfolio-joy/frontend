import styles from "@/styles/Portfolio.module.css"
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import UserImage from "@/public/user.jpg"
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";

export default function ProjectData() {
    const router = useRouter();
    useEffect(() => {
    }, [])
    const controls = useAnimation();
    const ref = useRef(null);
    const inView = useInView(ref,{amount: "some", once: true});

    useEffect(() => {
        if (inView) {
            controls.start({ opacity: 1, x: 0, transition: { duration: 1 } });
        } else {
            controls.start({ opacity: 0, x: "-100%", transition: { duration: 1 }});
        }
    }, [controls, inView]);

    return (
        <section className={styles['project-data']}>
            <h1>Server Us</h1>
            <motion.div
                ref={ref}
                className="project-detail"
                initial={{ opacity: 0, x: -50 }}
                animate={controls}
            >
                <Image alt="User Image" src={UserImage}></Image>
                <div>
                    <h3>Project Data Heading</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A vel assumenda, modi veritatis mollitia quam nemo distinctio provident numquam dolorem nostrum libero possimus impedit, quasi doloribus beatae harum aspernatur nihil!</p>
                </div>
            </motion.div>
            <motion.div
                ref={ref}
                className="project-detail"
                initial={{ opacity: 0, x: -50 }}
                animate={controls}
            >
                <Image alt="User Image" src={UserImage}></Image>
                <div>
                    <h3>Project Data Heading</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A vel assumenda, modi veritatis mollitia quam nemo distinctio provident numquam dolorem nostrum libero possimus impedit, quasi doloribus beatae harum aspernatur nihil!</p>
                </div>
            </motion.div>
            <motion.div
                ref={ref}
                className="project-detail"
                initial={{ opacity: 0, x: -50 }}
                animate={controls}
            >
                <Image alt="User Image" src={UserImage}></Image>
                <div>
                    <h3>Project Data Heading</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A vel assumenda, modi veritatis mollitia quam nemo distinctio provident numquam dolorem nostrum libero possimus impedit, quasi doloribus beatae harum aspernatur nihil!</p>
                </div>
            </motion.div>
            <motion.div
                ref={ref}
                className="project-detail"
                initial={{ opacity: 0, x: -50 }}
                animate={controls}
            >
                <Image alt="User Image" src={UserImage}></Image>
                <div>
                    <h3>Project Data Heading</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A vel assumenda, modi veritatis mollitia quam nemo distinctio provident numquam dolorem nostrum libero possimus impedit, quasi doloribus beatae harum aspernatur nihil!</p>
                </div>
            </motion.div>
        </section>
    )
}