import GradeForm from "../../shared/cards/Forms/GradeFrom";
import TimetableForm from "../../shared/cards/Forms/TimetableFrom";
import AcademicYearForm from "../../shared/cards/Forms/AcademicYear";
import DepartmentForm from "../../shared/cards/Forms/DepartmentForm";
import SubjectForm from "../../shared/cards/Forms/SubjectForm";

export default function AdminFormDashboard() {
    return (
        <div className="w-full space-y-4">

            <section className="flex w-full justify-between gap-4">
                <GradeForm />
                <AcademicYearForm />
                <TimetableForm />
            </section>

            <section className="flex w-full justify-between gap-4">
                <DepartmentForm />
                <SubjectForm />
            </section>

        </div>
    );
}