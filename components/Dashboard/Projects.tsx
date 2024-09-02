import styles from '@/styles/Dashboard.module.css'
import { Chip, Divider, Modal, ModalBody, ModalContent, ModalFooter, Tooltip, useDisclosure } from '@nextui-org/react'
import { CrossIcon } from '../icons'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { useEffect, useState } from 'react';
import { ProjectsType } from '@/types/ProjectsType';
import { UserResponseType } from '@/types/UserResponseType';
import { addProjectRequest, projectFaliure, removeProjectRequest, updateProjectRequest, updateProjectState } from '@/redux/slices/projectSlice';
import { toast } from 'react-toastify';
import { base64ToFile } from '@/util/base64ToFile';
import { ImageType } from '@/types/ImageType';

export default function Projects() {

    const userState = useAppSelector(state => state.user);
    const projectState = useAppSelector(state => state.project);
    const error = useAppSelector(state => state.error);
    const [deleteProjectIndex, setDeleteProjectIndex] = useState<number>(-1);
    const [updateProjectIndex, setUpdateProjectIndex] = useState<number>(-1);
    const [projects, setProjects] = useState<ProjectsType[]>((projectState.user as UserResponseType)?.projects)
    const [image, setImage] = useState<File | null>(null);
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const dispatch = useAppDispatch();
    const initialFormData = {
        name: "",
        briefDetail: "",
        user: {
            id: ""
        }
    };
    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        if (userState.success) {
            dispatch(updateProjectState(userState.user));
            setProjects(userState.user?.projects as ProjectsType[]);
        }
    }, [])

    useEffect(() => {
        if (projectState.success) {
            toast.success("Data Updated Successfully");
            setProjects((projectState.user as UserResponseType)?.projects);
        } else if (Object.keys(error).length) {
            dispatch(projectFaliure());
            toast.error(error.general);
        }
    }, [projectState.success, error, projectState.user?.projects, projects])

    useEffect(() => {
        if (formData.user?.id && formData.user?.id !== '') {
            if (updateProjectIndex === -1) {
                dispatch(addProjectRequest({ data: formData as ProjectsType, token: (userState.user as UserResponseType).token, image: image as File }))
            } else {
                dispatch(updateProjectRequest({ data: formData as ProjectsType, projectId: (projects[updateProjectIndex].id), token: (userState.user as UserResponseType).token, image: image as File }))
            }
        }
    }, [formData.user])

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
        setFormData((previousFormDataState) => ({ ...previousFormDataState, 'user': { 'id': (userState.user as UserResponseType).id } }));
    }

    const handleDelete = (index: number) => {
        setDeleteProjectIndex(index);
        onOpen();
    }

    const removeProject = () => {
        dispatch(removeProjectRequest({ projectId: (projects[deleteProjectIndex].id), token: (userState.user as UserResponseType).token }));
        onClose();
    }

    const updateForm = (index: number) => {
        setFormData(projects[index]);
        setImage(base64ToFile(projects[index]?.image as ImageType));
        setUpdateProjectIndex(index);
    }

    const cancelUpdate = () => {
        setFormData(initialFormData);
        setImage(null);
        setUpdateProjectIndex(-1);
    }

    return (
        <>
            <div className={styles['data-chips']}>
                {
                    projects?.map((project, index) =>
                        <Chip key={index} className={`mb-2 ${styles['skill-chip']}`}>
                            <span className='select-none' onDoubleClick={() => updateForm(index)}>{project.name}</span>
                            <button onClick={() => handleDelete(index)}><CrossIcon /></button>
                        </Chip>
                    )
                }
            </div>
            <Divider />
            <form className={styles["dashboard-form"]} onSubmit={handleSubmit}>
                <h2>Projects Form</h2>
                <Tooltip className={error.name && styles['error-tooltip']} content={error.name}>
                    <input autoComplete='true' className={error.name ? styles['input-error'] : styles['input-normal']} name="name" type="text" placeholder="Name" value={formData.name} onChange={handleChange} required></input>
                </Tooltip>
                <Tooltip className={error.briefDetail && styles['error-tooltiip']}>
                    <textarea className={error.briefDetail ? styles['input-error'] : styles['input-normal']} name="briefDetail" rows={5} placeholder="Brief Detail" maxLength={300} value={formData.briefDetail} onChange={handleChange} required></textarea>
                </Tooltip>
                <input id='image' type="file" name="image" accept="image/*" onChange={handleFileChange} hidden />
                <Tooltip className={error.image && styles['error-tooltiip']}>
                    <label htmlFor='image' className={`cursor-pointer ${error.image ? styles['input-error'] : styles['input-normal']}`}>Project Image : <i>{image?.name}</i></label>
                </Tooltip>
                <fieldset className='flex'>
                    {
                        updateProjectIndex !== -1 &&
                        <button className='w-full' type="button" onClick={cancelUpdate}>Cancel</button>
                    }
                    <button className={`w-full ${styles['submit-button']}`} type="submit">{updateProjectIndex === -1 ? 'Save' : 'Update'}</button>
                </fieldset>
            </form>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalBody>
                        Are You Sure you want to remove?
                    </ModalBody>
                    <ModalFooter>
                        <button onClick={onClose}>Cancel</button>
                        <button className={styles['modal-button']} onClick={removeProject}> Remove </button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}