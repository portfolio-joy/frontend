import { ProjectDataType } from "./ProjectDataType";

export type ProjectDataState = {
    success: boolean;
    data: ProjectDataType[];
    error: Record<string,string> | null;
}