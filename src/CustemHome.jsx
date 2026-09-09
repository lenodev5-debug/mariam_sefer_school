import SectionTimeline from './components/shared/sectionTimeLine';
import Home from './components/pages/Home';
import Baner from './components/pages/Baner';
import Platform from './components/pages/Platform';
import StudentRating from './components/pages/StudentRaring'
import CoursesDisplay from './components/pages/courses';
import News from './components/pages/new';
import StudentComments from './components/pages/studentComment';
import Footer from './components/pages/footer';

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
    },
    {
      id: 'courses',
      label: 'label',
      component: <CoursesDisplay />
    },
     {
      id: 'courses',
      label: 'label',
      component: <News />
    },
    {
      id: 'studentcomments',
      label: 'comments',
      component: <StudentComments />
    },
    {
      id: 'footer',
      label: 'footer',
      component: <Footer />
    }
  ];

  return (
    <main className="relative min-h-screen w-full">
      {sections.map(section => (
        <section key={section.id} id={section.id} className="w-full scroll-mt-24">
          {section.component}
        </section>
      ))}
      <SectionTimeline sections={sections} />
    </main>
  );
}
