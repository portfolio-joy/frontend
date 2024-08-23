import styles from "@/styles/Portfolio.module.css"
import { Card, CardBody, CardFooter, CardHeader, Progress, Tooltip } from "@nextui-org/react"

export default function PortfolioTechnicalSkills() {
    return (
        <section id="technicalSkills" className={styles['technical-skills']}>
            <h1>Technical Skills</h1>
            <div>
                <Card className={styles['skill-card']}>
                    <CardHeader>
                        <h3>Skill Name</h3>
                    </CardHeader>
                    <Tooltip className='w-96' content={'Yash Panjwani is a skilled developer proficient in C++, Ruby, and Python. With a strong foundation in C++, Yash excels in writing efficient and high-performance code, making him adept at systems programming and algorithm development. His expertise in Ruby showcases his ability to work with dynamic, object-oriented scripting languages, often using it for web development and automation tasks. Python, being his versatile tool, allows him to tackle a wide range of projects, from data analysis and machine learning to scripting and automation'}>
                        <CardBody className={styles['card-body']}>
                            Yash Panjwani is a skilled developer proficient in C++, Ruby, and Python. With a strong foundation in C++, Yash excels in writing efficient and high-performance code, making him adept at systems programming and algorithm development. His expertise in Ruby showcases his ability to work with dynamic, object-oriented scripting languages, often using it for web development and automation tasks. Python, being his versatile tool, allows him to tackle a wide range of projects, from data analysis and machine learning to scripting and automation
                        </CardBody>
                    </Tooltip>
                    <CardFooter className={styles['card-footer']}>
                        <Tooltip content={'60%'}><Progress className={`max-w-md ${styles['proficiency-bar']}`} value={60} aria-label="proficiency"/></Tooltip>
                    </CardFooter>
                </Card>
            </div>
        </section>
    )
}