import React from "react";
import { Link } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { MdSettingsSuggest } from "react-icons/md";
import { GoArchive } from "react-icons/go";
import { BsChatLeftFill } from "react-icons/bs";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar">
        <div className="flex-container">
          <Link to="/">
            <label>
              <GoHomeFill />
            </label>
          </Link>
          <label>
            <BsChatLeftFill />
          </label>
          <label>
            <GoArchive />
          </label>
          <Link to="/settings">
            <label>
              <MdSettingsSuggest />
            </label>
          </Link>
        </div>
      </nav>
    </div>
  );
}
