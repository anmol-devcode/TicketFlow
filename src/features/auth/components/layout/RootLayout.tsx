import { Outlet, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectIsAuthenticated,
  sessionEnded,
} from "../../authSlice";


function RootLayout() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(sessionEnded());
    navigate("/login");
  }

  return (
    <div className="app-shel">
      <header>
        <span className="brand">TicketFlow</span>
        {isAuthenticated && user && (
          <div className="">
            <span>
              {user.name} ({user.role})
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default  RootLayout;