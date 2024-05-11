import React, { useState, useEffect, useRef } from "react";
import QuickAbout from "./QuickAbout";
import Socials from "./Socials";
import About from "./About";
import Experience from "./Experience";
import Projects from "./Projects";
import Blog from "./Blog";
import Contact from "./Contact";
import ToggleSection from "./ToggleSection";
import Footer from "./Footer";

const Layout: React.FC = () => {
  const sections: string[] = [
    "About",
    "Experience",
    "Projects",
    "Blog",
    "Contact",
  ];
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const sectionRefs: { [key: string]: React.RefObject<HTMLDivElement> } = {};

  sections.forEach((section) => {
    sectionRefs[section] = useRef<HTMLDivElement>(null);
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      sections.forEach((section) => {
        const sectionElement = sectionRefs[section].current;
        if (sectionElement) {
          const sectionTop = sectionElement.offsetTop;
          const sectionHeight = sectionElement.clientHeight;

          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections, sectionRefs]);

  const handleSectionClick = (section: string) => {
    sectionRefs[section].current?.scrollIntoView({ behavior: "smooth" });
  };

  const renderSections = () => {
    return sections.map((section) => (
      <div
        key={section}
        className="font-bold text-lg flex flex-col gap-5 mb-9"
        ref={sectionRefs[section]}
      >
        {windowWidth <= 768 && (
          <h2 className="text-sm mt-7">{section.toUpperCase()}</h2>
        )}
        {section === "About" && <About windowWidth={windowWidth} />}
        {section === "Experience" && <Experience windowWidth={windowWidth} />}
        {section === "Projects" && <Projects windowWidth={windowWidth} />}
        {section === "Contact" && <Contact windowWidth={windowWidth} />}
        {section === "Blog" && <Blog windowWidth={windowWidth} />}
      </div>
    ));
  };

  return (
    <div className="h-full lg:flex lg:justify-between overflow-x-hidden">
      <div className="lg:w-1/3 lg:h-screen overflow-y-auto lg:fixed top-0 p-5 mt-8 ml-2">
        <QuickAbout />
        {windowWidth > 768 && (
          <ToggleSection
            sections={sections}
            sectionRefs={sectionRefs}
            activeSection={activeSection}
            onSectionClick={handleSectionClick}
          />
        )}
        <div>
          <Socials />
        </div>
      </div>
      <div
        className="flex flex-col overflow-y-auto lg:w-2/3 p-5 lg:ml-auto"
        ref={rightColumnRef}
      >
        <div className="flex flex-col gap-5">{renderSections()}</div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
