import "./ExploreContainer.css";
import { useState, useEffect } from "react";

const ExploreContainer = ({ name }) => {
  const names = [
    "Jared",
    "Lindsy",
    "Jamie",
    "Kurt",
    "Eve",
    "Howard",
    "Katie",
    "Mason",
    "Brian",
    "Abdullah",
    "Demeko",
    "Douglass",
    "Artemis",
  ];

  const [index, setIndex] = useState(0);
  const [degrees, setDegrees] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDegrees((prev) => (prev + 1) % 360);
    }, 25);
    return () => clearInterval(intervalId);
  }, []);

  function changeIndex() {
    setIndex((prev) => (prev + 1) % names.length);
  }
  return (
    <div className="container">
      <strong>{name}</strong>
      <p>
        Explore{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://ionicframework.com/docs/components"
        >
          UI Components
        </a>
      </p>
      <button onClick={changeIndex}>Change Name</button>
      {names[index]}
    </div>
  );
};

export default ExploreContainer;
