import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { saveAboutMeRequest, updateAboutMeFaliure } from '@/pages/redux/slices/aboutMeSlice';
import { updateAboutMeRequest } from '@/pages/redux/slices/aboutMeSlice';
import styles from '@/styles/Dashboard.module.css'
import { AboutMeType } from '@/types/AboutMeType'
import { ImageType } from '@/types/ImageType';
import { UserResponseType } from '@/types/UserResponseType';
import { base64ToFile } from '@/util/base64ToFile';
import { Tooltip } from '@nextui-org/react'
import { useEffect, useState } from 'react'


export default function AboutMe() {

    const userState = useAppSelector((state) => state.user);
    const aboutMeState = useAppSelector((state) => state.aboutMe);
    const [formData, setFormData] = useState<AboutMeType>((userState.user as UserResponseType)?.aboutMe)
    const [isDataPresent, setIsDataPresent] = useState<boolean>(false);
    const [profile, setProfile] = useState< File | null>(null);
    const dispatch = useAppDispatch();
    const errorJson = JSON.parse(aboutMeState.error ? aboutMeState.error : "{}");
    useEffect(() => {
        if (userState.success) {
            setProfile(base64ToFile((userState.user as UserResponseType)?.aboutMe?.profile as ImageType))
            setFormData((userState.user as UserResponseType).aboutMe)
            if ((userState.user as UserResponseType).aboutMe) setIsDataPresent(true);
        }
    }, [userState.success])
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((previousFormDataState) => ({ ...previousFormDataState, [name]: value }));
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setProfile(event.target.files[0]);
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isDataPresent) {
            dispatch(updateAboutMeRequest({ data: formData, aboutMeId: formData.id, userId: (userState.user as UserResponseType).id, token: (userState.user as UserResponseType).token, profile: profile as File }));
        }
        else {
            dispatch(saveAboutMeRequest({ data: formData, userId: (userState.user as UserResponseType).id, token: (userState.user as UserResponseType).token, profile: profile as File }));
        }
    }

    return (
        <>
            <form className={styles["dashboard-form"]} onSubmit={handleSubmit}>
                <h2>About Me Form</h2>
                {(errorJson.general) &&
                    <p className={styles["error-message"]} >{errorJson.general}</p>
                }
                {(aboutMeState.success) &&
                    <p className={styles["success-message"]} >Data Updated Successfully</p>
                }
                <input className={styles['input-normal']} name="name" type="text" placeholder="Name" defaultValue={formData?.name} onChange={handleChange} required></input>
                <Tooltip className={styles['info-tooltip']} content="Seperate the skills using comma">
                    <input className={styles['input-normal']} name="skills" type="text" placeholder="Skills" maxLength={255} defaultValue={formData?.skills} onChange={handleChange} required></input>
                </Tooltip>
                <textarea className={styles['input-normal']} name="description" rows={5} placeholder="Description" maxLength={600} defaultValue={formData?.description} onChange={handleChange} required></textarea>
                <input type="file" name="profile" accept="image/*" onChange={handleFileChange} />
                <button type="submit"> {isDataPresent ? 'Update' : 'Save'} </button>
            </form>
        </>
    )
}