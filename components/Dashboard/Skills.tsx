import styles from '@/styles/Dashboard.module.css'
import { Chip, Divider, Radio, RadioGroup, Slider } from '@nextui-org/react'
import { CrossIcon } from '../icons'
import { useEffect, useState } from 'react';
import { UserResponseType } from '@/types/UserResponseType';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { saveSkillRequest } from '@/pages/redux/slices/skillSlice';
import { SkillsType } from '@/types/SkillsType';

export default function Skills() {

    const userState = useAppSelector(state => state.user);
    const skillState = useAppSelector(state => state.saveSkill);
    const [skills, setSkills] = useState<SkillsType[]>((userState.user as UserResponseType)?.skills);
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        proficiency: 1,
        description: "",
        user: {
            id: ""
        }
    });
    const [skillType, setSkillType] = useState<string>("");
    const [proficiencyValue, setProficiencyValue] = useState<number | number[]>(1);
    const dispatch = useAppDispatch();
    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((previousFormDataState) => ({ ...previousFormDataState, [name]: value }));
    }

    useEffect(() => {
        if (userState.success) {
            setSkills(userState.user?.skills as SkillsType[]);
            console.log(userState.user);
        }
    }, [userState.success,skillState.user?.skills])

    useEffect(() => {
        setFormData((previousFormDataState) => ({ ...previousFormDataState, "proficiency": proficiencyValue as number }));
    }, [proficiencyValue]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(saveSkillRequest({ data: formData as SkillsType, userId: (userState.user as UserResponseType).id, token: (userState.user as UserResponseType).token }))
    }
    return (
        <section className={styles['skills-section']}>
            <div>
                {
                    skills?.map((skill,index) =>
                        <Chip key={index} className={styles['skill-chip']}>
                            <span>{skill.name}</span>
                            <button><CrossIcon /></button>
                        </Chip>
                    )
                }
            </div>
            <Divider />
            <form className={styles['dashboard-form']} onSubmit={handleSubmit}>
                <h2>Add Skill</h2>
                <input className={styles['input-normal']} name='name' type='text' placeholder='Name' onChange={handleChange} required></input>
                <RadioGroup name='type' aria-label='skill-type' color='secondary' orientation="horizontal" value={skillType} onValueChange={setSkillType} isRequired onChange={handleChange}>
                    <Radio className={styles['radio-button']} value="Technical">Technical</Radio>
                    <Radio value="Soft">Soft</Radio>
                </RadioGroup>
                {
                    skillType === 'Technical' &&
                    <Slider name='proficiency' aria-label='proficiency-slider' color='secondary' showTooltip={true} step={1} maxValue={100} minValue={1} defaultValue={1} className={`max-w-md p-5 ${styles['proficiency-slider']}`} value={Number(proficiencyValue)} onChange={setProficiencyValue} />
                }
                <textarea className={styles['input-normal']} name="description" rows={5} placeholder="Description" maxLength={600} onChange={handleChange} required></textarea>
                <button type="submit"> Save </button>
            </form>
        </section>
    )
}