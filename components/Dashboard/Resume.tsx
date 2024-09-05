import styles from '@/styles/Dashboard.module.css'
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumeDocument from "../Resume/ResumeDocument";
import { useAppSelector } from "@/hooks/hooks";
import { UserResponseType } from "@/types/UserResponseType";
import React, { useEffect, useState } from "react";
import { Select, SelectItem } from '@nextui-org/react';
import { ProjectsType } from '@/types/ProjectsType';
import { TestimonialType } from '@/types/TestimonialType';

export default function Resume() {
    const userState = useAppSelector(state => state.user);
    const [user, setUser] = useState<UserResponseType | null>(null)
    const [projects, setProjects] = useState<ProjectsType[]>([]);
    const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);
    useEffect(() => {
        if (userState.success) {
            setUser(userState.user);
        }
    }, [userState.user, user])

    const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        const keys = value.split(',');
        let data = keys.map((key) => {
            const project = user!.projects.find((project) => project.id === key)
            return project;
        });
        setProjects(data as ProjectsType[]);
    }

    const handleTestimonialChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        const keys = value.split(',');
        let data = keys.map((key) => {
            const project = user!.testimonials.find((testimonial) => testimonial.id === key)
            return project;
        });
        setTestimonials(data as TestimonialType[]);
    }

    return (
        <div>
            <h1>Your Resume</h1>
            {
                user &&
                <form className={styles['dashboard-form']}>
                    <Select id='projects' name='projects' aria-label='Projects' selectionMode='multiple' items={user?.projects} placeholder="Select your main 3 Projects" className={'p-5'} variant='bordered' onChange={handleProjectChange}>
                        {(project) => <SelectItem key={project?.id}>{project?.name}</SelectItem>}
                    </Select>
                    <Select id='testimonials' name='testimonials' aria-label='Testimonials' selectionMode='multiple' items={user?.testimonials} placeholder="Select your main 3 Testimonials" className={'p-5'} variant='bordered' onChange={handleTestimonialChange}>
                        {(testimonial) => <SelectItem key={testimonial?.id}>{testimonial?.name}</SelectItem>}
                    </Select>
                    <PDFDownloadLink className={`text-center ${styles['submit-button']}`} document={<ResumeDocument {...{ ...user, projects: projects, testimonials: testimonials }} />} fileName="resume.pdf">
                        Download your Resume
                    </PDFDownloadLink>
                </form>
            }
        </div>
    );
};