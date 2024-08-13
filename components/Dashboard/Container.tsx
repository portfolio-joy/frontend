import styles from "@/styles/Dashboard.module.css";
import { useState } from "react";
import AboutMe from "./AboutMe";
import Skills from "./Skills";
import Projects from "./Projects";
import ProjectData from "./ProjectData";
import Testimonials from "./Testimonials";
import Contact from "./Contacts";
import SocialMedia from "./SocialMedia";

export default function DashboardContainer() {
  const [component, setComponent] = useState<JSX.Element>(AboutMe);
  const components : {key: () => JSX.Element;value: string;}[] = [
    {
      key: AboutMe,
      value: "About Me",
    },
    {
      key: Skills,
      value: "Skills",
    },
    {
      key: Projects,
      value: "Projects",
    },
    {
      key: ProjectData,
      value: "Project Data",
    },
    {
      key: Testimonials,
      value: "Testimonials",
    },
    {
      key: Contact,
      value: "Contact",
    },
    {
      key: SocialMedia,
      value: "Social Media",
    }
  ]
  return (
    <section className={styles["dashboard-main"]}>
      <div className={styles["left-panel"]}>
        <ul>
          {
            components.map((component, index) => {
              return (
                <li key={index} onClick={() => {
                  setComponent(component.key);
                }}
                >
                  {component.value}
                </li>
              )
            })
          }
        </ul>
      </div>
      <div className={styles["right-panel"]}>{component}</div>
    </section>
  );
}