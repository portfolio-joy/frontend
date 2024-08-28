import styles from "@/styles/Portfolio.module.css"
import Carousel from "./Carousel"
import { Button, Card, CardBody, CardFooter, CardHeader, Image, Tooltip, User } from "@nextui-org/react"
import UserImage from "@/public/user.jpg"
export default function Projects() {
    return (
        <section id="projects" className={styles['projects']}>
            <h1>My Projects</h1>
            <Carousel>
                <Card className={`${styles['skill-card']}`}>
                    <Image removeWrapper src="https://nextui.org/images/card-example-3.jpeg" className="w-full h-56 object-cover rounded-none"></Image>
                    <CardHeader>
                        <h3>ServerUs</h3>
                    </CardHeader>
                    <Tooltip className='w-96 break-all' content="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque sequi suscipit non, laborum magnam voluptatum enim itaque! Dolorum ipsam vero aliquam eius laboriosam officiis porro quo explicabo odit fuga. Nisi.">
                        <CardBody className={`${styles['card-body']}`}>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque sequi suscipit non, laborum magnam voluptatum enim itaque! Dolorum ipsam vero aliquam eius laboriosam officiis porro quo explicabo odit fuga. Nisi.
                        </CardBody>
                    </Tooltip>
                    <CardFooter className="m-0 p-0 ps-2">
                        <Button className="m-0 bg-secondary text-white">Learn More</Button>
                    </CardFooter>
                </Card>
                <Card className={`${styles['skill-card']}`}>
                    <Image removeWrapper src="https://nextui.org/images/card-example-3.jpeg" className="w-full h-56 object-cover rounded-none"></Image>
                    <CardHeader>
                        <h3>ServerUs</h3>
                    </CardHeader>
                    <Tooltip className='w-96 break-all' content="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque sequi suscipit non, laborum magnam voluptatum enim itaque! Dolorum ipsam vero aliquam eius laboriosam officiis porro quo explicabo odit fuga. Nisi.">
                        <CardBody className={`${styles['card-body']}`}>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque sequi suscipit non, laborum magnam voluptatum enim itaque! Dolorum ipsam vero aliquam eius laboriosam officiis porro quo explicabo odit fuga. Nisi.
                        </CardBody>
                    </Tooltip>
                    <CardFooter className="m-0 p-0 ps-2">
                        <Button className="m-0 bg-secondary text-white">Learn More</Button>
                    </CardFooter>
                </Card>
                <Card className={`${styles['skill-card']}`}>
                    <Image removeWrapper src="https://nextui.org/images/card-example-3.jpeg" className="w-full h-56 object-cover rounded-none"></Image>
                    <CardHeader>
                        <h3>ServerUs</h3>
                    </CardHeader>
                    <Tooltip className='w-96 break-all' content="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque sequi suscipit non, laborum magnam voluptatum enim itaque! Dolorum ipsam vero aliquam eius laboriosam officiis porro quo explicabo odit fuga. Nisi.">
                        <CardBody className={`${styles['card-body']}`}>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque sequi suscipit non, laborum magnam voluptatum enim itaque! Dolorum ipsam vero aliquam eius laboriosam officiis porro quo explicabo odit fuga. Nisi.
                        </CardBody>
                    </Tooltip>
                    <CardFooter className="m-0 p-0 ps-2">
                        <Button className="m-0 bg-secondary text-white">Learn More</Button>
                    </CardFooter>
                </Card>
                <Card className={`${styles['skill-card']}`}>
                    <Image removeWrapper src="https://nextui.org/images/card-example-3.jpeg" className="w-full h-56 object-cover rounded-none"></Image>
                    <CardHeader>
                        <h3>ServerUs</h3>
                    </CardHeader>
                    <Tooltip className='w-96 break-all' content="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque sequi suscipit non, laborum magnam voluptatum enim itaque! Dolorum ipsam vero aliquam eius laboriosam officiis porro quo explicabo odit fuga. Nisi.">
                        <CardBody className={`${styles['card-body']}`}>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque sequi suscipit non, laborum magnam voluptatum enim itaque! Dolorum ipsam vero aliquam eius laboriosam officiis porro quo explicabo odit fuga. Nisi.
                        </CardBody>
                    </Tooltip>
                    <CardFooter className="m-0 p-0 ps-2">
                        <Button className="m-0 bg-secondary text-white">Learn More</Button>
                    </CardFooter>
                </Card>
            </Carousel>
        </section>
    )
}