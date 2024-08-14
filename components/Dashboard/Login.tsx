import styles from '@/styles/Dashboard.module.css'
import Image from 'next/image'
import { AppDispatch, RootState } from '../../pages/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import portfolioImage from '@/public/portfolio.png'
import { useRouter } from 'next/router';
import { loginUserRequest } from '@/pages/redux/slices/loginSlice';
import { LoginUserPayload } from '@/types/LoginUserPayload';
import { LoginResponseData } from '@/types/LoginResponseData';
import Loader from './Loader';
import { setLoading } from '@/pages/redux/slices/loadingSlice';

export default function Login() {
    const { success, data, error } = useSelector((state: RootState) => state.login);
    const { loading } = useSelector((state : RootState) => state.loading);
    const errorJson = JSON.parse(error ? error : "{}");
    const dispatch: AppDispatch = useDispatch();
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
    },[success])

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
                    <input name="loginId" type="text" placeholder="Email Id or Username *" value={formData.loginId} onChange={handleChange} required title='' disabled={loading}/>
                    <input name="password" type="password" placeholder="Password *" value={formData.password} onChange={handleChange} required title='' disabled={loading}/>
                    <button type="submit" disabled={loading}>Login</button>
                </form>
            </div>
        </section>
    )
}