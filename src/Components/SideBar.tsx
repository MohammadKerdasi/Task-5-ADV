import React from "react";
import logo from "./../assets/Logo.png";

interface User {
  first_name: string;
  last_name: string;
  email: string;
  profile_image_url: string;
}

interface SideBarProps {
  user: User | null;
}

const SideBar: React.FC<SideBarProps> = ({ user }) => {
  return (
    <div className="w-[270px] h-[100vh] flex flex-col bg-light-orange2 justify-center items-center">
      <div className="font-semibold flex items-center uppercase">
        <div className="w-1 h-[23px] bg-orange mr-3"></div>
        <img className="w-[85px] h-[23px]" src={logo} alt="Logo" />
      </div>
      {user ? (
        <div className="text-center">
          <img
            className="w-[100px] h-[100px] rounded-full"
            src={user.profile_image_url}
            alt={`${user.first_name} ${user.last_name}`}
          />
          <h2 className="text-lg font-bold">
            {user.first_name} {user.last_name}
          </h2>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
      ) : (
        <p className="text-sm text-gray-600">No user data available</p>
      )}
    </div>
  );
};

export default SideBar;