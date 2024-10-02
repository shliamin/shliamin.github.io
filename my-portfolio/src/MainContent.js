import React from 'react';
import AboutMe from './sections/AboutMe';
import MyWork from './sections/MyWork';
import Contact from './sections/Contact';
import NewsSection from './sections/NewsSection';

function MainContent({ activeSection }) {
  return (
    <main className="content">
      {activeSection === 'about-me' && <AboutMe />}
      {activeSection === 'my-work' && <MyWork />}
      {activeSection === 'contact' && <Contact />}
      {activeSection === 'news' && <NewsSection />}
    </main>
  );
}

export default MainContent;
