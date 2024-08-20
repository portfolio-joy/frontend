import styles from '@/styles/Home.module.css'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import Link from 'next/link'
import { ArrowDownIcon } from '../icons'
import { useState, useEffect } from 'react';

export default function Header() {
    const [token, setToken] = useState<string | null>(null);
    useEffect(() => {
        setToken(localStorage.getItem("data"));
    }, []);
    return (
        <header className={styles['header']}>
            <Link className={styles['header-link']} href='/'>Home</Link>
            {
                token ?
                    <Dropdown>
                        <DropdownTrigger>
                            <Button className={styles['header-link']}> Chirag<ArrowDownIcon></ArrowDownIcon> </Button>
                        </DropdownTrigger>
                        <DropdownMenu className={styles['dropdown-menu']}>
                            <DropdownItem key="dashboard" className={styles['header-link']}><Link href='/dashboard'> Dashboard </Link></DropdownItem>
                            <DropdownItem key="logout" className={styles['header-link']}><Link href='/login'> Logout </Link></DropdownItem>
                            <DropdownItem className={styles['header-link']}><Link href="">Your Portfolio</Link></DropdownItem>
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