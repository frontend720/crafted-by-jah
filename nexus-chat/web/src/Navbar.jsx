import React from 'react'
import { GrChat } from "react-icons/gr";
import { MdOutlinePalette } from "react-icons/md";
import { RiAccountCircleFill } from "react-icons/ri";

// export default function Navbar({activeScreen, setActiveScreen}) {
//     function getIcon(screenName){
//         return `nav-icon ${activeScreen === screenName ? "active" : ""}`
//     }
//   return (
//     <nav>
//         <div className={getIcon("home")} onClick={() =>setActiveScreen("home")}>
//             <GrChat />
//         </div>
//          <div className={getIcon("images")} onClick={() =>setActiveScreen("images")}>
//             <MdOutlinePalette />
//         </div>
//          <div className={getIcon("profile")} onClick={() =>setActiveScreen("profile")}>
//             <RiAccountCircleFill />
//         </div>
//     </nav>
//   )
// }

export default function Navbar({ activeScreen, setActiveScreen }) {
    function getIcon(screenName) {
        return `nav-icon ${activeScreen === screenName ? "active" : ""}`
    }
    return (
        <nav className="navbar">
            <div className={getIcon("home")} onClick={() => setActiveScreen("home")}>
                <GrChat size="32px" />
            </div>
            <div className={getIcon("images")} onClick={() => setActiveScreen("images")}>
                <MdOutlinePalette size="32px" />
            </div>
            <div className={getIcon("profile")} onClick={() => setActiveScreen("profile")}>
                <RiAccountCircleFill size="32px" />
            </div>
        </nav>
    )
};

