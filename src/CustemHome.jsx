import SectionTimeline from "./components/shared/sectionTimeLine";
import Home from "./components/pages/Home";
import About from "./components/pages/About";

export default function CustemHome() {
  const sections = [
    {
      id: "home",
      label: "Home",
      component: <Home />,
    },
    {
        id: 'About',
        label: 'About',
        component: <About />,
    }
  ];

  return (
    <main className="relative min-h-screen">
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="scroll-mt-24 h-full"  // Add h-full
        >
          {section.component}
        </section>
      ))}
      <SectionTimeline sections={sections} />
    </main>
  );
}