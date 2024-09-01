import { ImageType } from "./ImageType"

export interface ProjectDataType{
    id : string,
    heading : string,
    description : string,
    image : File | ImageType
}