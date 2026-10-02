
import GradeForm from "../../Forms/GradeFrom";
import TimetableForm from "../../Forms/TimetableFrom";
import AcademicYearForm from "../../Forms/AcademicYear";
import DepartmentForm from "../../Forms/DepartmentForm";
import SubjectForm from "../../Forms/SubjectForm";
import UserForm from "../userForm";
import BookForm from "../BookForm";

import gradeService from "../../../../../../lib/service/admin/gradeService";
import academicYearService from "../../../../../../lib/service/admin/academicYearService";
import timetableService from "../../../../../../lib/service/admin/timetable";
import departmentService from "../../../../../../lib/service/admin/departmentService";
import subjectService from "../../../../../../lib/service/admin/subjectService";
import userService from "../../../../../../lib/service/admin/userService";
import bookstoreService from "../../../../../../lib/service/books/bookstoreService";

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
    {
        key: 'User Form',
        label: 'User Form',
        description: 'Create User with Role',
        Component: UserForm,
        service: userService,
        listKey: 'createUser',
        chart: "bar"
    },
    {
        key: "book",
        label: "Book",
        description: "Add a new book to the library",
        Component: BookForm,
        service: bookstoreService,
        listKey: "createBook",
        chart: "bar",
    },
];