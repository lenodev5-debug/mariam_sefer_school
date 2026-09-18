import AttendanceCard from "../../shared/cards/attendance";
import UserActiveCard from "../../shared/cards/chartsStatus";
import VisitsCard from "../../shared/cards/gradeProgress";
import UserList from "../../shared/cards/ListUser";
import MeetingCard from "../../shared/cards/metting";
import StudentsCard from "../../shared/cards/studentCard";
import MenuVer from "../../ui/menuVertical";

export default function AdminDashboard() {
    return (
        <div className="relative min-h-screen w-full bg-gray-50 p-4 pt-20 dark:bg-[#0f0f0f]">

            <div className="mx-auto w-full max-w-[1600px] space-y-4">

                {/* Top cards */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    <UserActiveCard />
                    <VisitsCard />
                    <MeetingCard />
                </div>

                {/* Students + Attendance */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-[340px_1fr]">
                    <StudentsCard />
                    <AttendanceCard />
                </div>

                {/* Top Performer */}
                <div className="w-full">
                    <UserList />
                </div>

            </div>

            {/* Floating menu */}
            <MenuVer />

        </div>
    );
}