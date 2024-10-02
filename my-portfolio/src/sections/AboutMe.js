import React from 'react';
import './sections.css';

function AboutMe() {
  return (
    <section id="about-me" className="section active">
      <div id="content-en">
        <h2>About me</h2>
        <p>
          I am a Computer Scientist with a B.Sc. in Computer Science from the University of Applied Sciences Berlin and previous studies in Electrical Engineering and IT Security at Ruhr University Bochum. Since 2019, I have been engaged in software development, cloud computing, DevOps, and data science, completing internships at Rhenus Logistics, the Data Centre of the University of Applied Sciences Berlin, participating in the Mercedes-Benz Innovation Challenge, and working for the Institute of Geographic Information Technology, alongside freelancing for various clients. I focus on solving business, scientific, and social problems through scalable and efficient IT solutions, contributing to the community through open-source projects and technical writing.
        </p>
        
        <h3>Key Achievements</h3>
        <ul>
          <li>Participated in an Innovation Challenge with Mercedes-Benz, where I helped create an IT solution to attract younger clients, earning a recommendation letter and a prize.</li>
          <li>Developed a software pipeline that improved genome assembly quality, used by students in their dissertations.</li>
          <li>Contributed to the development of a university web portal used by 14,000 students.</li>
          <li>Assisted Rhenus Logistics in passing an audit by creating technical documentation on Data Protection Policies and Data Security Management.</li>
          <li>Supported the Institute of Geographic Information Technology in developing proprietary technologies, reducing dependency on foreign software licenses.</li>
          <li>Created numerous web and cloud-based applications, many of which are open source and widely adopted by the community.</li>
        </ul>

        <p style={{ marginBottom: '40px' }}>
          I am interested in long-term full-time collaborations and always strive to provide value, whether through direct collaboration or by offering insights into IT challenges your organization might face. Please visit the CONTACT section to get in touch, and feel free to explore my NEWS section for the latest in IT.
        </p>
      </div>

      <div id="content-de" style={{ display: 'none' }}>
        <h2>Über mich</h2>
        <p>
          Ich bin Informatiker mit einem B.Sc. in Informatik von der HTW-Berlin und habe zuvor Elektrotechnik und IT-Sicherheit an der Ruhr-Universität Bochum studiert. Seit 2019 arbeite ich in der Software-Entwicklung, Cloud Computing, DevOps und Data Science. Ich habe Praktika bei Rhenus Logistics, im Rechenzentrum der HTW-Berlin absolviert, am Mercedes-Benz Innovation Challenge teilgenommen und für das Institut für Geographische Informationstechnologie gearbeitet. Parallel dazu war ich als Freelancer tätig. Mein Fokus liegt auf der Lösung von geschäftlichen, wissenschaftlichen und sozialen Problemen durch IT-Lösungen. Außerdem unterstütze ich die Community durch Open-Source-Projekte und technische Beiträge.
        </p>
        
        <h3>Wichtige Erfolge</h3>
        <ul>
          <li>An einer Innovation Challenge von Mercedes-Benz teilgenommen, bei der ich an der Entwicklung einer IT-Lösung zur Gewinnung jüngerer Kunden beteiligt war und dafür ein Empfehlungsschreiben sowie einen Preis erhalten habe.</li>
          <li>Entwicklung einer Software-Pipeline, die die Qualität der Genomassemblierung verbessert hat und von Studierenden in ihren Dissertationen verwendet wird.</li>
          <li>Beitrag zur Entwicklung eines Universitätsportals, das von 14.000 Studierenden genutzt wird.</li>
          <li>Rhenus Logistics bei der erfolgreichen Durchführung einer Prüfung unterstützt, indem ich technische Dokumentationen zu Datenschutzrichtlinien und Sicherheitsmanagement erstellt habe.</li>
          <li>Das Institut für Geographische Informationstechnologie bei der Entwicklung eigener Technologien unterstützt und so die Abhängigkeit von ausländischen Softwarelizenzen reduziert.</li>
          <li>Erstellung zahlreicher Web- und Cloud-basierter Anwendungen, von denen viele Open-Source sind und in der Community große Akzeptanz finden.</li>
        </ul>

        <p>Ich bin an langfristigen Vollzeit-Kooperationen interessiert und strebe stets danach, Mehrwert zu schaffen, sei es durch direkte Zusammenarbeit oder durch Einblicke in IT-Herausforderungen, mit denen Ihr Unternehmen konfrontiert sein könnte. Besuchen Sie den Bereich CONTACT, um mit mir in Verbindung zu treten, und schauen Sie sich gerne den NEWS-Bereich an, um sich über die neuesten Entwicklungen in der IT zu informieren.</p>
      </div>
    </section>
  );
}

export default AboutMe;
