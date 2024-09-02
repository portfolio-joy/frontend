import styles from "@/styles/Dashboard.module.css";
import { SetStateAction, useEffect, useState } from "react";
import AboutMe from "./AboutMe";
import Skills from "./Skills";
import Projects from "./Projects";
import ProjectData from "./ProjectData";
import Testimonials from "./Testimonials";
import Contact from "./Contacts";
import SocialMedia from "./SocialMedia";
import { fetchUserData, fetchUserFailure } from "@/redux/slices/fetchUserSlice";
import { useRouter } from "next/router";
import { LoginResponseData } from "@/types/LoginResponseData";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { toast, ToastContainer } from "react-toastify";

export default function DashboardContainer() {
  const dispatch = useAppDispatch();
  const userState = useAppSelector(state => state.user);
  const error = useAppSelector(state => state.error);
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
    if (!Object.keys(error).length && !userState.success) dispatch(fetchUserData({ username: null, token: dataJson.token }));
    if (Object.keys(error).length && error.general === 'Session Expired') {
      dispatch(fetchUserFailure());
      toast.error("Session Expired");
      router.push('/login');
    }
  }, [error, userState.success]);

  return (
    <section className={styles["dashboard-main"]}>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        rtl={false} />
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