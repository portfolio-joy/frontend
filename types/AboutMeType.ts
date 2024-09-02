import { ImageType } from "./ImageType"

export interface AboutMeType {
    id: string,
    name: string,
    description: string,
    skills: string,
    profile: ImageType | File,
    user: {
        id: string
    }
}