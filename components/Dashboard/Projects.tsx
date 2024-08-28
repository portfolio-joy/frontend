import styles from '@/styles/Dashboard.module.css'
import { Chip, Divider, image, Tooltip } from '@nextui-org/react'
import { CrossIcon } from '../icons'
import { profile } from 'console'
import { useAppSelector } from '@/hooks/hooks';
import { useState } from 'react';
import { ProjectsType } from '@/types/ProjectsType';
import { UserResponseType } from '@/types/UserResponseType';

export default function Projects() {

    const userState = useAppSelector(state => state.user);
    const [deleteSkillIndex, setDeleteSkillIndex] = useState<number>(-1);
    const [updateProjectIndex, setUpdateProjectIndex] = useState<number>(-1);
    const [projects, setProjects] = useState<ProjectsType[]>((userState.user as UserResponseType)?.projects)
    const [image, setImage] = useState<File | null>(null);
    const initialFormData = {
        name: "",
        briefDetail: "",
        user: {
            id: ""
        }
    };
    const [formData, setFormData] = useState(initialFormData);
    const errorJson = {
        name: '',
        briefDetail: '',
        image: ''
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((previousFormDataState) => ({ ...previousFormDataState, [name]: value }));
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImage(event.target.files[0]);
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData);
        console.log(image);
    }

    const updateForm = (index: number) => {

    }

    const cancelUpdate = () => {

    }

    const handleDelete = (index: number) => {

    }
    return (
        <>
            <div className={styles['data-chips']}>
                {
                    <Chip className={`mb-2 ${styles['skill-chip']}`}>
                        <span className='select-none' onDoubleClick={() => updateForm(1)}>Project Name</span>
                        <button onClick={() => handleDelete(1)}><CrossIcon /></button>
                    </Chip>
                }
            </div>
            <Divider />
            <form className={styles["dashboard-form"]} onSubmit={handleSubmit}>
                <h2>Projects Form</h2>
                {
                    updateProjectIndex !== -1 &&
                    <label>project id : {projects[updateProjectIndex].id}</label>
                }
                <Tooltip className={errorJson.name && styles['error-tooltip']} content={errorJson.name}>
                    <input className={styles['input-normal']} name="name" type="text" placeholder="Name" defaultValue={formData?.name} onChange={handleChange} required></input>
                </Tooltip>
                <Tooltip className={errorJson.briefDetail && styles['error-tooltiip']}>
                    <textarea className={errorJson.briefDetail ? styles['input-error'] : styles['input-normal']} name="description" rows={5} placeholder="Description" maxLength={600} defaultValue={formData?.briefDetail} onChange={handleChange} required></textarea>
                </Tooltip>
                <input id='image' type="file" name="image" accept="image/*" onChange={handleFileChange} hidden />
                <Tooltip className={errorJson.image && styles['error-tooltiip']}>
                    <label htmlFor='image' className={`cursor-pointer ${errorJson.image ? styles['input-error'] : styles['input-normal']}`}>Project Image : <i>{image?.name}</i></label>
                </Tooltip>
                <fieldset className='flex'>
                    {
                        updateProjectIndex !== -1 &&
                        <button className='w-full' type="button" onClick={cancelUpdate}>Cancel</button>
                    }
                    <button className='w-full' type="submit">{updateProjectIndex === -1 ? 'Save' : 'Update'}</button>
                </fieldset>
            </form>
        </>
    )
}