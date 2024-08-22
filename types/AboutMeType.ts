import { ImageType } from "./ImageType"

export interface AboutMeType extends Response {
    id: string,
    name: string,
    description: string,
    skills: string,
    profile: ImageType | File,
    user: {
        id: string
    }
}