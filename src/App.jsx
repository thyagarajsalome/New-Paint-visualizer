import React, { useState } from "react";
import { categorizedColors, paintColors } from "./colors.js";

const allRooms = [
  { name: "Living Hall", image: "/image/Living room.png" },
  { name: "Bedroom", image: "/image/Bedroom.png" },
  { name: "Kitchen", image: "/image/Kitchen.png" },
  { name: "Bathroom", image: "/image/Bathroom.png" },
];

const initialColor = paintColors.find((c) => c.name === "Hale Navy").hex;

function App() {
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [activeRoom, setActiveRoom] = useState(allRooms[0]);

  const handleRoomSelection = (roomName) => {
    const newRoom = allRooms.find((room) => room.name === roomName);
    setActiveRoom(newRoom);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-title">
          <div className="header-icon">
            <svg
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <h2 className="header-text">Paint Visualizer</h2>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="main-content-area">
        {/* Viewport/Rooms Display */}
        <main className="previews-container">
          <div className="room-container">
            <div
              className="room-preview"
              style={{ backgroundColor: selectedColor }}
            >
              <img
                src={activeRoom.image}
                alt={activeRoom.name}
                className="room-image"
              />
            </div>
            <p className="room-name">{activeRoom.name}</p>
          </div>
        </main>

        {/* Controls Panel */}
        <aside className="controls-panel">
          <div className="controls-wrapper">
            {/* Room Selection */}
            <div className="control-section room-selection">
              <h3 className="section-title">Select Room</h3>
              <div className="button-group">
                {allRooms.map((room) => (
                  <button
                    key={room.name}
                    onClick={() => handleRoomSelection(room.name)}
                    className={activeRoom.name === room.name ? "active" : ""}
                  >
                    {room.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette */}
            <div className="control-section color-palette-section">
              <h3 className="section-title">Color Palette</h3>
              <div className="palette-container">
                {Object.entries(categorizedColors).map(([category, colors]) => (
                  <div key={category} className="color-category">
                    <h4 className="category-title">{category}</h4>
                    <div className="palette-grid">
                      {colors.map((color) => (
                        <button
                          key={color.name}
                          title={color.name}
                          onClick={() => setSelectedColor(color.hex)}
                          className={`color-swatch ${
                            selectedColor === color.hex ? "selected" : ""
                          }`}
                          style={{ backgroundColor: color.hex }}
                          aria-label={`Select ${color.name}`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reset Button */}
            <div className="control-section reset-section">
              <h3 className="section-title">Start Over</h3>
              <button
                onClick={() => {
                  setSelectedColor(initialColor);
                  setActiveRoom(allRooms[0]);
                }}
                className="reset-button"
              >
                Reset
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default App;
