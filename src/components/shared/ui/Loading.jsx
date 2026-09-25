import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBook,
  faPencil,
  faGraduationCap,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

import "../../css/Loading.css";

export default function Loading({ fullScreen = true }) {
  return (
    <div
      className={`loading-container ${
        fullScreen ? "fixed inset-0" : ""
      }`}
    >
      <div className="loading-wrapper">

        {/* ICONS */}
        <div className="loader-icons">

          {/* RED → BOOK */}
          <div className="follow-icon red-icon">
            <FontAwesomeIcon icon={faBook} />
          </div>

          {/* BLUE → PENCIL */}
          <div className="follow-icon blue-icon">
            <FontAwesomeIcon icon={faPencil} />
          </div>

          {/* GREEN → GRADUATION CAP */}
          <div className="follow-icon green-icon">
            <FontAwesomeIcon icon={faGraduationCap} />
          </div>

          {/* YELLOW → CLOCK */}
          <div className="follow-icon yellow-icon">
            <FontAwesomeIcon icon={faClock} />
          </div>

        </div>

        {/* ORIGINAL LOADER */}
        <div className="loader"></div>

      </div>
    </div>
  );
}