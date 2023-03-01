import { Navigate } from "react-router-dom";
import firebaseStore from "../store/firebaseStore";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = firebaseStore.auth;
  const user = auth.currentUser;

  if (!user) {
    return <Navigate to="/" replace={true} />;
  }

  return children;
};
