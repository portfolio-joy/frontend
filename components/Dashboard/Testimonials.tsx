import styles from '@/styles/Dashboard.module.css'
import { Chip, Divider, Modal, ModalBody, ModalContent, ModalFooter, Tooltip, useDisclosure } from "@nextui-org/react";
import { CrossIcon } from "../icons";
import { useAppSelector } from '@/hooks/hooks';
import { useState } from 'react';

export default function Testimonials() {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const error = useAppSelector(state => state.error);
    const [removeTestimonialIndex, setRemoveTestimonialIndex] = useState<number>(-1);
    const [updateTestimonialIndex, setUpdateTestimonialIndex] = useState<number>(-1);
    const initialFormData = {
        name: "",
        designation: "",
        description: "",
        rating: NaN
    };
    const [formData, setFormData] = useState(initialFormData);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    const handleRemove = (index: number) => {
        onOpen();
    }
    const removeTestimonial = () => {
        onClose();
    }

    const updateForm = (index: number) => {
    }

    const cancelUpdate = () => {
    }

    return (
        <>
            <div className={styles['data-chips']}>
                <Chip className={`mb-2 ${styles['skill-chip']}`}>
                    <span className='select-none' onDoubleClick={() => updateForm(1)}>Testimonial</span>
                    <button onClick={() => handleRemove(1)}><CrossIcon /></button>
                </Chip>
            </div>
            <Divider />
            <form className={styles['dashboard-form']} onSubmit={handleSubmit}>
                <h2>Testimonial Form</h2>
                <Tooltip className={error.name && styles['error-tooltiip']} content={error.name}>
                    <input autoComplete='true' className={error.name ? styles['input-error'] : styles['input-normal']} name='name' type='text' placeholder='Name' defaultValue={formData.name} onChange={handleChange} required></input>
                </Tooltip>
                <Tooltip className={error.designation && styles['error-tooltiip']} content={error.designation}>
                    <input className={error.designation ? styles['input-error'] : styles['input-normal']} name='designation' type='text' placeholder='Designation' defaultValue={formData.designation} onChange={handleChange} required></input>
                </Tooltip>
                <Tooltip className={error.description && styles['error-tooltip']} content={error.description}>
                    <textarea className={error.description ? styles['input-error'] : styles['input-normal']} name="description" rows={5} placeholder="Description" maxLength={400} value={formData.description} onChange={handleChange} required></textarea>
                </Tooltip>
                <Tooltip className={error.rating && styles['error-tooltiip']} content={error.rating}>
                    <input className={error.rating ? styles['input-error'] : styles['input-normal']} name='rating' type='number' placeholder='Rating' min={0} max={5} defaultValue={formData.rating} onChange={handleChange} required></input>
                </Tooltip>
                <fieldset className='flex'>
                    {
                        updateTestimonialIndex !== -1 &&
                        <button className='w-full' type="button" onClick={cancelUpdate}>Cancel</button>
                    }
                    <button className={`w-full ${styles['submit-button']}`} type="submit">{updateTestimonialIndex === -1 ? 'Save' : 'Update'}</button>
                </fieldset>
            </form>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalBody>
                        Are You Sure you want to remove?
                    </ModalBody>
                    <ModalFooter>
                        <button onClick={onClose}>Cancel</button>
                        <button className={styles['modal-button']} onClick={removeTestimonial}> Remove </button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}