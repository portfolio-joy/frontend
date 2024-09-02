import { registerUserRequest } from '@/redux/slices/registerSlice';
import styles from '@/styles/Dashboard.module.css'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip, useDisclosure } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CorrectIcon } from '../icons';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';

const Register = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const registerState = useAppSelector((state) => state.register);
    const errorJson = registerState.error;
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        emailId: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [passwordMismatch, setPasswordMismatch] = useState<string|undefined>(undefined);

    useEffect(() => {
        if (registerState.success) {
            onOpen();
        }
    }, [registerState.success, router]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((previousFormDataState) => {
            if (name === 'confirmPassword' || name === 'password') {
                if (previousFormDataState.password !== value && previousFormDataState.confirmPassword !== value) {
                    setPasswordMismatch("Passwords do not match" );
                } else {
                    setPasswordMismatch(undefined);
                }
            }
            return ({
                ...previousFormDataState,
                [name]: value,
            })
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setPasswordMismatch("Passwords do not match" );
        }
        else {
            setPasswordMismatch(undefined);
            dispatch(registerUserRequest(formData))
        };
    };

    return (
        <>
            <form className={styles["dashboard-form"]} onSubmit={handleSubmit}>
                <h2>Welcome Aboard! Let’s Get You Registered</h2>
                <Tooltip className={errorJson?.firstName && styles['error-tooltip']} content={errorJson?.firstName}>
                    <input name="firstName" type="text" placeholder="First Name *" value={formData.firstName} onChange={handleChange} className={errorJson?.firstName ? styles["input-error"] : styles["input-normal"]} required title='' />
                </Tooltip>
                <Tooltip className={errorJson?.lastName && styles['error-tooltip']} content={errorJson?.lastName}>
                    <input name="lastName" type="text" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className={errorJson?.lastName ? styles["input-error"] : styles["input-normal"]} />
                </Tooltip>
                <Tooltip className={errorJson?.emailId && styles['error-tooltip']} content={errorJson?.emailId}>
                    <input name="emailId" type="email" placeholder="Email Id *" value={formData.emailId} onChange={handleChange} className={errorJson?.emailId ? styles["input-error"] : styles["input-normal"]} required title='' />
                </Tooltip>
                <Tooltip className={errorJson?.username && styles['error-tooltip']} content={errorJson?.username}>
                    <input name="username" type="text" placeholder="Username *" minLength={6} maxLength={16} value={formData.username} onChange={handleChange} className={errorJson?.username ? styles["input-error"] : styles["input-normal"]} required title='' />
                </Tooltip>
                <Tooltip className={errorJson?.password && styles['error-tooltip']} content={errorJson?.password}>
                    <input name="password" type="password" placeholder="Password *" minLength={8} maxLength={20} value={formData.password} onChange={handleChange} className={errorJson?.password ? styles["input-error"] : styles["input-normal"]} required title='' />
                </Tooltip>
                <Tooltip className={passwordMismatch &&  styles['error-tooltip']} showArrow={true} content={passwordMismatch}>
                    <input name="confirmPassword" type="password" placeholder="Confirm Password *" minLength={8} maxLength={20} value={formData.confirmPassword} onChange={handleChange} className={passwordMismatch ? styles["input-error"] : styles["input-normal"]} required title='' />
                </Tooltip>
                <button type="submit" disabled={registerState.success && !isOpen} className={styles['submit-button']}>Register</button>
                {errorJson?.general &&
                    <p className={styles["error-message"]} >{errorJson?.general}</p>
                }
            </form>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className={styles['registered-modal']}>
                <ModalContent>
                    <ModalHeader>Registered Successfully</ModalHeader>
                    <ModalBody className={styles['modal-body-content']}>
                        <CorrectIcon />
                        <p>Congratulations! You have been registered registerState.successfully.</p>
                    </ModalBody>
                    <ModalFooter>
                        <button onClick={() => router.push('/login')} className={styles["modal-button"]}>Go to Login Page</button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default Register;