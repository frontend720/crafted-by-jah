import React from "react";
import { GoHomeFill } from "react-icons/go";
import { MdSettingsSuggest } from "react-icons/md";
import { GoArchive } from "react-icons/go";
import { BsChatLeftFill } from "react-icons/bs";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar">
        <div className="flex-container">
          <label>
            <GoHomeFill />
          </label>
          <label>
            <BsChatLeftFill />
          </label>
          <label>
            <GoArchive />
          </label>
          <label>
            <MdSettingsSuggest />
          </label>
        </div>
      </nav>
    </div>
  );
}
