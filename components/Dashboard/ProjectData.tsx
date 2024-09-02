import styles from '@/styles/Dashboard.module.css'
import { Chip, Divider, Tooltip, Modal, ModalContent, ModalBody, ModalFooter, useDisclosure, Select, SelectItem } from "@nextui-org/react";
import { CrossIcon } from "../icons";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import { ImageType } from "@/types/ImageType";
import { base64ToFile } from "@/util/base64ToFile";
import { useEffect, useState } from "react";
import { ProjectDataType } from '@/types/ProjectDataType';
import { toast } from 'react-toastify';
import { fetchProjectDataRequest, projectDataFaliure } from '@/redux/slices/projectDataSlice';

export default function ProjectData() {

    const userState = useAppSelector(state => state.user);
    const projectDataState = useAppSelector(state => state.projectData);
    const error = useAppSelector(state => state.error);
    const [selectedProject, setSelectedProject] = useState<string>("");
    const [deleteProjectIndex, setDeleteProjectIndex] = useState<number>(-1);
    const [updateProjectIndex, setUpdateProjectIndex] = useState<number>(-1);
    const [projects, setProjects] = useState(userState.user?.projects);
    const [projectData, setProjectData] = useState<ProjectDataType[]>([])
    const [image, setImage] = useState<File | null>(null);
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const dispatch = useAppDispatch();
    const initialFormData = {
        heading: "",
        description: ""
    };
    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        if (selectedProject.length) {
            dispatch(fetchProjectDataRequest({projectName: selectedProject, token: userState.user? userState.user.token : ""}));
        }
    }, [selectedProject])

    useEffect(()=>{
        if(projectDataState.success) {
            setProjectData(projectDataState.data);
        }
        if(Object.keys(error).length) {
            dispatch(projectDataFaliure());
            toast.error(error.general);
        }
    },[projectDataState.success,error])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        if (name === 'project') {
            setSelectedProject(value);
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
            toast.error("Please select any project first !!!");
        }
    }

    const handleDelete = (index: number) => {
        setDeleteProjectIndex(index);
        onOpen();
    }

    const removeProject = () => {
        onClose();
    }

    const updateForm = (index: number) => {
        setFormData(projectData[index]);
        setImage(base64ToFile(projectData[index]?.image as ImageType));
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
                    projectData?.map((data, index) =>
                        <Chip key={index} className={`mb-2 ${styles['skill-chip']}`}>
                            <span className='select-none' onDoubleClick={() => updateForm(index)}>{data.heading}</span>
                            <button onClick={() => handleDelete(index)}><CrossIcon /></button>
                        </Chip>
                    )
                }
            </div>
            <Divider />
            <form className={styles["dashboard-form"]} onSubmit={handleSubmit}>
                <h2>Projects Form</h2>
                <Select id='project' name='project' aria-label='Your Projects' items={projects ? projects : []} placeholder="Select your project" className={'p-5'} variant='bordered' onChange={handleChange}>
                    {(project) => <SelectItem key={project.name}>{project.name}</SelectItem>}
                </Select>
                <Tooltip className={error.heading && styles['error-tooltip']} content={error.heading}>
                    <input className={error.heading ? styles['input-error'] : styles['input-normal']} name="heading" type="text" placeholder="Heading" defaultValue={formData.heading} onChange={handleChange} required></input>
                </Tooltip>
                <Tooltip className={error.description && styles['error-tooltiip']}>
                    <textarea className={error.description ? styles['input-error'] : styles['input-normal']} name="description" rows={5} placeholder="Description" maxLength={300} value={formData.description} onChange={handleChange} required></textarea>
                </Tooltip>
                <input id='image' type="file" name="image" accept="image/*" onChange={handleFileChange} hidden />
                <Tooltip className={error.image && styles['error-tooltiip']}>
                    <label htmlFor='image' className={`cursor-pointer ${error.image ? styles['input-error'] : styles['input-normal']}`}>Project Data Image : <i>{image?.name}</i></label>
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