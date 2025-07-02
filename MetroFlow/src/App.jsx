import { useState } from "react";
import "swiper/css";
import "swiper/css/thumbs";
import data from "./details.json";
import { BiDirections, BiSolidDirections } from "react-icons/bi";
import { BsBuildingsFill, BsBuildings } from "react-icons/bs";
import { RiShoppingBagLine, RiShoppingBag2Line } from "react-icons/ri";
import { HiOutlineLibrary, HiLibrary } from "react-icons/hi";
import { IoMoon } from "react-icons/io5"
import { IoSunny } from "react-icons/io5";

import "./App.css";

function App() {

  const [slide, setSlide] = useState(0);
  const [line, setLine] = useState(0);
  const [line_detail, set_line_detail] = useState(0)

  function lineOne() {
    setLine(0);
    set_line_detail(0)
  }

  function lineTwo() {
    setLine(1);
    set_line_detail(1)
    
  }

  function lineThree() {
    setLine(2);
    set_line_detail(2)
  }

  function lineFour() {
    setLine(3);
    set_line_detail(3)
  }

  function slideOne() {
    setSlide(0);
  }

  function slideTwo() {
    setSlide(1);
  }

  function slideThree() {
    setSlide(2);
  }

  function slideFour() {
    setSlide(3);
  }

  const currentLineInfo = data.metro_schedule.light_rail_lines[line]?.info;


  const getIntroText = () => {
    return (
      currentLineInfo?.[slide]?.intro ||
      "No information available for this slide."
    );
  };

  const [theme, setTheme] = useState(true)
  function themeTrigger(){
    setTheme(prev => !prev)
  }

console.log(data.metro_schedule.light_rail_lines[1].theme)


console.log((data.metro_schedule.population + data.metro_schedule.base) * `.${Math.floor(data.metro_schedule.ridership)}`)

  return (
    <div style={
      // {backgroundImage: data.metro_schedule.light_rail_lines[theme === false ? 0 : 1].theme.dark}
      {
        backgroundImage: data.metro_schedule.line_cards[line],
        // background: data.metro_schedule.line_colors[line]
  
      }
     } className="container">
      <div onClick={themeTrigger} className="toggle-container">
        {theme ? <IoMoon color="#EFEBCE" /> : <IoSunny color="#F8E16C" />}
      </div>
      <div className="card-container">
        <img style={{position: "absolute", zIndex: -1}} src={data.metro_schedule.line_cards[line]} width={"100%"} height={"100%"} alt="" />
        <div className="summary-container">
          <div className="line-container">
            <div onClick={lineOne} className="line">
              Red
            </div>
            <div onClick={lineTwo} className="line">
              Blue
            </div>
            <div onClick={lineThree} className="line">
              Green
            </div>
            <div onClick={lineFour} className="line">
              Yellow
            </div>
          </div>
          <div
            className="line"
            style={{
              borderTop: `8px solid ${data.metro_schedule.line_colors[line]}`,
              marginTop: 20,
            }}
          ></div>
          <h1 className="line-name">
            {data.metro_schedule.light_rail_lines[line].name}
          </h1>
          <div className="text-container">
            <label className="intro-text">
              
              {getIntroText()}
            </label>
          </div>
        </div>
        <div className="button-container">
          <button className="guide-buttons" onClick={slideOne}>
            <BiDirections
              color={data.metro_schedule.light_rail_lines[0].info[0].color}
            />
          </button>
          <button className="guide-buttons" onClick={slideTwo}>
            <BsBuildings
              color={data.metro_schedule.light_rail_lines[0].info[1].color}
            />
          </button>
          <button className="guide-buttons" onClick={slideThree}>
            <RiShoppingBagLine
              color={data.metro_schedule.light_rail_lines[0].info[2].color}
            />
          </button>
          <button className="guide-buttons" onClick={slideFour}>
            <HiLibrary
              color={data.metro_schedule.light_rail_lines[0].info[3].color}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
