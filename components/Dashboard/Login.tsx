import styles from '@/styles/Dashboard.module.css'
import { Tooltip } from '@nextui-org/react'
import Image from 'next/image'
import { AppDispatch, RootState } from '../../pages/redux/store';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import portfolioImage from '@/public/portfolio.png'
export default function Login() {
    const { success, error } = useSelector((state : RootState) => state.register);
    const errorJson = JSON.parse(error ? error : "{}");
    
    const [formData, setFormData] = useState({
        credential : '',
        password : ''
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        // event.preventDefault();
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((previousFormDataState)=>({...previousFormDataState,[name]:value}));
    }
    return (
        <section className={styles['login-page']}>
            <div className={styles['login-page-image']}>
                <Image src={portfolioImage} alt='portfolioImage'></Image>
            </div>
            <div className={styles['login-page-form']}>
            <form className={styles["dashboard-form"]} onSubmit={handleSubmit}>
                <h2>Welcome Back!!</h2>
                <Tooltip className={errorJson.firstName && styles['error-tooltip']} content={errorJson.firstName}>
                    <input name="credential" type="text" placeholder="Email Id or Username *" value={formData.credential} onChange={handleChange} className={errorJson.firstName ? styles["input-error"] : styles["input-normal"]} required title='' />
                </Tooltip>
                <Tooltip className={errorJson.lastName && styles['error-tooltip']} content={errorJson.lastName}>
                    <input name="password" type="password" placeholder="Password *" value={formData.password} onChange={handleChange} className={errorJson.lastName ? styles["input-error"] : styles["input-normal"]} required/>
                </Tooltip>
                <button type="submit" disabled={success}>Login</button>
                {errorJson.general &&
                    <p className={styles["error-message"]} >{errorJson.general}</p>
                }
            </form>
            </div>
        </section>
    )
}