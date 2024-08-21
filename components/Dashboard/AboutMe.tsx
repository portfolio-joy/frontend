import { saveAboutMeRequest, updateUserData } from '@/pages/redux/slices/aboutMeSlice';
import { AppDispatch, RootState } from '@/pages/redux/store';
import styles from '@/styles/Dashboard.module.css'
import { AboutMeType } from '@/types/AboutMeType'
import { ImageType } from '@/types/ImageType';
import { UserResponseType } from '@/types/UserResponseType';
import { Tooltip } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';


export default function AboutMe() {

    const { success, data } = useSelector((state: RootState) => state.user);
    const [formData, setFormData] = useState<AboutMeType>((data as UserResponseType)?.aboutMe)
    const [profile, setProfile] = useState<ImageType | File | null>((data as UserResponseType)?.aboutMe?.profile);
    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        if (success) {
            dispatch(updateUserData(data as UserResponseType));
            setProfile((data as UserResponseType)?.aboutMe?.profile)
            setFormData((data as UserResponseType).aboutMe)
            console.log(profile);
        }
    }, [success])
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((previousFormDataState) => ({ ...previousFormDataState, [name]: value }));
        console.log(formData);
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setProfile(event.target.files[0]);
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Reached handle submit");
        dispatch(saveAboutMeRequest({data : formData, id : (data as UserResponseType).id, token : (data as UserResponseType).token, profile : profile as File}));
        console.log("save about me request done");
    }

    return (
        <>
            <form className={styles["dashboard-form"]} onSubmit={handleSubmit}>
                <input className={styles['input-normal']} name="name" type="text" placeholder="Name" value={formData?.name} onChange={handleChange}></input>
                <Tooltip className={styles['info-tooltip']} content="Seperate the skills using comma">
                    <input className={styles['input-normal']} name="skills" type="text" placeholder="Skills" maxLength={255} defaultValue={formData?.skills} onChange={handleChange}></input>
                </Tooltip>
                <textarea className={styles['input-normal']} name="description" rows={5} placeholder="Description" maxLength={600} value={formData?.description} onChange={handleChange}></textarea>
                <input type="file" name="profile" accept="image/*" onChange={handleFileChange} />
                <button type="submit"> Submit </button>
            </form>
        </>
    )
}