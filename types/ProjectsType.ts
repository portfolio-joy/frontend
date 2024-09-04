import { ImageType } from "./ImageType"
import { ProjectDataType } from "./ProjectDataType"

export type ProjectsType = {
    id: string,
    name: string,
    briefDetail: string,
    image: ImageType | File,
    projectData: ProjectDataType[]
}