import { ImageType } from "./ImageType"
import { ProjectDataType } from "./ProjectDataType"

export interface ProjectsType extends Response {
    id : string,
    name : string,
    briefDetail : string,
    image : ImageType | File,
    projectData : ProjectDataType[]
}