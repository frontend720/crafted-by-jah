Subway Line Visualizer (React.js)
Project Overview
The "Subway Line Visualizer" is a React.js application designed to provide an interactive, animated simulation of subway trains moving along their routes, with each station on a given line represented by a distinct dot. The goal is to offer a clear, engaging, and simplified visual representation of subway line operations, emphasizing the flow between stations rather than detailed track geometry.
Features
 * Dynamic Line Selection: Choose to display one or more subway lines for visualization.
 * Station Markers: Each station on the selected lines is clearly marked with a dot.
 * Animated Train Dots: Small, distinct dots representing trains move smoothly along the "compressed" routes between stations.
 * JSON-Driven Data: All subway line, station, and route path data is loaded from a local JSON file, allowing for easy updates and offline functionality.
 * Interactive Map: Pan and zoom capabilities to explore different parts of the subway network.
Technologies Used
 * React.js: The core JavaScript library for building the user interface.
 * Mapbox GL JS / Leaflet.js (or similar): For interactive map rendering. (Choose one and specify, e.g., "Leaflet.js for mapping components and geospatial data visualization.")
 * JavaScript (ES6+): For application logic and data manipulation.
 * HTML5 / CSS3: For structuring and styling the application.
 * JSON: For storing all geographical and simulation data.
Getting Started
Follow these steps to get your development environment set up and run the project locally.
Prerequisites
 * Node.js (LTS version recommended)
 * npm (comes with Node.js) or Yarn
Installation
 * Clone the repository:
   git clone https://github.com/frontend720/subway-line-visualizer.git
cd subway-line-visualizer

 * Install dependencies:
   npm install
# or
yarn install

Running the Application
To start the development server:
npm start
# or
yarn start

This will open the application in your default web browser at http://localhost:3000. The page will reload if you make edits.
Data Structure (src/data/subway_data.json)
The application relies on a subway_data.json file (typically located in src/data/). This file contains all the necessary information for lines, stations, and simulated train movements.
A simplified example of the expected JSON structure:
{
  "lines": [
    {
      "id": "A",
      "name": "A Line",
      "color": "#283593", // Hex color for the line visualization
      "stations": [
        { "id": "A01", "name": "Station A", "lat": 40.000, "lon": -74.000 },
        { "id": "A02", "name": "Station B", "lat": 40.001, "lon": -74.001 }
        // ... more stations ...
      ],
      "route_path": [ // Simplified coordinates for drawing the line path
        [40.000, -74.000],
        [40.0005, -74.0005],
        [40.001, -74.001]
        // ... more path points ...
      ]
    }
    // ... other lines ...
  ],
  "simulated_trains": [
    {
      "train_id": "A-express-01",
      "line_id": "A",
      "current_station_idx": 0, // Index in the 'stations' array
      "next_station_idx": 1,
      "progress_along_segment": 0.0, // 0.0 (start) to 1.0 (end)
      "direction": "north", // or "south", "east", "west"
      "speed_multiplier": 1.0, // Adjust simulation speed
      "dwell_time_ms": 5000 // Time spent at a station in milliseconds
    }
    // ... more simulated trains ...
  ]
}

Note: You will need to populate this JSON file with actual NYC subway data or generate it.
Project Structure (Proposed)
subway-line-visualizer/
├── public/
│   └── index.html
├── src/
│   ├── App.js                 # Main application component
│   ├── index.js               # Entry point for React app
│   ├── index.css              # Global styles
│   ├── components/
│   │   ├── MapComponent.js    # Handles map rendering and logic
│   │   ├── LineSelector.js    # Component for choosing lines
│   │   └── TrainDot.js        # Component for a single animated train dot
│   ├── data/
│   │   └── subway_data.json   # Your JSON data file
│   ├── utils/
│   │   └── geoUtils.js        # Helper functions for geospatial calculations
│   └── hooks/
│       └── useTrainSimulation.js # Custom hook for animation logic
└── README.md

Contributing
Contributions are welcome! If you have suggestions for improvements, new features, or bug fixes, please feel free to:
 * Fork the repository.
 * Create a new branch (git checkout -b feature/your-feature-name).
 * Make your changes.
 * Commit your changes (git commit -m 'Add new feature').
 * Push to the branch (git push origin feature/your-feature-name).
 * Open a Pull Request.
License
This project is open-source and available under the MIT License.
