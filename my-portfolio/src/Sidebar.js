import React from 'react';
import efimImg from './images/efim.jpg'; 
import mediumIcon from './images/medium-3.svg';
import linkedinIcon from './images/linkedin-3.svg';
import githubIcon from './images/square-github-2.svg';
import xIcon from './images/square-x-twitter.svg';
import threadsIcon from './images/square-threads.svg';
import './Sidebar.css';


function Sidebar({ onSectionChange }) {
  return (
    <aside className="sidebar">
      <div className="profile-container">
        <img src={efimImg} alt="Profile Picture" className="profile-picture" />
        <h4 className="uk-comment-title">Efim Shliamin</h4>
        <div className="uk-comment-body">
          <p id="degree-title">Computer Scientist, B.Sc.</p>
        </div>
        <div className="mobile-icons">
          <div className="icon-row">
            <a href="https://medium.com/@efimshliamin">
              <img src={mediumIcon} alt="Medium Icon" className="status-icon-mobile" />
            </a>
            <a href="https://www.linkedin.com/in/efimshliamin/">
              <img src={linkedinIcon} alt="LinkedIn Icon" className="status-icon-mobile" />
            </a>
            <a href="https://github.com/shliamin">
              <img src={githubIcon} alt="GitHub Icon" className="status-icon-mobile" />
            </a>
            <a href="https://x.com/EfimShliamin">
              <img src={xIcon} alt="X Icon" className="status-icon-mobile" />
            </a>
            <a href="https://threads.net/@efimslife">
              <img src={threadsIcon} alt="Threads Icon" className="status-icon-mobile" />
            </a>
          </div>
        </div>
      </div>

      <nav>
        <ul>
          <li>
            <button onClick={() => onSectionChange('about-me')} className="uk-button uk-button-default small-button">
              ABOUT ME
            </button>
          </li>
          <li>
            <button onClick={() => onSectionChange('my-work')} className="uk-button uk-button-default small-button">
              MY WORK
            </button>
          </li>
          <li>
            <button onClick={() => onSectionChange('contact')} className="uk-button uk-button-default small-button">
              CONTACT
            </button>
          </li>
          <li>
            <button onClick={() => onSectionChange('news')} className="uk-button uk-button-default small-button">
              NEWS
            </button>
          </li>
        </ul>
      </nav>

      <div className="divider"></div>

      <div className="status">
        <div className="status-item">
          <a href="https://medium.com/@efimshliamin">
            <img src={mediumIcon} alt="Medium Icon" className="status-icon" />
            <p id="p-title">Read me on Medium</p>
          </a>
        </div>
        <div className="status-item">
          <a href="https://www.linkedin.com/in/efimshliamin/">
            <img src={linkedinIcon} alt="LinkedIn Icon" className="status-icon" />
            <p id="p-title">Follow me on LinkedIn</p>
          </a>
        </div>
        <div className="status-item">
          <a href="https://github.com/shliamin">
            <img src={githubIcon} alt="GitHub Icon" className="status-icon" />
            <p id="p-title">Check out my GitHub</p>
          </a>
        </div>
        <div className="status-item">
          <a href="https://x.com/EfimShliamin">
            <img src={xIcon} alt="X Icon" className="status-icon" />
            <p id="p-title">Follow me on X</p>
          </a>
        </div>
        <div className="status-item">
          <a href="https://threads.net/@efimslife">
            <img src={threadsIcon} alt="Threads Icon" className="status-icon" />
            <p id="p-title">Follow me on Threads</p>
          </a>
        </div>
      </div>

      {/* Latest Articles on Notion */}
      <div className="articles-section desktop-only">
        <h3>Latest Articles on Notion:</h3>
        <div className="articles-list">
          <div className="article-item">
            <a href="https://familiar-surf-4ec.notion.site/Java-Grundlagen-und-OOP-8c5cf3e361564b5580319c88c7e35ac2" target="_blank">
              Java Grundlagen
            </a>
          </div>
          <div className="article-item">
            <a href="https://familiar-surf-4ec.notion.site/Spring-Boot-11cc1a5bfe1f4f56a71db9505cdc63c7" target="_blank">
              Spring Boot
            </a>
          </div>
          <div className="article-item">
            <a href="https://familiar-surf-4ec.notion.site/Jenkins-88ec7d611b754853be5f586281ac37e9" target="_blank">
              Jenkins
            </a>
          </div>
          <div className="article-item">
            <a href="https://familiar-surf-4ec.notion.site/React-c4a058765a0c4b4cbded6296786c43e3" target="_blank">
              React
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
