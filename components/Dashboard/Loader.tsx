import { Spinner } from "@heroui/react";
import styles from '@/styles/Dashboard.module.css'

export default function Loader() {
    return (
        <div className={styles['loader-container']}>
            <Spinner />
        </div>
    )
}