import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { aboutMeFaliure, saveAboutMeRequest, updateAboutMeState } from '@/redux/slices/aboutMeSlice';
import { updateAboutMeRequest } from '@/redux/slices/aboutMeSlice';
import { clearAllErrors } from '@/redux/slices/errorSlice';
import { updateResumeData, updateResumeState } from '@/redux/slices/resumeSlice';
import styles from '@/styles/Dashboard.module.css'
import { AboutMeType } from '@/types/AboutMeType'
import { ImageType } from '@/types/ImageType';
import { base64ToFile } from '@/util/base64ToFile';
import { Divider, Tooltip } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function AboutMe() {

    const userState = useAppSelector(state => state.user);
    const aboutMeState = useAppSelector(state => state.aboutMe);
    const error = useAppSelector(state => state.error);
    const [formData, setFormData] = useState<AboutMeType>({
        id: '',
        name: '',
        description: '',
        skills: '',
        image: null
    })
    const [isDataPresent, setIsDataPresent] = useState<boolean>(false);
    const [image, setImage] = useState<File | null>(null);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(clearAllErrors());
        if (userState.success) {
            dispatch(updateResumeState({
                aboutMe: userState.user?.aboutMe ?? null,
                contact: userState.user?.contact ?? null,
                projects: userState.user?.projects ?? [],
                testimonials: userState.user?.testimonials ?? [],
                skills: userState.user?.skills ?? []
            }));
            if (!aboutMeState.data) {
                if (userState.user?.aboutMe) {
                    setImage(base64ToFile(userState.user.aboutMe?.image as ImageType));
                    setFormData(userState.user.aboutMe);
                    dispatch(updateAboutMeState(userState.user.aboutMe));
                    setIsDataPresent(true);
                } else {
                    setFormData((previousFormDataState) => ({ ...previousFormDataState, 'name': userState.user?.firstName + " " + userState.user?.lastName }));
                }
            } else {
                setImage(base64ToFile(aboutMeState.data?.image as ImageType));
                setFormData(aboutMeState.data);
                setIsDataPresent(true);
            }
        }
    }, [userState.success])

    useEffect(() => {
        if (aboutMeState.success) {
            toast.success("Data updated Successfully");
            dispatch(clearAllErrors());
            setImage(base64ToFile(aboutMeState.data?.image as ImageType))
            setFormData((previousFormData) => aboutMeState.data ?? previousFormData);
            setIsDataPresent(true);
            dispatch(updateResumeData({ key: 'aboutMe', value: aboutMeState.data }));
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
            setImage(event.target.files[0]);
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let skillLenghtGreaterThan30 = -1;
        skillLenghtGreaterThan30 = formData.skills.split(",").findIndex((skill) => skill.trim().length > 30);
        if (skillLenghtGreaterThan30 !== -1) {
            toast.error("No skill should have length greater than 30");
        } else if (isDataPresent) {
            dispatch(updateAboutMeRequest({ data: formData, aboutMeId: formData.id, token: userState.token!, image: image as File }));
        }
        else {
            dispatch(saveAboutMeRequest({ data: formData, token: userState.token!, image: image as File }));
        }
    }

    return (
        <>
            <div className={styles['data-chips']}>
            </div>
            <Divider/>
            <form className={styles["dashboard-form"]} onSubmit={handleSubmit}>
                <h2>About Me Form</h2>
                <Tooltip isDisabled={!error.name} className={error.name && styles['error-tooltip']} content={error.name}>
                    <input autoComplete='true' className={error.name ? styles['input-error'] : styles['input-normal']} name="name" type="text" placeholder="Name" maxLength={35} value={formData?.name} onChange={handleChange} required></input>
                </Tooltip>
                <Tooltip isDisabled={!error.skills} className={error.skills ? styles['error-tooltip'] : styles['info-tooltip']} content={error.skills}>
                    <input autoComplete='true' className={error.skills ? styles['input-error'] : styles['input-normal']} name="skills" type="text" placeholder="Skills(Seperate the skills using comma)" maxLength={255} value={formData?.skills} onChange={handleChange} required></input>
                </Tooltip>
                <Tooltip isDisabled={!error.description} className={error.description && styles['error-tooltip']}>
                    <textarea autoComplete='true' className={error.description ? styles['input-error'] : styles['input-normal']} name="description" rows={5} placeholder="Description" maxLength={600} value={formData?.description} onChange={handleChange} required></textarea>
                </Tooltip>
                <input id='image' type="file" name="image" accept="image/*" onChange={handleFileChange} hidden />
                <Tooltip isDisabled={!error.image} className={error.image && styles['error-tooltip']} content={error.image}>
                    <label htmlFor='image' className={`cursor-pointer ${error.image ? styles['input-error'] : styles['input-normal']}`}>Your Profile : <i>{image?.name}</i></label>
                </Tooltip>
                <button type="submit" className={styles['submit-button']}> {isDataPresent ? 'Update' : 'Save'} </button>
            </form>
        </>
    )
}