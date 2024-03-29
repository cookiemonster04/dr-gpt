import React from "react";
import Profile from "../components/Profile";
import { useParams, Navigate } from "react-router-dom";

const ProfilePage = ({ themeMode }) => {
  const { userId } = useParams();
  return <Profile user={user} userId={userId} themeMode={themeMode}/>;
};

const ProfileHome = ({ user, themeMode }) => {
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <Profile user={user} themeMode={themeMode} />;
};

export { ProfilePage, ProfileHome };
