import styles from '@/styles/Dashboard.module.css'
import { Chip, Divider, Modal, ModalBody, ModalContent, ModalFooter, Radio, RadioGroup, Slider, Tooltip, useDisclosure } from '@nextui-org/react'
import { CrossIcon } from '../icons'
import { useEffect, useState } from 'react';
import { UserResponseType } from '@/types/UserResponseType';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { removeSkillRequest, addSkillRequest, updateSkillRequest, updateSkillState } from '@/redux/slices/skillSlice';
import { SkillsType } from '@/types/SkillsType';
import { toast } from 'react-toastify';

export default function Skills() {

    const userState = useAppSelector(state => state.user);
    const skillState = useAppSelector(state => state.skill);
    const [skills, setSkills] = useState<SkillsType[]>((skillState.user as UserResponseType)?.skills);
    const errorJson = JSON.parse(skillState.error ? skillState.error : "{}");
    const [deleteSkillIndex, setDeleteSkillIndex] = useState<number>(-1);
    const [updateSkillIndex, setUpdateSkillIndex] = useState<number>(-1);
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const initialFormData = {
        name: "",
        skillType: "",
        proficiency: 1,
        description: "",
        user: {
            id: ""
        }
    };
    const [formData, setFormData] = useState(initialFormData);
    const [skillType, setSkillType] = useState<string>("");
    const [proficiencyValue, setProficiencyValue] = useState<number | number[]>(1);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (userState.success && skillState.user?.projects?.length === skills?.length) {
            dispatch(updateSkillState(userState.user));
            setSkills(userState.user?.skills as SkillsType[]);
        }
    }, [])

    useEffect(() => {
        setFormData((previousFormDataState) => ({ ...previousFormDataState, "proficiency": proficiencyValue as number }));
    }, [proficiencyValue]);

    useEffect(() => {
        if (skillState.success) {
            toast.success("Data Updated Successfully");
            setSkills((skillState.user as UserResponseType)?.skills);
        } else if (errorJson.general) {
            toast.error(errorJson.general);
        }
    }, [skillState.success, errorJson.general, skillState.user?.skills, skills])

    useEffect(() => {
        if (formData.user?.id && formData.user?.id !== '') {
            if (updateSkillIndex === -1) {
                dispatch(addSkillRequest({ data: formData as SkillsType, token: (userState.user as UserResponseType).token }))
            } else {
                dispatch(updateSkillRequest({ data: formData as SkillsType, skillId: (skills[updateSkillIndex].id), token: (userState.user as UserResponseType).token }))
            }
        }
    }, [formData.user?.id])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((previousFormDataState) => ({ ...previousFormDataState, [name]: value }));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormData((previousFormDataState) => ({ ...previousFormDataState, 'user': { 'id': (userState.user as UserResponseType).id } }));
    }
    const handleDelete = (index: number) => {
        setDeleteSkillIndex(index);
        onOpen();
    }
    const removeSkill = () => {
        dispatch(removeSkillRequest({ skillId: (skills[deleteSkillIndex].id), token: (userState.user as UserResponseType).token }));
        onClose();
    }

    const updateForm = (index: number) => {
        setFormData(skills[index]);
        setSkillType(skills[index].skillType);
        setProficiencyValue(skills[index].proficiency);
        setUpdateSkillIndex(index);
    }

    const cancelUpdate = () => {
        setUpdateSkillIndex(-1);
        setSkillType("");
        setProficiencyValue(1);
        setFormData(initialFormData);
    }

    return (
        <>
            <div className={styles['data-chips']}>
                {
                    skills?.map((skill, index) =>
                        <Chip key={index} className={`mb-2 ${styles['skill-chip']}`}>
                            <span className='select-none' onDoubleClick={() => updateForm(index)}>{skill.name}</span>
                            <button onClick={() => handleDelete(index)}><CrossIcon /></button>
                        </Chip>
                    )
                }
            </div>
            <Divider />
            <form className={styles['dashboard-form']} onSubmit={handleSubmit}>
                <h2>Skill Form</h2>
                <Tooltip className={errorJson.name && styles['error-tooltiip']} content={errorJson.name}>
                    <input autoComplete='true' className={errorJson.name ? styles['input-error'] : styles['input-normal']} name='name' type='text' placeholder='Name' defaultValue={formData.name} onChange={handleChange} required></input>
                </Tooltip>
                <Tooltip className={errorJson.type && styles['error-tooltiip']} content={errorJson.type}>
                    <RadioGroup name='skillType' aria-label='skill-type' color='secondary' orientation="horizontal" value={formData.skillType} onValueChange={setSkillType} isRequired onChange={handleChange}>
                        <Radio value="Technical">Technical</Radio>
                        <Radio value="Soft">Soft</Radio>
                    </RadioGroup>
                </Tooltip>
                {
                    skillType === 'Technical' &&
                    <Slider name='proficiency' aria-label='proficiency-slider' color='secondary' showTooltip={true} step={1} maxValue={100} minValue={1} defaultValue={formData.proficiency} className={`max-w-md p-5 ${styles['proficiency-slider']}`} value={Number(proficiencyValue)} onChange={setProficiencyValue} />
                }
                <Tooltip className={errorJson.description && styles['error-tooltip']} content={errorJson.description}>
                    <textarea className={errorJson.description ? styles['input-error'] : styles['input-normal']} name="description" rows={5} placeholder="Description" maxLength={600} value={formData.description} onChange={handleChange} required></textarea>
                </Tooltip>
                <fieldset className='flex'>
                    {
                        updateSkillIndex !== -1 &&
                        <button className='w-full' type="button" onClick={cancelUpdate}>Cancel</button>
                    }
                    <button className={`w-full ${styles['submit-button']}`} type="submit">{updateSkillIndex === -1 ? 'Save' : 'Update'}</button>
                </fieldset>
            </form>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalBody>
                        Are You Sure you want to remove?
                    </ModalBody>
                    <ModalFooter>
                        <button onClick={onClose}>Cancel</button>
                        <button className={styles['modal-button']} onClick={removeSkill}> Remove </button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}