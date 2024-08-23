import styles from "@/styles/Portfolio.module.css"
import { useRouter } from "next/router";
import { useEffect } from "react";
import PortfolioAboutMe from "./AboutMe";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/pages/redux/store";
import { fetchPortfolioData } from "@/pages/redux/slices/fetchPortfolioDataSlice";
import PortfolioTechnicalSkills from "./TechnicalSkills";
import PortfolioSoftSkills from "./SoftSkills";

export default function PortfolioContainer() {
    
    const dispatch: AppDispatch = useDispatch();
    const router = useRouter();
    const {error} = useSelector((state: RootState) => state.portfolio);
    useEffect(() => {
        if (router.query.user) {
            dispatch(fetchPortfolioData(router.query.user as string))
        }
        if(error) {
            router.push('/_error');
        }
    }, [router.isReady, router.query.user, error]);
    return (
        <section className={styles['portfolio-container']}>
            <PortfolioAboutMe />
            <PortfolioTechnicalSkills />
            <PortfolioSoftSkills />
        </section>
    )
}