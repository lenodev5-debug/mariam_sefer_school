import { useState } from "react";

import StudentFiromsa from "../../assets/images/student2.jpg";
import StudentMulualem from "../../assets/images/stundent.avif";
import StudentSurafel from "../../assets/images/stundet1.jpg";
import StudentHanna from "../../assets/images/stundet3.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUser } from "@fortawesome/free-solid-svg-icons";

export default function StudentRating() {
  const studentList = [
    {
      name: "Firomsa Misgana",
      point: "590",
      image: StudentFiromsa,
      rating: "1,2k",
      message:
        "Outstanding work, Firomsa! Your 590/600 score is an incredible achievement.",
      apText:
        "Your dedication and hard work have made us proud. We are honored to celebrate this outstanding achievement with you.",
    },
    {
      name: "Mulualem Legasa",
      point: "597",
      image: StudentMulualem,
      rating: "1,8k",
      message:
        "Amazing result, Mulualem! With 597/600, you are just 3 points away from a perfect score.",
      apText:
        "Congratulations on this exceptional result. Your determination and commitment to excellence are truly inspiring to our school community.",
    },
    {
      name: "Surafel Admasu",
      point: "593",
      image: StudentSurafel,
      rating: "1,3k",
      message:
        "Excellent job, Surafel! Your 593/600 score shows an exceptional level of preparation.",
      apText:
        "We are proud of your remarkable achievement. May this success be the beginning of many more accomplishments in your academic journey.",
    },
    {
      name: "Hanna Tesfaye",
      point: "586",
      image: StudentHanna,
      rating: "1,1k",
      message:
        "Great achievement, Hanna! Your 586/600 score is an excellent entrance result.",
      apText:
        "We are proud of your hard work and dedication. Your achievement is a wonderful example to our entire school community.",
    },
  ];
  return (
      <div className="flex bg-[#090909] w-full h-[65vh]">
          <div className="w-86 min-h-0 bg-linear-to-tr from-[#151719] via-[#151718] to-[#090909] flex flex-col justify-center px-4 relative rounded-3xl my-4">
            <FontAwesomeIcon icon={faUser} size="6x" color="#fff" className="mb-4 ml-4"/>
            <h1 className="mt-1 text-3xl text-white">High Student rating</h1>
            <p className="text-white/55">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque veritatis perspiciatis recusandae sint soluta eum esse molestiae</p>
            <p className="text-white/65 text-center text-sm decoration-solid underline mt-2">meriem sefer/student</p>
          <div className="flex justify-center">
            <button className="bg-[#212121] text-white rounded-md w-34 h-12 mt-3 flex items-center justify-center gap-2">
              <FontAwesomeIcon icon={faStar} size="xl" />
              rate on here
            </button>
          </div>
        </div>
      </div>
  );
}