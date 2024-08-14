import { AboutMeType } from "./AboutMeType"
import { ContactType } from "./ContactType"
import { ProjectDataType } from "./ProjectDataType"
import { ProjectsType } from "./ProjectsType"
import { SkillType } from "./SkillsType"
import { SocialMediaType } from "./SocialMediaType"
import { TestimonialType } from "./TestimonialType"

export type UserPortfolioState = {
    success : boolean,
    data : AboutMeType | SkillType | ProjectsType | ProjectDataType | TestimonialType | ContactType | SocialMediaType,
    error : string
}