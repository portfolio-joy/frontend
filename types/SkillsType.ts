export interface SkillsType  extends Response  {
    id : string,
    name : string,
    skillType : string,
    proficiency : number,
    description : string,
    user: {
        id: string
    }
}