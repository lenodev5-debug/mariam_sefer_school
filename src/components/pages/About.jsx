// About.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGraduationCap, 
  faBook, 
  faMapMarkerAlt, 
  faPhone, 
  faEnvelope,
  faUsers,
  faChalkboardTeacher,
  faAward,
  faFlask,
  faLanguage,
  faStar,
  faClock,
  faBullseye,
  faHands,
  faInfoCircle,
  faHome,
  faBookOpen,
  faAddressCard
} from '@fortawesome/free-solid-svg-icons';
import '../../css/About.css'

export default function About() {
  return (
    <div className="about-wrapper">
      <div className="about-container">
        <h1 className="about-main-title">Mariam Sefer School</h1>
        <p className="about-main-subtitle">Dire Dawa, Ethiopia</p>
        
        <div className="palette">
          {/* About Us - Top Right */}
          <div id="color1" className="color">
            <div className="color-content">
              <div className="color-icon">
                <FontAwesomeIcon icon={faInfoCircle} />
              </div>
              <h3>About Us</h3>
              <div className="color-preview">
                <FontAwesomeIcon icon={faGraduationCap} />
                <span>Learn About Our School</span>
              </div>
              <div className="color-details">
                <p>
                  Mariam Sefer Primary and Secondary School is a prestigious educational 
                  institution located in Dire Dawa, Ethiopia. Committed to academic excellence, 
                  the school provides quality education from primary through secondary levels.
                </p>
                <div className="color-stats">
                  <span><FontAwesomeIcon icon={faUsers} /> 500+ Students</span>
                  <span><FontAwesomeIcon icon={faChalkboardTeacher} /> 30+ Teachers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Our Mission - Bottom Right */}
          <div id="color2" className="color">
            <div className="color-content">
              <div className="color-icon">
                <FontAwesomeIcon icon={faHome} />
              </div>
              <h3>Our Mission</h3>
              <div className="color-preview">
                <FontAwesomeIcon icon={faBullseye} />
                <span>Our Vision & Goals</span>
              </div>
              <div className="color-details">
                <p>
                  To empower students with knowledge, skills, and values that prepare them 
                  for higher education and responsible citizenship, while fostering a love 
                  for learning and personal growth.
                </p>
                <div className="color-values">
                  <span><FontAwesomeIcon icon={faStar} /> Excellence</span>
                  <span><FontAwesomeIcon icon={faHands} /> Integrity</span>
                  <span><FontAwesomeIcon icon={faClock} /> Innovation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Programs - Bottom Left */}
          <div id="color3" className="color">
            <div className="color-content">
              <div className="color-icon">
                <FontAwesomeIcon icon={faBookOpen} />
              </div>
              <h3>Academics</h3>
              <div className="color-preview">
                <FontAwesomeIcon icon={faBook} />
                <span>Our Programs</span>
              </div>
              <div className="color-details">
                <ul>
                  <li><FontAwesomeIcon icon={faBook} /> Primary (Grades 1-8)</li>
                  <li><FontAwesomeIcon icon={faGraduationCap} /> Secondary (Grades 9-12)</li>
                  <li><FontAwesomeIcon icon={faAward} /> College Prep Program</li>
                  <li><FontAwesomeIcon icon={faFlask} /> STEM Education</li>
                  <li><FontAwesomeIcon icon={faLanguage} /> Language Arts</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact - Top Left */}
          <div id="color4" className="color">
            <div className="color-content">
              <div className="color-icon">
                <FontAwesomeIcon icon={faAddressCard} />
              </div>
              <h3>Contact Us</h3>
              <div className="color-preview">
                <FontAwesomeIcon icon={faEnvelope} />
                <span>Get In Touch</span>
              </div>
              <div className="color-details">
                <p>
                  <FontAwesomeIcon icon={faMapMarkerAlt} /> Dire Dawa, Ethiopia<br />
                  <FontAwesomeIcon icon={faPhone} /> +251-XXX-XXXX<br />
                  <FontAwesomeIcon icon={faEnvelope} /> info@mariamsefer.edu.et
                </p>
                <div className="contact-hours">
                  <p><strong>Office Hours:</strong></p>
                  <p>Mon-Fri: 8:00 AM - 5:00 PM</p>
                  <p>Sat: 8:00 AM - 12:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div id="color-code">
            <div id="color-code-bg" />
            <div id="color-code-text" />
          </div>
        </div>
      </div>
    </div>
  )
}