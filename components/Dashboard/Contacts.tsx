import { useAppSelector } from '@/hooks/hooks'
import styles from '@/styles/Dashboard.module.css'
import { ContactType } from '@/types/ContactType'
import { UserResponseType } from '@/types/UserResponseType'
import { Tooltip } from '@nextui-org/react'
import { useState } from 'react'

export default function Contact() {
    const userState = useAppSelector(state => state.user);
    const error = useAppSelector(state => state.error);
    const [formData, setFormData] = useState<ContactType>((userState.user as UserResponseType)?.contact)
    const [isDataPresent, setIsDataPresent] = useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((previousFormDataState) => ({ ...previousFormDataState, [name]: value }));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData);
    }
    return (
        <form className={styles["dashboard-form"]} onSubmit={handleSubmit}>
            <h2>Contacts Form</h2>
            <Tooltip className={error.emailId && styles['error-tooltip']} content={error.emailId}>
                <input autoComplete='true' className={error.emailId ? styles['input-error'] : styles['input-normal']} name="emailId" type="email" placeholder="Email Id" defaultValue={formData?.emailId} onChange={handleChange} required></input>
            </Tooltip>
            <Tooltip className={error.address && styles['error-tooltiip']} content={error.address}>
                <textarea className={error.address ? styles['input-error'] : styles['input-normal']} name="address" rows={5} placeholder="Address" maxLength={255} defaultValue={formData?.address} onChange={handleChange} required></textarea>
            </Tooltip>
            <Tooltip className={error.phoneNo && styles['error-tooltip']} content={error.phoneNo}>
                <input className={error.phoneNo ? styles['input-error'] : styles['input-normal']} name="phoneNo" type="tel" pattern='^[6-9]\d{9}$' placeholder="Mobile No" maxLength={10} defaultValue={formData?.phoneNo} onChange={handleChange} title={!error.phoneNo ? 'Invalid Mobile Number' : undefined} required></input>
            </Tooltip>
            <button type="submit" className={styles['submit-button']}> {isDataPresent ? 'Update' : 'Save'} </button>
        </form>
    )
}