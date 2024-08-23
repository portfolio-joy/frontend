import styles from '@/styles/Dashboard.module.css'
import { Chip, Divider, Radio, RadioGroup, Slider } from '@nextui-org/react'
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
                <h2>Add Skill</h2>
                <input className={styles['input-normal']} name='name' type='text' placeholder='Name' required></input>
                <RadioGroup color='secondary' orientation="horizontal" value={skillType} onValueChange={setSkillType} isRequired>
                    <Radio className={styles['radio-button']} value="Technical">Technical</Radio>
                    <Radio value="Soft">Soft</Radio>
                </RadioGroup>
                {
                    skillType==='Technical' &&
                    <Slider color='secondary' showTooltip={true} step={1} maxValue={100} minValue={1} defaultValue={1} className={`max-w-md p-5 ${styles['proficiency-slider']}`}/>
                }
                <textarea className={styles['input-normal']} name="description" rows={5} placeholder="Description" maxLength={600}></textarea>
            </form>
        </section>
    )
}