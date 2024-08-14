import { ProjectDataType } from "./ProjectDataType"

export type ProjectsType = {
    id : string,
    name : string,
    briefDetail : string,
    image : File,
    projectData : ProjectDataType[]
}