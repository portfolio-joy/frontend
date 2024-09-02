import styles from '@/styles/Dashboard.module.css'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import portfolioImage from '@/public/portfolio.png'
import { useRouter } from 'next/router';
import { loginUserRequest } from '@/redux/slices/loginSlice';
import { LoginUserPayload } from '@/types/LoginUserPayload';
import { LoginResponseData } from '@/types/LoginResponseData';
import Loader from './Loader';
import { setLoading } from '@/redux/slices/loadingSlice';
import { useAppSelector, useAppDispatch } from '@/hooks/hooks';

export default function Login() {
    const { success, data, error } = useAppSelector((state) => state.login);
    const { loading } = useAppSelector((state ) => state.loading)
    const errorJson = JSON.parse(error ? error : "{}");
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [formData, setFormData] = useState<LoginUserPayload>({
        loginId: '',
        password: ''
    })

    useEffect(() => {
        if (success && data) {
            const responseData = data as LoginResponseData;
            localStorage.setItem('data',JSON.stringify(responseData));
            router.push('/dashboard');
        }
        if(error) {
            dispatch(setLoading(false));
        }
    },[success,error])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(setLoading(true));
        dispatch(loginUserRequest(formData));
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((previousFormDataState) => ({ ...previousFormDataState, [name]: value }));
    }
    return (
        <section className={`${styles['login-page']} ${loading && styles['overlay']}` }>
            {loading && (
                <Loader />
            )}
            <div className={styles['login-page-image']}>
                <Image src={portfolioImage} alt='portfolioImage'></Image>
            </div>
            <div className={styles['login-page-form']}>
                <form className={styles["dashboard-form"]} onSubmit={handleSubmit}>
                    <h2>Welcome Back!!</h2>
                    {errorJson.general &&
                        <p className={styles["error-message"]} >{errorJson.general}</p>
                    }
                    <input name="loginId" className={styles['input-normal']} type="text" placeholder="Email Id or Username *" value={formData.loginId} onChange={handleChange} required title='' disabled={loading}/>
                    <input name="password" className={styles['input-normal']} type="password" placeholder="Password *" value={formData.password} onChange={handleChange} required title='' disabled={loading}/>
                    <button type="submit" disabled={loading} className={styles['submit-button']}>Login</button>
                </form>
            </div>
        </section>
    )
}