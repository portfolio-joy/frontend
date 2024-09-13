import styles from "@/styles/Portfolio.module.css"
import { Chip } from "@nextui-org/react"
import { AboutMeType } from "@/types/AboutMeType";
import { useEffect, useState } from "react";
import { ImageType } from "@/types/ImageType";
import { useAppSelector } from "@/hooks/hooks";

export default function PortfolioAboutMe() {

    const portfolioState = useAppSelector(state => state.user);
    const [aboutMe, setAboutMe] = useState<AboutMeType | null | undefined>(null);
    const [skillsArray, setSkillsArray] = useState<string[]>();

    useEffect(() => {
        if (portfolioState.success) {
            setAboutMe(portfolioState.user?.aboutMe);
            if (aboutMe?.skills) {
                setSkillsArray(aboutMe.skills.split(','));
            }
        }
    }, [portfolioState.success, aboutMe])

    return (
        <section id="aboutMe" className={styles['about-me']}>
            <div className={styles['user-detail']}>
                <h1>I'm {aboutMe?.name}</h1>
                <p className="break-words">{aboutMe?.description}</p>
                <div className={styles['data-chips']}>
                    {skillsArray &&
                        skillsArray?.map((skill, index) =>
                            skill.trim() && <Chip key={index} className="mr-5 mt-5">{skill.trim()}</Chip>
                        )
                    }
                </div>
            </div>
            <div className={styles['user-image']}>
                <img src={`data:${(aboutMe?.image as ImageType)?.type};base64,${(aboutMe?.image as ImageType)?.imageData}`}></img>
            </div>
        </section>
    )
}