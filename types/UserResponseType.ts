import { AboutMeType } from "./AboutMeType"
import { ContactType } from "./ContactType"
import { ProjectsType } from "./ProjectsType"
import { SkillType } from "./SkillsType"
import { SocialMediaType } from "./SocialMediaType"
import { TestimonialType } from "./TestimonialType"

export interface UserResponseType extends Response {
    id : string,
    firstName : string,
    lastName : string,
    age : string,
    emailId : string,
    username : string,
    portofolioUrl : string,
    token : string,
    aboutMe : AboutMeType,
    allSkill : SkillType[],
    allProject : ProjectsType[],
    allTestimonial : TestimonialType[],
    contact : ContactType,
    allSocialMedia : SocialMediaType[]
}