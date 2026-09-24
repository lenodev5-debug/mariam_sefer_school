import AttendanceCard from "../../shared/cards/users/attendance";
import ReadingDashboard from "../../shared/cards/books/bookstroe";
import UserActiveCard from "../../shared/cards/users/chartsStatus";
import VisitsCard from "../../shared/cards/users/gradeProgress";
import MeetingCard from "../../shared/cards/users/metting";
import StudentsCard from "../../shared/cards/users/student/studentCard";

import UserList from "../../shared/cards/users/user/userlist";
import StudentList from "../../shared/cards/users/student/StudentList";

import MenuVer from "../../ui/menuVertical";


export default function AdminDashboard() {

    return (
        <div className="relative min-h-screen w-full bg-gray-50 p-4 pt-20 dark:bg-[#0f0f0f]">

            <div className="mx-auto w-full max-w-[1600px] space-y-4">


                {/* ==================================================
                    TOP CARDS
                ================================================== */}

                <div className="flex items-center justify-between gap-2">

                    <UserActiveCard />

                    <VisitsCard />

                    <MeetingCard />

                </div>


                {/* ==================================================
                    STUDENTS + ATTENDANCE
                ================================================== */}

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-[340px_1fr]">

                    <StudentsCard />

                    <AttendanceCard />

                </div>


                {/* ==================================================
                    READING
                ================================================== */}

                <div className="grid grid-cols-1">

                    <ReadingDashboard />

                </div>


                {/* ==================================================
                    ALL USERS
                ================================================== */}

                <section className="w-full">

                    <UserList />

                </section>


                {/* ==================================================
                    STUDENTS
                ================================================== */}

                <section className="w-full">

                    <StudentList />

                </section>


            </div>


            {/* ==================================================
                FLOATING MENU
            ================================================== */}

            <MenuVer />

        </div>
    );
}