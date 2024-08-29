import styles from "@/styles/Portfolio.module.css"
import Carousel from "./Carousel"
import { Button, Card, CardBody, CardFooter, CardHeader, Image, Tooltip, User } from "@nextui-org/react"
import { ProjectsType } from "@/types/ProjectsType";
import { useAppSelector } from "@/hooks/hooks";
import { useState, useEffect } from "react";
import { ImageType } from "@/types/ImageType";
export default function Projects() {
    const portfolioState = useAppSelector((state) => state.user);
    const [projects, setProjects] = useState<ProjectsType[]>([]);
    useEffect(() => {
        if (portfolioState.success) {
            setProjects(portfolioState.user ? portfolioState.user.projects : []);
        }
    }, [portfolioState.success])
    return (
        <section id="projects" className={styles['projects']}>
            <h1>My Projects</h1>
            <Carousel>
                {
                    projects.map((project,index)=>
                    <Card className={`${styles['common-card']}`}>
                        <Image src={`data:${(project?.image as ImageType)?.type};base64,${(project?.image as ImageType)?.imageData}`} className="w-full h-56 object-contain rounded-none"></Image>
                        <CardHeader>
                            <h3>{project.name}</h3>
                        </CardHeader>
                        <Tooltip className='w-96 break-all' content={project.briefDetail}>
                            <CardBody className={`${styles['card-body']}`}>
                                {project.briefDetail}
                            </CardBody>
                        </Tooltip>
                        <CardFooter className="m-0 p-0 ps-2">
                            <Button className="m-0 bg-secondary text-white">Learn More</Button>
                        </CardFooter>
                    </Card>
                    )
                }
            </Carousel>
        </section>
    )
}