import { registerUserRequest } from '../../pages/redux/slices/registerSlice';
import { AppDispatch, RootState } from '../../pages/redux/store';
import styles from '@/styles/Dashboard.module.css'
import { Tooltip } from '@nextui-org/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Register = () => {
    const dispatch: AppDispatch = useDispatch();
    const { loading, error } = useSelector((state: RootState) => state.register);
    console.log(error);
    const errorJson = JSON.parse(error ? error : "{}");
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        emailId: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [formErrors, setFormErrors] = useState<any>({});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        console.log(name);
        setFormData((prevState) => {
            if (name === 'confirmPassword' || name === 'password') {
                if (prevState.password !== value && prevState.confirmPassword !== value) {
                    setFormErrors((prevFormError: any) => ({ ...prevFormError, "confirmPassword": "Passwords do not match" }));
                } else {
                    setFormErrors((prevFormError: any) => ({ ...prevFormError, "confirmPassword": null }));
                }
            }
            return ({
                ...prevState,
                [name]: value,
            })
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setFormErrors((prevFormError: any) => ({ ...prevFormError, "confirmPassword": "Passwords do not match" }))
        }
        else {
            setFormErrors((prevFormError: any) => ({ ...prevFormError, "confirmPassword": null }))
            dispatch(registerUserRequest(formData))
        };
    };

    return (
        <>
            <form className={styles["dashboard-form"]} onSubmit={handleSubmit}>
                <h2>Welcome Aboard! Let’s Get You Registered</h2>
                <Tooltip className={errorJson.firstName || formErrors.firstName && styles['error-tooltip']} content={errorJson.firstName || formErrors.firstName}>
                    <input name="firstName" type="text" placeholder="First Name *" value={formData.firstName} onChange={handleChange} className={formErrors.firstName || errorJson.firstName ? styles["input-error"] : styles["input-normal"]} required />
                </Tooltip>
                <Tooltip className={(errorJson.lastName || formErrors.lastName) && styles['error-tooltip']} content={errorJson.lastName || formErrors.lastName}>
                    <input name="lastName" type="text" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className={formErrors.lastName || errorJson.lastName ? styles["input-error"] : styles["input-normal"]} />
                </Tooltip>
                <Tooltip className={(errorJson.emailId || formErrors.emailId) && styles['error-tooltip']} content={errorJson.emailId || formErrors.emailId}>
                    <input name="emailId" type="email" placeholder="Email Id *" value={formData.emailId} onChange={handleChange} className={formErrors.emailId || errorJson.emailId ? styles["input-error"] : styles["input-normal"]} />
                </Tooltip>
                <Tooltip className={(errorJson.username || formErrors.username) && styles['error-tooltip']} content={errorJson.username || formErrors.username}>
                    <input name="username" type="text" placeholder="Username *" minLength={6} maxLength={16} value={formData.username} onChange={handleChange} className={formErrors.username || errorJson.username ? styles["input-error"] : styles["input-normal"]} required />
                </Tooltip>
                <Tooltip className={(errorJson.password || formErrors.password) && styles['error-tooltip']} content={errorJson.password || formErrors.password}>
                    <input name="password" type="password" placeholder="Password *" minLength={8} maxLength={20} value={formData.password} onChange={handleChange} className={formErrors.password || errorJson.password ? styles["input-error"] : styles["input-normal"]} required />
                </Tooltip>
                <Tooltip offset={-10} className={(errorJson.confirmPassword || formErrors.confirmPassword) && styles['error-tooltip']} key="confirmPassword" showArrow={true} content={errorJson.confirmPassword || formErrors.confirmPassword}>
                    <input name="confirmPassword" type="password" placeholder="Confirm Password *" minLength={8} maxLength={20} value={formData.confirmPassword} onChange={handleChange} className={formErrors.confirmPassword || errorJson.confirmPassword ? styles["input-error"] : styles["input-normal"]} required />
                </Tooltip>
                <button type="submit" disabled={loading}>Register</button>
                {Object.keys(errorJson).length === 0 && formErrors.general &&
                    <p className={styles["error-message"]} >{formErrors.general}</p>
                }
            </form>
        </>
    );
}

export default Register;