import UserIdCard from "../../shared/cards/users/userIdCards";
import user from "../../../assets/image/student1.png";

export default function StudentDashboard() {
  return (
    <div className="p-10">
      <UserIdCard>
        <div className="relative z-10 left-120 top-30 h-100 w-[50%] overflow-hidden rounded-[15px]">
          <img
            src={user}
            alt="Student profile"
            className="h-60 w-60 object-cover absolute bottom-60 left-20"
          />
          <img
            src={user}
            alt="Student profile"
            className="h-60 w-60 object-cover absolute bottom-34 left-60"
          />
          <img
            src={user}
            alt="Student profile"
            className="h-30 w-60 object-cover absolute bottom-60 left-100"
          />
        </div>
      </UserIdCard>
    </div>
  );
}