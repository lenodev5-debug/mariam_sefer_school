
import GradeForm from "../../Forms/GradeFrom";
import TimetableForm from "../../Forms/TimetableFrom";
import AcademicYearForm from "../../Forms/AcademicYear";
import DepartmentForm from "../../Forms/DepartmentForm";
import SubjectForm from "../../Forms/SubjectForm";

import gradeService from "../../../../../../lib/service/admin/gradeService";
import academicYearService from "../../../../../../lib/service/admin/academicYearService";
import timetableService from "../../../../../../lib/service/admin/timetable";
import departmentService from "../../../../../../lib/service/admin/departmentService";
import subjectService from "../../../../../../lib/service/admin/subjectService";

export const FORM_TABS = [
    {
        key: "grade",
        label: "Grade",
        description: "Create grades and sections",
        Component: GradeForm,
        service: gradeService,
        listKey: "getAllGrades",
        chart: "bar",
    },
    {
        key: "academicYear",
        label: "Academic",
        description: "Create and configure academic years",
        Component: AcademicYearForm,
        service: academicYearService,
        listKey: "getAllAcademicYears",
        chart: "stacked",
    },
    {
        key: "timetable",
        label: "Timetable",
        description: "Add classes to the school timetable",
        Component: TimetableForm,
        service: timetableService,
        listKey: "getAllTimetables",
        chart: "week",
    },
    {
        key: "department",
        label: "Department",
        description: "Organize school subjects",
        Component: DepartmentForm,
        service: departmentService,
        listKey: "getAllDepartments",
        chart: "bar",
    },
    {
        key: "subject",
        label: "Subject",
        description: "Create subjects and assign departments",
        Component: SubjectForm,
        service: subjectService,
        listKey: "getAllSubjects",
        chart: "bar",
    },
];