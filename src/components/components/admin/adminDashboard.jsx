import { useEffect, useState } from "react";

import AttendanceCard from "../../shared/cards/users/attendance";
import ReadingDashboard from "../../shared/cards/books/bookstroe";
import UserActiveCard from "../../shared/cards/users/chartsStatus";
import VisitsCard from "../../shared/cards/users/gradeProgress";
import MeetingCard from "../../shared/cards/users/metting";
import StudentsCard from "../../shared/cards/users/student/studentCard";

import UserList from "../../shared/cards/users/user/userlist";
import StudentList from "../../shared/cards/users/student/StudentList";

import MenuVer from "../../ui/menuVertical";

// services
import userService from "../../../../lib/service/admin/userService";
import GradeForm from "../../shared/cards/Forms/GradeFrom";
import TimetableForm from "../../shared/cards/Forms/TimetableFrom";
import AcademicYearForm from "../../shared/cards/Forms/AcademicYear";
import DepartmentForm from "../../shared/cards/Forms/DepartmentForm";
import SubjectForm from "../../shared/cards/Forms/SubjectForm";


export default function AdminDashboard() {

    // USERS STATE

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(false);

    const [pagination, setPagination] = useState(null);


    // FETCH USERS

    async function fetchUsers(page = 1) {

        try {

            setLoading(true);


            const response =
                await userService.getAllUsers({
                    page,
                    limits: 20,
                });


            console.log(
                "USERS API RESPONSE:",
                response
            );


            setUsers(
                response.data || []
            );


            setPagination(
                response.pagination || null
            );

        } catch (error) {

            console.error(
                "Failed to fetch users:",
                error.response?.data || error
            );


            setUsers([]);

            setPagination(null);

        } finally {

            setLoading(false);

        }
    }


    // INITIAL FETCH

    useEffect(() => {

        fetchUsers(1);

    }, []);


    // VIEW USER

    const handleViewUser = (user) => {

        console.log(
            "VIEW USER:",
            user
        );

        // Later:
        // open user details modal
        // or navigate to user profile

    };


    // EDIT USER

    const handleEditUser = (user) => {

        console.log(
            "EDIT USER:",
            user
        );

        // Later:
        // open EditUserModal

    };


    // CHANGE ROLE

    const handleChangeRole = (user) => {

        console.log(
            "CHANGE ROLE:",
            user
        );

        // Later:
        // open ChangeRoleModal

    };


    // CHANGE STATUS

    const handleChangeStatus = async (user) => {

        console.log(
            "CHANGE STATUS:",
            user
        );

        // We will connect this to:
        // userService.changeUserStatus(...)
        //
        // after confirming the exact backend endpoint.

    };


    // DELETE USER

    const handleDeleteUser = async (user) => {

        console.log(
            "DELETE USER:",
            user
        );

        // We will connect this to:
        // userService.deleteUser(...)
        //
        // after adding confirmation.

    };


    // RENDER

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

                    <UserList
                        users={users}
                        loading={loading}

                        pagination={pagination}

                        onPageChange={fetchUsers}



                        onView={handleViewUser}

                        onEdit={handleEditUser}

                        onChangeRole={
                            handleChangeRole
                        }

                        onChangeStatus={
                            handleChangeStatus
                        }

                        onDelete={
                            handleDeleteUser
                        }

                        canView={true}

                        canEdit={true}

                        canChangeRole={true}

                        canChangeStatus={true}

                        canDelete={true}
                    />

                </section>


                {/* ==================================================
                    STUDENTS
                ================================================== */}

                <section className="w-full">

                    <StudentList />

                </section>

                <section className="w-full flex justify-between">
                        <GradeForm />
                        <AcademicYearForm />
                    <TimetableForm />
                </section>

                <section className="w-full flex justify-between">
                    <DepartmentForm />
                    <SubjectForm />
                </section>


            </div>


            {/* ==================================================
                FLOATING MENU
            ================================================== */}

            <MenuVer />

        </div>
    );
}