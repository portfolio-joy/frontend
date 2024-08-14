import styles  from '@/styles/Dashboard.module.css'


export default function AboutMe() {
    return(
            <form className={styles["dashboard-form"]}>
                <input className={styles['input-normal']} name="name" type="text" placeholder="Name" ></input>
                <textarea className={styles['input-normal']} name="description" rows={5}  placeholder="Description"></textarea>
                <input type="file" name="profile"  accept="image/*"/>
                <button type="submit"> Submit </button>
            </form>
    )
}