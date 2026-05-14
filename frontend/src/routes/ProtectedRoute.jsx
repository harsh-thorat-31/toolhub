import {
  useContext
} from "react";

import {
  Navigate
} from "react-router-dom";

import {
  AuthContext
} from "../context/AuthContext";

function ProtectedRoute({ children }) {

  const {
    user,
    authLoading
  } = useContext(AuthContext);

  // WAIT until auth restores

  if (authLoading) {

    return (
      <div className="min-h-screen flex justify-center items-center">

        <p className="text-xl font-semibold">
          Loading...
        </p>

      </div>
    );
  }

  // NOT LOGGED IN

  if (!user) {

    return <Navigate to="/login" />;
  }

  // LOGGED IN

  return children;
}

export default ProtectedRoute;