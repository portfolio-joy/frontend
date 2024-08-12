import styles from '@/styles/Home.module.css'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import Link from 'next/link'
import { ArrowDownIcon } from '../icons'

export default function Header() {
    return (
        <header className={styles['header']}>
            <Link className={styles['header-link']} href='/'>Home</Link>
            <Dropdown>
                <DropdownTrigger>
                    <Button className={styles['header-dropdown']}> Chirag<ArrowDownIcon></ArrowDownIcon></Button>
                </DropdownTrigger>
                <DropdownMenu className={styles['dropdown-menu']}>
                    <DropdownItem key="dashboard" className= {styles['header-link']}><Link href='/dashboard'> Dashboard </Link></DropdownItem>
                    <DropdownItem key="logout" className={styles['header-link']}><Link href='/login'> Logout </Link></DropdownItem>
                    <DropdownItem  className={styles['header-link']}><Link href="">Your Portfolio</Link></DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </header>
    )
}