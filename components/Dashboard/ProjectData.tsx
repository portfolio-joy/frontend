import styles from '@/styles/Dashboard.module.css'
import { Chip, Divider, Tooltip, Modal, ModalContent, ModalBody, ModalFooter, useDisclosure, Select, SelectItem } from "@nextui-org/react";
import { CrossIcon } from "../icons";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import { ImageType } from "@/types/ImageType";
import { base64ToFile } from "@/util/base64ToFile";
import { useEffect, useState } from "react";
import { ProjectDataType } from '@/types/ProjectDataType';
import { toast } from 'react-toastify';
import { addProjectDataRequest, fetchProjectDataRequest, projectDataFaliure, removeProjectDataRequest, updateProjectDataRequest } from '@/redux/slices/projectDataSlice';

export default function ProjectData() {

    const userState = useAppSelector(state => state.user);
    const projectDataState = useAppSelector(state => state.projectData);
    const error = useAppSelector(state => state.error);
    const [selectedProject, setSelectedProject] = useState<string>("");
    const [removeProjectDataIndex, setRemoveProjectDataIndex] = useState<number>(-1);
    const [updateProjectDataIndex, setUpdateProjectDataIndex] = useState<number>(-1);
    const [projects, _setProjects] = useState(userState.user?.projects);
    const [image, setImage] = useState<File | null>(null);
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const dispatch = useAppDispatch();
    const initialFormData = {
        heading: "",
        description: "",
        project: {
            id: ''
        }
    };
    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        if (selectedProject.length) {
            dispatch(fetchProjectDataRequest({ projectName: selectedProject, token: userState.token }));
        }
    }, [selectedProject])

    useEffect(() => {
        if (Object.keys(error).length) {
            dispatch(projectDataFaliure());
            toast.error(error.general);
        } 
        if(projectDataState.success) {
            toast.success("Data Updated Successfully");
        }
    }, [projectDataState.success, error])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        if (name === 'project') {
            setSelectedProject(value);
            const project = projects && projects.find(project =>project.name === value);
            setFormData((previousFromDataState) => ({ ...previousFromDataState, 'project': { 'id': project ? project.id : '' } }));
        } else {
            setFormData((previousFormDataState) => ({ ...previousFormDataState, [name]: value }));
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImage(event.target.files[0]);
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!selectedProject.length) {
            toast.error("Please select any project first !!");
        } else if (updateProjectDataIndex !== -1) {
            dispatch(updateProjectDataRequest({ data: formData as ProjectDataType, projectDataId: projectDataState.data[updateProjectDataIndex].id, token: userState.token, image: image as File }))
        } else {
            dispatch(addProjectDataRequest({ data: formData as ProjectDataType, token: userState.token, image: image as File }))
        }
    }

    const handleRemove = (index: number) => {
        setRemoveProjectDataIndex(index);
        onOpen();
    }

    const removeProjectData = () => {
        dispatch(removeProjectDataRequest({ projectDataId: (projectDataState.data[removeProjectDataIndex].id), token: userState.token }));
        onClose();
    }

    const updateForm = (index: number) => {
        setFormData((previousFormDataState)=>({...previousFormDataState,...(projectDataState.data[index])}));
        setImage(base64ToFile(projectDataState.data[index].image as ImageType));
        setUpdateProjectDataIndex(index);
    }

    const cancelUpdate = () => {
        setFormData(initialFormData);
        setImage(null);
        setUpdateProjectDataIndex(-1);
    }

    return (
        <>
            <div className={styles['data-chips']}>
                {
                    projectDataState.data.map((projectData, index) =>
                        <Chip key={index} className={`mb-2 ${styles['skill-chip']}`}>
                            <span className='select-none' onDoubleClick={() => updateForm(index)}>{projectData.heading}</span>
                            <button onClick={() => handleRemove(index)}><CrossIcon /></button>
                        </Chip>
                    )
                }
            </div>
            <Divider />
            <form className={styles["dashboard-form"]} onSubmit={handleSubmit}>
                <h2>Project Data Form</h2>
                <Select id='project' name='project' aria-label='Your Projects' items={projects ? projects : []} placeholder="Select your project" className={'p-5'} variant='bordered' onChange={handleChange}>
                    {(project) => <SelectItem key={project.name}>{project.name}</SelectItem>}
                </Select>
                <Tooltip className={error.heading && styles['error-tooltip']} content={error.heading}>
                    <input className={error.heading ? styles['input-error'] : styles['input-normal']} name="heading" type="text" placeholder="Heading" defaultValue={formData.heading} onChange={handleChange} required></input>
                </Tooltip>
                <Tooltip className={error.description && styles['error-tooltiip']}>
                    <textarea className={error.description ? styles['input-error'] : styles['input-normal']} name="description" rows={5} placeholder="Description" maxLength={600} value={formData.description} onChange={handleChange} required></textarea>
                </Tooltip>
                <input id='image' type="file" name="image" accept="image/*" onChange={handleFileChange} hidden />
                <Tooltip className={error.image && styles['error-tooltiip']}>
                    <label htmlFor='image' className={`cursor-pointer ${error.image ? styles['input-error'] : styles['input-normal']}`}>Project Data Image : <i>{image?.name}</i></label>
                </Tooltip>
                <fieldset className='flex'>
                    {
                        updateProjectDataIndex !== -1 &&
                        <button className='w-full' type="button" onClick={cancelUpdate}>Cancel</button>
                    }
                    <button className={`w-full ${styles['submit-button']}`} type="submit">{updateProjectDataIndex === -1 ? 'Save' : 'Update'}</button>
                </fieldset>
            </form>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalBody>
                        Are You Sure you want to remove?
                    </ModalBody>
                    <ModalFooter>
                        <button onClick={onClose}>Cancel</button>
                        <button className={styles['modal-button']} onClick={removeProjectData}> Remove </button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}