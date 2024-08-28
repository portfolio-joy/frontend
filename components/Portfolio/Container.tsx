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

export default function PortfolioContainer() {

    const dispatch: AppDispatch = useDispatch();
    const router = useRouter();
    const portfolioState = useAppSelector((state) => state.user);
    const [technicalSkills, setTechnicalSkills] = useState<SkillsType[] | undefined>([]);
    const [softSkills, setSoftSkills] = useState<SkillsType[] | undefined>([]);
    useEffect(() => {
        if (router.query.user && !portfolioState.success) {
            dispatch(fetchPortfolioData(router.query.user as string))
        }
        if (portfolioState.error) {
            router.push('/_error');
        }
        if (portfolioState.success) {
            setTechnicalSkills(portfolioState.user?.skills.filter((skill) => skill.skillType === 'Technical'));
            setSoftSkills(portfolioState.user?.skills.filter((skill) => skill.skillType === 'Soft'));
        }
    }, [router.isReady, router.query.user, portfolioState.error, portfolioState.success]);
    return (
        <main className={styles['portfolio-container']}>
            {portfolioState.user?.aboutMe && <PortfolioAboutMe />}
            {technicalSkills && technicalSkills?.length !== 0 && <PortfolioTechnicalSkills />}
            {softSkills && softSkills?.length!==0 && <PortfolioSoftSkills />}
            <Projects />
        </main>
    )
}