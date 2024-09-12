import styles from '@/styles/Dashboard.module.css'
import { pdf, PDFDownloadLink } from "@react-pdf/renderer";
import ResumeDocument from "../Resume/ResumeDocument";
import { useAppSelector } from "@/hooks/hooks";
import { UserResponseType } from "@/types/UserResponseType";
import React, { useEffect, useState } from "react";
import { Select, SelectItem } from '@nextui-org/react';
import { ProjectsType } from '@/types/ProjectsType';
import { TestimonialType } from '@/types/TestimonialType';

export default function Resume() {

    const resumeState = useAppSelector(state => state.resume);
    const [projects, setProjects] = useState<ProjectsType[]>([]);
    const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);
    const [pdfUrl, setPdfUrl] = useState<string>("");
    const [isDataPresent, setIsDataPresent] = useState<boolean>(false);
    useEffect(() => {
        if (resumeState) {
            setIsDataPresent(
                resumeState.aboutMe !== null &&
                resumeState.contact !== null &&
                projects.length >= 2 &&
                testimonials.length >= 2 &&
                resumeState.skills.length !== 0
            )
            generatePDFPreview();
        }
    }, [resumeState, projects, testimonials])

    const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        const keys = value.split(',');
        let data = keys.map((key) => {
            const project = resumeState.projects.find((project) => project.id === key)
            return project;
        });
        setProjects(data as ProjectsType[]);
    }

    const handleTestimonialChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        const keys = value.split(',');
        let data = keys.map((key) => {
            const project = resumeState.testimonials.find((testimonial) => testimonial.id === key)
            return project;
        });
        setTestimonials(data as TestimonialType[]);
    }

    const generatePDFPreview = async () => {
        const blob = await pdf(<ResumeDocument {...{ ...resumeState, projects: projects, testimonials: testimonials }} />).toBlob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
    };

    return (
        <div className='h-full'>
            <div className='flex flex-col w-full h-full md:flex-row'>
                <form className={`md:w-1/2 ${styles['dashboard-form']}`}>
                    <h2>Your Resume</h2>
                    <Select id='projects' name='projects' aria-label='Projects' selectionMode='multiple' items={resumeState.projects} placeholder="Select your main 2 Projects" className={'p-5'} variant='bordered' onChange={handleProjectChange}>
                        {(project) => <SelectItem key={project?.id}>{project?.name}</SelectItem>}
                    </Select>
                    <Select id='testimonials' name='testimonials' aria-label='Testimonials' selectionMode='multiple' items={resumeState.testimonials} placeholder="Select your main 2 Testimonials" className={'p-5'} variant='bordered' onChange={handleTestimonialChange}>
                        {(testimonial) => <SelectItem key={testimonial?.id}>{testimonial?.name}</SelectItem>}
                    </Select>
                    {
                        isDataPresent ?
                            <PDFDownloadLink className={`text-center ${styles['submit-button']}`} document={<ResumeDocument {...{ ...resumeState, projects: projects, testimonials: testimonials }} />} fileName={`${resumeState.aboutMe?.name}_resume.pdf`}>
                                Download your Resume
                            </PDFDownloadLink>
                            :
                            <p className='text-center text-danger-500'>* Please provide aboutMe details, contact details, atleast 2 projects, 2 testimonials and 1 skill to download resume</p>
                    }
                </form>
                {pdfUrl && (
                    <iframe
                        src={`${pdfUrl}#toolbar=0`}
                        className='w-full md:w-1/2 shadow-lg'
                        height="100%"
                        title="PDF Preview"
                    />
                )}
            </div>
        </div>
    );
};