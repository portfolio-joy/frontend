import { ProjectDataType } from "./ProjectDataType";

export interface ProjectDataResponseType extends Response {
    projectData: ProjectDataType[];
}