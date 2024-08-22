import styles from "@/styles/Dashboard.module.css";
import { SetStateAction, useEffect, useState } from "react";
import AboutMe from "./AboutMe";
import Skills from "./Skills";
import Projects from "./Projects";
import ProjectData from "./ProjectData";
import Testimonials from "./Testimonials";
import Contact from "./Contacts";
import SocialMedia from "./SocialMedia";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/pages/redux/store";
import { fetchUserData } from "@/pages/redux/slices/fetchUserSlice";
import { useRouter } from "next/router";
import { LoginResponseData } from "@/types/LoginResponseData";

export default function DashboardContainer() {
  const dispatch: AppDispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const [activeModule, setActiveModule] = useState<JSX.Element>(<AboutMe />);
  const [activeModuleIndex, setActiveModuleIndex] = useState<number>(0);
  const modules: { key: SetStateAction<JSX.Element>; value: string; }[] = [
    {
      key: <AboutMe />,
      value: "About Me",
    },
    {
      key: <Skills />,
      value: "Skills",
    },
    {
      key: <Projects />,
      value: "Projects",
    },
    {
      key: <ProjectData />,
      value: "Project Data",
    },
    {
      key: <Testimonials />,
      value: "Testimonials",
    },
    {
      key: <Contact />,
      value: "Contact",
    },
    {
      key: <SocialMedia />,
      value: "Social Media",
    }
  ]

  useEffect(() => {
    const localStorageData = localStorage.getItem('data');
    const dataJson: LoginResponseData = JSON.parse(localStorageData ? localStorageData : '{}');
    if (!userState.error && !userState.success) dispatch(fetchUserData(dataJson));
    if (userState.error) {
      let error;
      try {
        error = JSON.parse(userState.error);
      } catch (error: unknown) {
      }
      if (error?.general === 'Session Expired') {
        router.push('/login');
      }
    }
  }, [userState.error, userState.success]);

  return (
    <section className={styles["dashboard-main"]}>
      <div className={styles["left-panel"]}>
        <ul>
          {
            modules.map((module, index) => {
              return (
                <li className={activeModuleIndex == index ? styles['activeModule'] : styles['module']} key={index} onClick={() => {
                  setActiveModuleIndex(index);
                  setActiveModule(module.key);
                }}
                >
                  {module.value}
                </li>
              )
            })
          }
        </ul>
      </div>
      <div className={styles["right-panel"]}>{activeModule}</div>
    </section>
  );
}