import styles from '@/styles/Dashboard.module.css'
import { Chip, Divider, Radio, RadioGroup, Slider } from '@nextui-org/react'
import { CrossIcon } from '../icons'
import { useEffect, useState } from 'react';
import { SkillType } from '@/types/SkillsType';
import { UserResponseType } from '@/types/UserResponseType';
import { useAppSelector } from '@/hooks/hooks';

export default function Skills() {

    const userState = useAppSelector((state) => state.user);
    const [formData, setFormData] = useState<SkillType[]>((userState.data as UserResponseType)?.allSkill);
    const [skillType, setSkillType] = useState<string>("");
    const [proficiencyValue,setProficiencyValue] = useState<number | number[]>(1);
    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((previousFormDataState) => ({ ...previousFormDataState, [name]: value }));
    }

    useEffect(()=>{
        setFormData((previousFormDataState) => ({ ...previousFormDataState, "proficiency": proficiencyValue }));
    },[proficiencyValue]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }
    return (
        <section className={styles['skills-section']}>
            <div>
                <Chip className={styles['skill-chip']}>
                    <span>Skill Name</span>
                    <button><CrossIcon /></button>
                </Chip>
            </div>
            <Divider />
            <form className={styles['dashboard-form']}  onSubmit={handleSubmit}>
                <h2>Add Skill</h2>
                <input className={styles['input-normal']} name='name' type='text' placeholder='Name' onChange={handleChange} required></input>
                <RadioGroup name='type' aria-label='skill-type' color='secondary' orientation="horizontal" value={skillType} onValueChange={setSkillType} isRequired onChange={handleChange}>
                    <Radio className={styles['radio-button']} value="Technical">Technical</Radio>
                    <Radio value="Soft">Soft</Radio>
                </RadioGroup>
                {
                    skillType==='Technical' &&
                    <Slider name='proficiency' aria-label='proficiency-slider' color='secondary' showTooltip={true} step={1} maxValue={100} minValue={1} defaultValue={1} className={`max-w-md p-5 ${styles['proficiency-slider']}`} value={Number(proficiencyValue)} onChange={setProficiencyValue}/>
                }
                <textarea className={styles['input-normal']} name="description" rows={5} placeholder="Description" maxLength={600} onChange={handleChange} required></textarea>
                <button type="submit"> Save </button>
            </form>
        </section>
    )
}