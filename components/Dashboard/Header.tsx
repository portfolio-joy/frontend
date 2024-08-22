import styles from '@/styles/Home.module.css'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import Link from 'next/link'
import { ArrowDownIcon } from '../icons'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/pages/redux/store';
import { UserResponseType } from '@/types/UserResponseType';

export default function Header() {
    const [userData,setUserData] = useState<UserResponseType | null>(null);
    const userState = useSelector((state: RootState) => state.user);
    useEffect(() => {
        if(userState.success) {
            setUserData(userState.data as UserResponseType);
            console.log(userState.data);
        }
    }, [userState.success]);
    return (
        <header className={styles['header']}>
            <Link className={styles['header-link']} href='/'>Home</Link>
            {
                userData ?
                    <Dropdown>
                        <DropdownTrigger>
                            <Button className={styles['header-link']}> {userData.firstName}<ArrowDownIcon></ArrowDownIcon> </Button>
                        </DropdownTrigger>
                        <DropdownMenu className={styles['dropdown-menu']}>
                            <DropdownItem key="dashboard" className={styles['header-link']}><Link href='/dashboard'> Dashboard </Link></DropdownItem>
                            <DropdownItem key="logout" className={styles['header-link']}><Link href='/login'> Logout </Link></DropdownItem>
                            <DropdownItem className={styles['header-link']}><Link target='_blank' href={userData.portfolioUrl}>Your Portfolio</Link></DropdownItem>
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