import styles from "@/styles/Portfolio.module.css"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PortfolioAboutMe from "./AboutMe";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchPortfolioData } from "@/redux/slices/fetchUserSlice";
import PortfolioTechnicalSkills from "./TechnicalSkills";
import PortfolioSoftSkills from "./SoftSkills";
import { useAppSelector } from "@/hooks/hooks";
import { SkillsType } from "@/types/SkillsType";
import Projects from "./Projects";
import ProjectData from "./ProjectData";

export default function PortfolioContainer() {

    const dispatch: AppDispatch = useDispatch();
    const router = useRouter();
    const portfolioState = useAppSelector(state => state.user);
    const error = useAppSelector(state => state.error);
    const [technicalSkills, setTechnicalSkills] = useState<SkillsType[] | undefined>([]);
    const [softSkills, setSoftSkills] = useState<SkillsType[] | undefined>([]);
    const [projectPage, setProjectPage] = useState(false);
    useEffect(() => {
        if (router.query.user && !portfolioState.success) {
            if (router.query.user.length === 1) {
                console.log(router.query.user)
                dispatch(fetchPortfolioData(router.query.user[0]));
            } else if (router.query.user.length === 2) {
                setProjectPage(true);
            } else {
                router.push('/_error');
                return;
            }
        }
        if (Object.keys(error).length) {
            router.push('/_error');
            return;
        }
        if (portfolioState.success) {
            setTechnicalSkills(portfolioState.user?.skills.filter((skill) => skill.skillType === 'Technical'));
            setSoftSkills(portfolioState.user?.skills.filter((skill) => skill.skillType === 'Soft'));
        }
    }, [router.isReady, router.query.user, error, portfolioState.success]);
    return (
        <main className={styles['portfolio-container']}>
            {
                projectPage ?
                    <ProjectData />
                    :
                    <>
                        {portfolioState.user?.aboutMe && <PortfolioAboutMe />}
                        {technicalSkills && technicalSkills?.length!==0 && <PortfolioTechnicalSkills />}
                        {softSkills && softSkills?.length!==0 && <PortfolioSoftSkills />}
                        {portfolioState && portfolioState.user?.projects?.length!==0 && <Projects />}
                    </>
            }
        </main>
    )
}