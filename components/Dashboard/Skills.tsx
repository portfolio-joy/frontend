import styles from '@/styles/Dashboard.module.css'
import { Chip, Divider, Radio, RadioGroup } from '@nextui-org/react'
import { CrossIcon } from '../icons'
import { useState } from 'react';

export default function Skills() {
    const [skillType, setSkillType] = useState<string>("");
    return (
        <section className={styles['skills-section']}>
            <div>
                <Chip className={styles['skill-chip']}>
                    <span>Skill Name</span>
                    <button><CrossIcon /></button>
                </Chip>
            </div>
            <Divider />
            <form className={styles['dashboard-form']}>
                <h2>Skills Form</h2>
                <input className={styles['input-normal']} name='name' type='text' placeholder='Name'></input>
                <RadioGroup orientation="horizontal" value={skillType} onValueChange={setSkillType}>
                    <Radio value="Technical">Technical</Radio>
                    <Radio value="Soft">Soft</Radio>
                </RadioGroup>
                {
                    skillType==='Technical' && 
                    <input className={styles['input-normal']} type='number' placeholder='Proficiency' max={100}></input>
                }
            </form>
        </section>
    )
}