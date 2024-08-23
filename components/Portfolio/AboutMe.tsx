import styles from "@/styles/Portfolio.module.css"
import { Chip } from "@nextui-org/react"
import { RootState } from "@/pages/redux/store";
import { useSelector } from "react-redux";
import { AboutMeType } from "@/types/AboutMeType";
import { useEffect, useState } from "react";
import { ImageType } from "@/types/ImageType";

export default function PortfolioAboutMe() {

    const portfolioState = useSelector((state: RootState) => state.portfolio);
    const [aboutMe, setAboutMe] = useState<AboutMeType | null | undefined>(null);
    const [skillsArray, setSkillsArray] = useState<string[]>();
    useEffect(() => {
        if (portfolioState.success) {
            setAboutMe(portfolioState.data?.aboutMe);
            if (aboutMe?.skills) {
                setSkillsArray((aboutMe?.skills as string).split(','));
            }
        }
    }, [portfolioState.success, aboutMe?.skills])
    return (
        <>
            {aboutMe &&
                <section id="aboutMe" className={styles['about-me']}>
                    <div className={styles['user-detail']}>
                        <h1>I'm {aboutMe.name}</h1>
                        <p>{aboutMe.description}</p>
                        <div className={styles['skill-chips']}>
                            {skillsArray &&
                                skillsArray?.map((skill, index) =>
                                    <Chip key={index} className="mr-5 mt-5">{skill.trim()}</Chip>
                                )
                            }
                        </div>
                    </div>
                    <div className={styles['user-image']}>
                        <img src={`data:${(aboutMe.profile as ImageType).type};base64,${(aboutMe.profile as ImageType).imageData}`}></img>
                    </div>
                </section>
            }
        </>
    )
}