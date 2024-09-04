import styles from "@/styles/Portfolio.module.css"
import { BlockquoteIcon, StarIcon } from "../icons"
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function PortfolioTestimonials() {

    // const [testimonials, setTestimonials] = useState<TestimonialType[]>([])
    const [currentIndex, setCurrentIndex] = useState(0);
    const testimonials = ([
        {
            id: '',
            name: 'Chirag Panjwani',
            designation: 'Associate Software Engineer',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, eveniet optio voluptatibus tempore culpa incidunt repudiandae fugiat ut voluptate in, repellat minima recusandae veritatis. Suscipit sunt praesentium recusandae ea ipsa.',
            rating: 3
        },
        {
            id: '',
            name: 'Chirag Panjwani',
            designation: 'Associate Software Developer',
            description: 'Lorem ipsum dolor sit amet c in, repellat minima recusandae veritatis. Suscipit sunt praesentium recusandae ea ipsa.',
            rating: 3
        },
        {
            id: '',
            name: 'Raman Gupta',
            designation: 'Software Engineer',
            description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a',
            rating: 3
        },
        {
            id: '',
            name: 'Chirag Panjwani',
            designation: 'Associate Software Engineer',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, eveniet optio voluptatibus tempore culpa incidunt repudiandae fugiat ut voluptate in, repellat minima recusandae veritatis. Suscipit sunt praesentium recusandae ea ipsa.',
            rating: 3
        },
        {
            id: '',
            name: 'Chirag Panjwani',
            designation: 'Associate Software Engineer',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, eveniet optio voluptatibus tempore culpa incidunt repudiandae fugiat ut voluptate in, repellat minima recusandae veritatis. Suscipit sunt praesentium recusandae ea ipsa.',
            rating: 3
        },
    ])

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <section className={styles['testimonials']}>
            <h1>Testimonials</h1>
            <div className={styles['quotes']}>
                <AnimatePresence mode="wait">
                    <motion.blockquote
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        className={styles['quote']}
                    >
                        <BlockquoteIcon />
                        <p>{testimonials[currentIndex].description}</p>
                        <cite>
                            <div className="flex justify-end">
                                {
                                    Array.from(Array(testimonials[currentIndex].rating), (rating, index) =>
                                        <StarIcon />
                                    )
                                }
                            </div>
                            <b>-{testimonials[currentIndex].name}</b>
                            <p className="text-sm">{testimonials[currentIndex].designation}</p>
                        </cite>
                    </motion.blockquote>
                </AnimatePresence>
            </div>
        </section>
    )
}