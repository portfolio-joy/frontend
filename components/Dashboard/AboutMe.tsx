import { RootState } from '@/pages/redux/store';
import styles from '@/styles/Dashboard.module.css'
import { AboutMeType } from '@/types/AboutMeType'
import { UserResponseType } from '@/types/UserResponseType';
import { Tooltip } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';


export default function AboutMe() {

    const { success, data } = useSelector((state: RootState) => state.user);
    const [formData, setFormData] = useState<AboutMeType>((data as UserResponseType)?.aboutMe)
    useEffect(() => {
        if (success) {
            setFormData((data as UserResponseType).aboutMe)
        }
    }, [success])
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((previousFormDataState) => ({ ...previousFormDataState, [name]: value }));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    return (
        <form className={styles["dashboard-form"]} onSubmit={handleSubmit}>
            <input className={styles['input-normal']} name="name" type="text" placeholder="Name" value={formData?.name} onChange={handleChange}></input>
            <Tooltip className={styles['info-tooltip']} content="Seperate the skills using comma">
                <input className={styles['input-normal']} name="skills" type="text" placeholder="Skills" maxLength={255} defaultValue={formData?.skills} onChange={handleChange}></input>
            </Tooltip>
            <textarea className={styles['input-normal']} name="description" rows={5} placeholder="Description" maxLength={600} value={formData?.description} onChange={handleChange}></textarea>
            <input type="file" name="profile" accept="image/*" />
            <button type="submit"> Submit </button>
        </form>
    )
}