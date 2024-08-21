import styles from '@/styles/Dashboard.module.css'
import { Tooltip } from '@nextui-org/react'


export default function AboutMe() {
    return (
        <form className={styles["dashboard-form"]}>
            <input className={styles['input-normal']} name="name" type="text" placeholder="Name" ></input>
            <Tooltip className='bg-emerald-300' content="Seperate the skills using comma">
                <input className={styles['input-normal']} name="skills" type="text" placeholder="Skills" maxLength={255}></input>
            </Tooltip>
            <textarea className={styles['input-normal']} name="description" rows={5} placeholder="Description"></textarea>
            <input type="file" name="profile" accept="image/*" />
            <button type="submit"> Submit </button>
        </form>
    )
}