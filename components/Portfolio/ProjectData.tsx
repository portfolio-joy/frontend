import styles from "@/styles/Portfolio.module.css"
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Image } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchProjectDataRequest } from "@/redux/slices/projectDataSlice";
import { ImageType } from "@/types/ImageType";

export default function PortfolioProjectData() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const projectDataState = useAppSelector(state => state.projectData);

    useEffect(() => {
        if (router.query.user && !projectDataState.success) {
            const username = router.query.user[0];
            const projectName = router.query.user[1];
            dispatch(fetchProjectDataRequest({ username: username, projectName: projectName, token: null }));
        }
    }, [projectDataState, router.query.user, dispatch])

    return (
        <section className={styles['project-data']}>
            <h1>{router.query.user![1].toUpperCase()}</h1>
            {
                projectDataState.data.map((projectData, index) =>
                    <div key={index} className={index % 2 === 0 ? styles['slide-left'] : styles['slide-right']}>
                        <Image alt="Project Data Image" src={`data:${(projectData.image as ImageType)?.type};base64,${(projectData?.image as ImageType)?.imageData}`} className="rounded-none"></Image>
                        <div className={styles['project-details']}>
                            <h3>{projectData.heading}</h3>
                            <p>{projectData.description}</p>
                        </div>
                    </div>
                )
            }
        </section>
    )
}