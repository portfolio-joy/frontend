import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { saveAboutMeRequest, updateUserData } from '@/pages/redux/slices/saveAboutMeSlice';
import { updateAboutMeRequest } from '@/pages/redux/slices/updateAboutMeSlice';
import styles from '@/styles/Dashboard.module.css'
import { AboutMeType } from '@/types/AboutMeType'
import { ImageType } from '@/types/ImageType';
import { UserResponseType } from '@/types/UserResponseType';
import { base64ToFile } from '@/util/base64ToFile';
import { Tooltip } from '@nextui-org/react'
import { useEffect, useState } from 'react'


export default function AboutMe() {

    const userState = useAppSelector((state) => state.user);
    const saveAboutMeState = useAppSelector((state) => state.saveAboutMe);
    const updateAboutMeState = useAppSelector((state) => state.updateAboutMe);
    const [formData, setFormData] = useState<AboutMeType>((userState.data as UserResponseType)?.aboutMe)
    const [isDataPresent, setIsDataPresent] = useState<boolean>(false);
    const [profile, setProfile] = useState< File | null>(null);
    const dispatch = useAppDispatch();
    const saveErrorJson = JSON.parse(saveAboutMeState.error ? saveAboutMeState.error : "{}");
    const updateErrorJson = JSON.parse(updateAboutMeState.error ? updateAboutMeState.error : "{}");
    useEffect(() => {
        if (userState.success) {
            dispatch(updateUserData(userState.data as UserResponseType));
            setProfile(base64ToFile((userState.data as UserResponseType)?.aboutMe?.profile as ImageType))
            setFormData((userState.data as UserResponseType).aboutMe)
            if ((userState.data as UserResponseType).aboutMe) setIsDataPresent(true);
        }
    }, [userState.success])
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((previousFormDataState) => ({ ...previousFormDataState, [name]: value }));
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setProfile(event.target.files[0]);
            console.log(profile);
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isDataPresent) {
            console.log(profile);
            dispatch(updateAboutMeRequest({ data: formData, aboutMeId: formData.id, userId: (userState.data as UserResponseType).id, token: (userState.data as UserResponseType).token, profile: profile as File }));
        }
        else {
            dispatch(saveAboutMeRequest({ data: formData, userId: (userState.data as UserResponseType).id, token: (userState.data as UserResponseType).token, profile: profile as File }));
        }
    }

    return (
        <>
            <form className={styles["dashboard-form"]} onSubmit={handleSubmit}>
                <h2>About Me Form</h2>
                {(saveErrorJson.general) &&
                    <p className={styles["error-message"]} >{saveErrorJson.general}</p>
                }
                {(updateErrorJson.general) &&
                    <p className={styles["error-message"]} >{updateErrorJson.general}</p>
                }
                {(saveAboutMeState.success || updateAboutMeState.success) &&
                    <p className={styles["success-message"]} >Data Updated Successfully</p>
                }
                <input className={styles['input-normal']} name="name" type="text" placeholder="Name" value={formData?.name} onChange={handleChange}></input>
                <Tooltip className={styles['info-tooltip']} content="Seperate the skills using comma">
                    <input className={styles['input-normal']} name="skills" type="text" placeholder="Skills" maxLength={255} defaultValue={formData?.skills} onChange={handleChange}></input>
                </Tooltip>
                <textarea className={styles['input-normal']} name="description" rows={5} placeholder="Description" maxLength={600} value={formData?.description} onChange={handleChange}></textarea>
                <input type="file" name="profile" accept="image/*" onChange={handleFileChange} />
                <button type="submit"> {isDataPresent ? 'Update' : 'Save'} </button>
            </form>
        </>
    )
}