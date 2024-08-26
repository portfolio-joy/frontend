import { useAppSelector } from "@/hooks/hooks";
import styles from "@/styles/Portfolio.module.css"
import { SkillsType } from "@/types/SkillsType";
import { Card, CardBody, CardFooter, CardHeader, Progress, Tooltip } from "@nextui-org/react"
import { useEffect, useState } from "react";

export default function PortfolioTechnicalSkills() {
    const portfolioState = useAppSelector((state) => state.user);
    const [technicalSkills, setTechnicalSkills] = useState<SkillsType[] | null | undefined>(null);
    useEffect(() => {
        if (portfolioState.success) {
            console.log(portfolioState.user);
            setTechnicalSkills(portfolioState.user?.skills.filter((skill) => skill.skillType === 'Technical'));
        }
    }, [portfolioState.success])
    return (
        <>
            {
                technicalSkills &&
                <section id="technicalSkills" className={styles['technical-skills']}>
                    <h1>Technical Skills</h1>
                    <div>
                        {
                            technicalSkills.map((technicalSkill,index) =>
                                <Card key={index} className={styles['skill-card']}>
                                    <CardHeader>
                                        <h3>{technicalSkill.name}</h3>
                                    </CardHeader>
                                    <Tooltip className='w-96' content={technicalSkill.description}>
                                        <CardBody className={styles['card-body']}>
                                            {technicalSkill.description}
                                        </CardBody>
                                    </Tooltip>
                                    <CardFooter className={styles['card-footer']}>
                                        <Tooltip content={technicalSkill.proficiency}><Progress className={`max-w-md ${styles['proficiency-bar']}`} value={technicalSkill.proficiency} aria-label="proficiency" /></Tooltip>
                                    </CardFooter>
                                </Card>
                            )
                        }
                    </div>
                </section>
            }
        </>
    )
}