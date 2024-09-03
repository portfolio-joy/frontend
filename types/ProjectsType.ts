import { ImageType } from "./ImageType"
import { ProjectDataType } from "./ProjectDataType"

export interface ProjectsType {
    id : string,
    name : string,
    briefDetail : string,
    image : ImageType | File,
    projectData : ProjectDataType[],
    user : {
        id : string
    }
}