import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { aboutMeFaliure, saveAboutMeRequest } from '@/redux/slices/aboutMeSlice';
import { updateAboutMeRequest } from '@/redux/slices/aboutMeSlice';
import { clearAllErrors } from '@/redux/slices/errorSlice';
import styles from '@/styles/Dashboard.module.css'
import { AboutMeType } from '@/types/AboutMeType'
import { ImageType } from '@/types/ImageType';
import { UserResponseType } from '@/types/UserResponseType';
import { base64ToFile } from '@/util/base64ToFile';
import { Tooltip } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';


export default function AboutMe() {

    const userState = useAppSelector(state => state.user);
    const aboutMeState = useAppSelector(state => state.aboutMe);
    const error = useAppSelector(state => state.error);
    const [formData, setFormData] = useState<AboutMeType>((userState.user as UserResponseType)?.aboutMe)
    const [isDataPresent, setIsDataPresent] = useState<boolean>(false);
    const [profile, setProfile] = useState<File | null>(null);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (userState.success) {
            dispatch(clearAllErrors());
            setProfile(base64ToFile((userState.user as UserResponseType)?.aboutMe?.profile as ImageType))
            setFormData((userState.user as UserResponseType).aboutMe)
            if (userState.user?.aboutMe) setIsDataPresent(true);
        }
    }, [userState.success])

    useEffect(() => {
        if (aboutMeState.success) {
            toast.success('Data updated Successfully');
        } else if (Object.keys(error).length) {
            dispatch(aboutMeFaliure())
            toast.error(error.general);
        }
    }, [aboutMeState.success, error]);

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
            dispatch(updateAboutMeRequest({ data: formData, aboutMeId: formData.id, token: userState.token!, profile: profile as File }));
        }
        else {
            dispatch(saveAboutMeRequest({ data: formData, token: userState.token!, profile: profile as File }));
        }
    }

    return (
        <form className={styles["dashboard-form"]} onSubmit={handleSubmit}>
            <h2>About Me Form</h2>
            <Tooltip className={error.name && styles['error-tooltip']} content={error.name}>
                <input autoComplete='true' className={styles['input-normal']} name="name" type="text" placeholder="Name" defaultValue={formData?.name} onChange={handleChange} required></input>
            </Tooltip>
            <Tooltip className={error.skills ? styles['error-tooltip'] : styles['info-tooltip']} content={error.skills ? error.skills : `Seperate the skills using comma`}>
                <input className={error.skills ? styles['input-error'] : styles['input-normal']} name="skills" type="text" placeholder="Skills" maxLength={255} defaultValue={formData?.skills} onChange={handleChange} required></input>
            </Tooltip>
            <Tooltip className={error.description && styles['error-tooltiip']}>
                <textarea className={error.description ? styles['input-error'] : styles['input-normal']} name="description" rows={5} placeholder="Description" maxLength={600} defaultValue={formData?.description} onChange={handleChange} required></textarea>
            </Tooltip>
            <input id='profile' type="file" name="profile" accept="image/*" onChange={handleFileChange} hidden />
            <Tooltip className={error.profile && styles['error-tooltiip']}>
                <label htmlFor='profile' className={`cursor-pointer ${error.profile ? styles['input-error'] : styles['input-normal']}`}>Your Profile : <i>{profile?.name}</i></label>
            </Tooltip>
            <button type="submit" className={styles['submit-button']}> {isDataPresent ? 'Update' : 'Save'} </button>
        </form>
    )
}