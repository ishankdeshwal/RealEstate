import React from "react";
import { Avatar, Menu } from "@mantine/core";
import "@mantine/core/styles.css";
import { useNavigate } from "react-router-dom";

function ProfileMenu({ user, logout }) {
  const navigate = useNavigate();
  console.log("ProfileMenu user:", user);
  return (
    <div>
      <Menu>
        <Menu.Target>
          <Avatar
            src={user?.picture}
            alt={user?.name}
            className="h-10 w-10 rounded-full bg-green-800 font-bold"
          >
            {user?.name?.[0]}
          </Avatar>
        
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item onClick={() => navigate("/my-properties")}>My Properties</Menu.Item>
          <Menu.Item onClick={() => navigate("/bookings")}>Bookings</Menu.Item>
          <Menu.Item onClick={() => navigate("/favourites")}>Favourites</Menu.Item>
          <Menu.Item onClick={() => {
            localStorage.clear();
            logout({ returnTo: window.location.origin });
          }}>Logout</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}

export default ProfileMenu;
