import SectionTimeline from './components/shared/sectionTimeLine';
import Home from './components/pages/Home';
import Baner from './components/shared/Baner';
import Platform from './components/pages/Platform';
import StudentRating from './components/pages/StudentRaring'

export default function CustomHome() {
  const sections = [
    {
      id: 'home',
      label: 'Home',
      component: <Home />,
    },
    {
      id: 'baner',
      label: 'Banner',
      component: <Baner />,
    },
    {
      id: 'platform',
      label: 'Platform',
      component: <Platform />,
    },
    {
      id: 'studentrating',
      label: 'StudentRating',
      component: <StudentRating />
    }
  ];

  return (
    <main className="relative min-h-screen w-full">
      {sections.map(section => (
        <section key={section.id} id={section.id} className="min-h-screen w-full scroll-mt-24">
          {section.component}
        </section>
      ))}

      <SectionTimeline sections={sections} />
    </main>
  );
}
