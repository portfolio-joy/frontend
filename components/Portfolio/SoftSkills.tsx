import { useAppSelector } from "@/hooks/hooks";
import styles from "@/styles/Portfolio.module.css"
import { SkillsType } from "@/types/SkillsType";
import { Card, CardBody, CardHeader, Tooltip } from "@nextui-org/react"
import { useState, useEffect } from "react";

export default function PortfolioSoftSkills() {
    const portfolioState = useAppSelector((state) => state.user);
    const [softSkills, setSoftSkills] = useState<SkillsType[] | null | undefined>(null);
    useEffect(() => {
        if (portfolioState.success) {
            console.log(portfolioState.user);
            setSoftSkills(portfolioState.user?.skills.filter((skill) => skill.skillType === 'Soft'));
        }
    }, [portfolioState.success])
    return (
        <>
            {
                softSkills &&
                <section id="SoftSkills" className={styles['soft-skills']}>
                    <h1>Soft Skills</h1>
                    <div>
                        {
                            softSkills.map((softSkill, index) =>
                                <Card className={styles['skill-card']}>
                                    <CardHeader>
                                        <h3>{softSkill.name}</h3>
                                    </CardHeader>
                                    <Tooltip className='w-96 break-normal' content={softSkill.description}>
                                        <CardBody className={styles['card-body']}>
                                            {softSkill.description}
                                        </CardBody>
                                    </Tooltip>
                                </Card>
                            )
                        }
                    </div>
                </section>
            }
        </>
    )
}