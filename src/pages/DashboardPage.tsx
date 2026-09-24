import {useSelector} from "react-redux";
import {selectCurrentUser} from "../features/auth/authSlice";

function DashboardPage(){
    const user = useSelector(selectCurrentUser);
     if (!user) return null;

     return (
        <div>
            <h1>welcome back, {user.name}. </h1>
            <p>Your role: {user.role}</p>
            <p>The real ticket list arrives on Day 2</p>
        </div>
     )
}

export default DashboardPage;