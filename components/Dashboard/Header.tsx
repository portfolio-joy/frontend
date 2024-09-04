import styles from '@/styles/Home.module.css'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import Link from 'next/link'
import { ArrowDownIcon } from '../icons'
import { FormEvent, useEffect, useState } from 'react';
import { UserResponseType } from '@/types/UserResponseType';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { logoutUserRequest } from '@/redux/slices/authSlice';
import { useRouter } from 'next/router';
import { LoginResponseData } from '@/types/LoginResponseData';
import { Url } from 'url';

export default function Header() {
    const initialUserData: LoginResponseData = {
        id: null,
        token: null,
        firstName: null,
        portfolioUrl: null
    }
    const [isDataPresent, setIsDataPresent] = useState(false);
    const userState = useAppSelector(state => state.user);
    const [userData, setUserData] = useState<LoginResponseData>({
        id: null,
        token: null,
        firstName: null,
        portfolioUrl: null
    });
    const dispatch = useAppDispatch();
    const router = useRouter();
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUserData = localStorage.getItem('data');
            if (storedUserData) {
                const parsedUserData = JSON.parse(storedUserData) as LoginResponseData;
                setUserData(parsedUserData);
                if (parsedUserData.token && parsedUserData.firstName && parsedUserData.portfolioUrl) {
                    setIsDataPresent(true);
                }
            } else {
                setIsDataPresent(false);
            }
        }
    }, []);

    const logoutUser = () => {
        console.log("Logout User Request");
        dispatch(logoutUserRequest({ token: userData.token ? userData.token : '' }));
        console.log("After dispatch logout user request");
        localStorage.removeItem('data');
        setUserData({ id: null, token: null, firstName: null, portfolioUrl: null });
        setIsDataPresent(false);
        router.push('/login');
    }

    return (
        <header className={styles['header']}>
            <Link className={styles['header-link']} href='/'>Home</Link>
            {
                isDataPresent ?
                    <Dropdown>
                        <DropdownTrigger>
                            <Button className={styles['header-link']}> {userData.firstName}<ArrowDownIcon></ArrowDownIcon> </Button>
                        </DropdownTrigger>
                        <DropdownMenu className={styles['dropdown-menu']}>
                            <DropdownItem  href='/dashboard' textValue='dashboard' key="dashboard" className={styles['header-link']}>Dashboard</DropdownItem>
                            <DropdownItem onClick={logoutUser} textValue='logout' key="logout" className={styles['header-link']}>Logout</DropdownItem>
                            <DropdownItem href={userData.portfolioUrl ? userData.portfolioUrl : ''} target='_blank' textValue='portfolioUrl' className={styles['header-link']}>Your Portfolio</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    :
                    <>
                        <Link className={styles['header-link']} href='/login'>Login</Link>
                        <Link className={styles['header-link']} href='/register'>Register</Link>
                    </>
            }
        </header>
    )
}