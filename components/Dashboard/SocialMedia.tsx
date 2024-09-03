import styles from '@/styles/Dashboard.module.css'
import { CrossIcon } from '../icons'
import { Chip, Divider, Modal, ModalBody, ModalContent, ModalFooter, Select, SelectItem, Tooltip, useDisclosure } from '@nextui-org/react'
import { useAppSelector } from '@/hooks/hooks'
import { useState } from 'react';

export default function SocialMedia() {

    const error = useAppSelector(state => state.error);
    const [updateSocialMediaIndex, setUpdateSocialMediaIndex] = useState<number>(-1);
    const [removeSocialMediaIndex, setRemoveSocialMediaIndex] = useState<number>(-1);
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const initialFormData = {
        name: '',
        url: ''
    };
    const [formData, setFormData] = useState(initialFormData);
    const socialMediaNames = [
        { key: 'Linkedin', label: 'Linkedin' },
        { key: 'X', label: 'X' },
        { key: 'Facebook', label: 'Facebook' },
        { key: 'Instagram', label: 'Instagram' },
        { key: 'Medium', label: 'Medium' },
        { key: 'YouTube', label: 'YouTube' },
        { key: 'Quora', label: 'Quora' },
        { key: 'Github', label: 'Github' },
        { key: 'Gitlab', label: 'Gitlab' }
    ]

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((previousFormDataState) => ({ ...previousFormDataState, [name]: value }));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData);
    }

    const handleRemove = (index: number) => {
        setRemoveSocialMediaIndex(index);
        onOpen();
    }

    const updateForm = (index: number) => {

    }

    const cancelUpdate = () => {
        setUpdateSocialMediaIndex(-1);
        setFormData(formData);
    }

    const removeSkill = () => {
        onClose();
    }


    return (
        <>
            <div className={styles['data-chips']}>
                <Chip className={`mb-2 ${styles['skill-chip']}`}>
                    <span className='select-none' onDoubleClick={() => updateForm(1)}>Social Media</span>
                    <button onClick={() => handleRemove(1)}><CrossIcon /></button>
                </Chip>
            </div>
            <Divider />
            <form className={styles['dashboard-form']} onSubmit={handleSubmit}>
                <h2>Social Media Form</h2>
                <Select id='name' name='name' aria-label='Social Media' items={socialMediaNames} placeholder="Select the social media" className={'p-5'} variant='bordered' onChange={handleChange}>
                    {(socialMediaName) => <SelectItem key={socialMediaName.key}>{socialMediaName.label}</SelectItem>}
                </Select>
                <Tooltip className={error.url && styles['error-tooltiip']} content={error.url}>
                    <input autoComplete='true' className={error.url ? styles['input-error'] : styles['input-normal']} name='url' type='text' placeholder='Social Media URL' defaultValue={formData.url} onChange={handleChange} required></input>
                </Tooltip>
                <fieldset className='flex'>
                    {
                        updateSocialMediaIndex !== -1 &&
                        <button className='w-full' type="button" onClick={cancelUpdate}>Cancel</button>
                    }
                    <button className={`w-full ${styles['submit-button']}`} type="submit">{updateSocialMediaIndex === -1 ? 'Save' : 'Update'}</button>
                </fieldset>
            </form>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalBody>
                        Are You Sure you want to remove?
                    </ModalBody>
                    <ModalFooter>
                        <button onClick={onClose}>Cancel</button>
                        <button className={styles['modal-button']} onClick={removeSkill}> Remove </button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}