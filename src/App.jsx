import React, { useState, useRef, useEffect } from "react";
import {
  Download,
  Info,
  Palette,
  Upload,
  RotateCcw,
  Loader,
} from "lucide-react";
import "./App.css"; // Import your new stylesheet

const PaintVisualizer = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [brightness, setBrightness] = useState(100);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const paintColors = [
    // ... (Your paintColors array remains the same)
    // Whites & Neutrals
    {
      name: "Swiss Coffee",
      hex: "#F5F1E8",
      code: "OC-45",
      brand: "Benjamin Moore",
      family: "Warm White",
    },
    {
      name: "Chantilly Lace",
      hex: "#F7F4F1",
      code: "OC-65",
      brand: "Benjamin Moore",
      family: "Pure White",
    },
    {
      name: "Simply White",
      hex: "#F4F0EA",
      code: "OC-117",
      brand: "Benjamin Moore",
      family: "Warm White",
    },
    {
      name: "Alabaster",
      hex: "#EDEAE0",
      code: "SW 7008",
      brand: "Sherwin-Williams",
      family: "Warm White",
    },
    {
      name: "Snowbound",
      hex: "#F2F0EB",
      code: "SW 7004",
      brand: "Sherwin-Williams",
      family: "Cool White",
    },

    // Warm Grays
    {
      name: "Agreeable Gray",
      hex: "#D1C7B8",
      code: "SW 7029",
      brand: "Sherwin-Williams",
      family: "Warm Gray",
    },
    {
      name: "Repose Gray",
      hex: "#C9C4BB",
      code: "SW 7015",
      brand: "Sherwin-Williams",
      family: "Gray",
    },
    {
      name: "Edgecomb Gray",
      hex: "#D6CFC2",
      code: "HC-173",
      brand: "Benjamin Moore",
      family: "Warm Gray",
    },
    {
      name: "Revere Pewter",
      hex: "#C7BBA9",
      code: "HC-172",
      brand: "Benjamin Moore",
      family: "Greige",
    },
    {
      name: "Balboa Mist",
      hex: "#D6CFBE",
      code: "OC-27",
      brand: "Benjamin Moore",
      family: "Warm Gray",
    },

    // Cool Grays
    {
      name: "Stonington Gray",
      hex: "#B8BAAF",
      code: "HC-170",
      brand: "Benjamin Moore",
      family: "Cool Gray",
    },
    {
      name: "Gray Owl",
      hex: "#C9CCC0",
      code: "OC-52",
      brand: "Benjamin Moore",
      family: "Cool Gray",
    },
    {
      name: "Collonade Gray",
      hex: "#C2C1B5",
      code: "SW 7641",
      brand: "Sherwin-Williams",
      family: "Cool Gray",
    },
    {
      name: "Mindful Gray",
      hex: "#B5B4A7",
      code: "SW 7016",
      brand: "Sherwin-Williams",
      family: "Warm Gray",
    },

    // Beiges & Tans
    {
      name: "Accessible Beige",
      hex: "#D6C9BC",
      code: "SW 7036",
      brand: "Sherwin-Williams",
      family: "Beige",
    },
    {
      name: "Kilim Beige",
      hex: "#CEB99E",
      code: "SW 6106",
      brand: "Sherwin-Williams",
      family: "Tan",
    },
    {
      name: "Manchester Tan",
      hex: "#C9A876",
      code: "HC-81",
      brand: "Benjamin Moore",
      family: "Tan",
    },
    {
      name: "Shaker Beige",
      hex: "#D5C8B0",
      code: "HC-45",
      brand: "Benjamin Moore",
      family: "Beige",
    },

    // Greiges
    {
      name: "Classic Gray",
      hex: "#BFB8AA",
      code: "OC-23",
      brand: "Benjamin Moore",
      family: "Greige",
    },
    {
      name: "Pale Oak",
      hex: "#D8D3C5",
      code: "OC-20",
      brand: "Benjamin Moore",
      family: "Greige",
    },
    {
      name: "Worldly Gray",
      hex: "#B9B5A7",
      code: "SW 7043",
      brand: "Sherwin-Williams",
      family: "Greige",
    },

    // Blues
    {
      name: "Hale Navy",
      hex: "#384855",
      code: "HC-154",
      brand: "Benjamin Moore",
      family: "Navy Blue",
    },
    {
      name: "Van Deusen Blue",
      hex: "#576674",
      code: "HC-156",
      brand: "Benjamin Moore",
      family: "Blue",
    },
    {
      name: "Palladian Blue",
      hex: "#A5C4C3",
      code: "HC-144",
      brand: "Benjamin Moore",
      family: "Light Blue",
    },
    {
      name: "Breath of Fresh Air",
      hex: "#C8DFE0",
      code: "SW 6830",
      brand: "Sherwin-Williams",
      family: "Light Blue",
    },
    {
      name: "Sea Salt",
      hex: "#CFD8D4",
      code: "SW 6204",
      brand: "Sherwin-Williams",
      family: "Blue-Green",
    },
    {
      name: "Rainwashed",
      hex: "#C2D4CE",
      code: "SW 6211",
      brand: "Sherwin-Williams",
      family: "Blue-Green",
    },
    {
      name: "Misty",
      hex: "#C5D5D9",
      code: "SW 6232",
      brand: "Sherwin-Williams",
      family: "Gray-Blue",
    },

    // Greens
    {
      name: "Clary Sage",
      hex: "#B5BAA8",
      code: "HC-178",
      brand: "Benjamin Moore",
      family: "Sage Green",
    },
    {
      name: "October Mist",
      hex: "#CBD1BC",
      code: "1495",
      brand: "Benjamin Moore",
      family: "Sage Green",
    },
    {
      name: "Saybrook Sage",
      hex: "#A7AC96",
      code: "HC-114",
      brand: "Benjamin Moore",
      family: "Sage Green",
    },
    {
      name: "Evergreen Fog",
      hex: "#8B8C7A",
      code: "SW 9130",
      brand: "Sherwin-Williams",
      family: "Green",
    },
    {
      name: "Retreat",
      hex: "#BEC9B5",
      code: "SW 6207",
      brand: "Sherwin-Williams",
      family: "Soft Green",
    },

    // Warm Tones
    {
      name: "Pale Honey",
      hex: "#E5D5B8",
      code: "2024-60",
      brand: "Benjamin Moore",
      family: "Warm Cream",
    },
    {
      name: "Butter Cream",
      hex: "#F5E8CE",
      code: "2025-60",
      brand: "Benjamin Moore",
      family: "Cream",
    },
    {
      name: "Navajo White",
      hex: "#E8D5B7",
      code: "SW 6126",
      brand: "Sherwin-Williams",
      family: "Warm Beige",
    },

    // Darker Accents
    {
      name: "Kendall Charcoal",
      hex: "#5A5D57",
      code: "HC-166",
      brand: "Benjamin Moore",
      family: "Charcoal",
    },
    {
      name: "Iron Ore",
      hex: "#4C4947",
      code: "SW 7069",
      brand: "Sherwin-Williams",
      family: "Dark Gray",
    },
    {
      name: "Tricorn Black",
      hex: "#2E2E2C",
      code: "SW 6258",
      brand: "Sherwin-Williams",
      family: "Black",
    },
    {
      name: "Chelsea Gray",
      hex: "#827F76",
      code: "HC-168",
      brand: "Benjamin Moore",
      family: "Dark Gray",
    },

    // Warm Accent Colors
    {
      name: "Caliente",
      hex: "#AF392F",
      code: "AF-290",
      brand: "Benjamin Moore",
      family: "Red",
    },
    {
      name: "Tarrytown Green",
      hex: "#6D7B67",
      code: "HC-134",
      brand: "Benjamin Moore",
      family: "Green",
    },
    {
      name: "November Rain",
      hex: "#9BA093",
      code: "2142-60",
      brand: "Benjamin Moore",
      family: "Gray-Green",
    },

    // Soft Pastels
    {
      name: "Pink Damask",
      hex: "#E8D5D1",
      code: "890",
      brand: "Benjamin Moore",
      family: "Pink",
    },
    {
      name: "Ballet White",
      hex: "#F5E6DD",
      code: "OC-9",
      brand: "Benjamin Moore",
      family: "Blush White",
    },
    {
      name: "Quiet Moments",
      hex: "#C5D5DB",
      code: "1563",
      brand: "Benjamin Moore",
      family: "Blue-Gray",
    },
    {
      name: "Whispering Spring",
      hex: "#D8E5DD",
      code: "2136-70",
      brand: "Benjamin Moore",
      family: "Soft Green",
    },

    // Contemporary Neutrals
    {
      name: "Gray Cashmere",
      hex: "#A69C92",
      code: "2138-60",
      brand: "Benjamin Moore",
      family: "Taupe",
    },
    {
      name: "Elephant Tusk",
      hex: "#E1D9CE",
      code: "OC-8",
      brand: "Benjamin Moore",
      family: "Neutral",
    },
    {
      name: "Natural Cream",
      hex: "#F0E6D2",
      code: "OC-14",
      brand: "Benjamin Moore",
      family: "Cream",
    },
    {
      name: "Silver Satin",
      hex: "#C9C5BC",
      code: "OC-26",
      brand: "Benjamin Moore",
      family: "Gray",
    },
  ];

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const applyColorToBackground = (color) => {
    if (!uploadedImage) return;

    setIsLoading(true);

    setTimeout(() => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const rgb = hexToRgb(color.hex);
        const brightnessMultiplier = brightness / 100;

        for (let i = 0; i < data.length; i += 4) {
          const alpha = data[i + 3];
          if (alpha < 255) {
            data[i] = rgb.r * brightnessMultiplier;
            data[i + 1] = rgb.g * brightnessMultiplier;
            data[i + 2] = rgb.b * brightnessMultiplier;
            data[i + 3] = 255;
          } else {
            data[i] *= brightnessMultiplier;
            data[i + 1] *= brightnessMultiplier;
            data[i + 2] *= brightnessMultiplier;
          }
        }

        ctx.putImageData(imageData, 0, 0);
        setProcessedImage(canvas.toDataURL());
        setIsLoading(false);
      };

      img.src = uploadedImage;
    }, 50);
  };

  useEffect(() => {
    if (selectedColor && uploadedImage) {
      applyColorToBackground(selectedColor);
    }
  }, [selectedColor, uploadedImage, brightness]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
        setProcessedImage(null);
        if (selectedColor) {
          applyColorToBackground(selectedColor);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const resetImage = () => {
    setSelectedColor(null);
    setProcessedImage(null);
    setBrightness(100);
  };

  const downloadImage = () => {
    if (!processedImage) return;
    const link = document.createElement("a");
    link.download = `paint-preview-${
      selectedColor?.name.replace(/\s+/g, "-") || "original"
    }.png`;
    link.href = processedImage;
    link.click();
  };

  return (
    <div>
      <header className="header">
        <div className="header-content">
          <div className="header-title">
            <Palette />
            <div>
              <h1>Paint Visualizer</h1>
              <p>Visualize your perfect wall color</p>
            </div>
          </div>
          <div className="header-info">
            <Info />
            <span>Professional Color Selection Tool</span>
          </div>
        </div>
      </header>

      <main className="app-container">
        <div className="main-grid">
          <div className="main-content">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Preview</h2>
                <div className="button-group">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="button button-primary"
                  >
                    <Upload />
                    <span>Upload Room</span>
                  </button>
                  {selectedColor && (
                    <button
                      onClick={resetImage}
                      className="button button-secondary"
                    >
                      <RotateCcw />
                      <span>Reset</span>
                    </button>
                  )}
                  {processedImage && (
                    <button
                      onClick={downloadImage}
                      className="button button-success"
                    >
                      <Download />
                      <span>Download</span>
                    </button>
                  )}
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />

              <div className="preview-area">
                {isLoading && (
                  <div className="loading-overlay">
                    <Loader />
                  </div>
                )}
                {uploadedImage ? (
                  <img
                    src={processedImage || uploadedImage}
                    alt="Room preview"
                    className="preview-image"
                  />
                ) : (
                  <div className="upload-prompt">
                    <Upload />
                    <p>Upload your room image</p>
                    <p>PNG images with transparent backgrounds work best</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="sidebar">
            <div className="card palette-sidebar">
              <div className="card-header">
                <h2 className="card-title">Color Palette</h2>
              </div>
              <div className="palette-container">
                <div className="palette-grid">
                  {paintColors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => handleColorSelect(color)}
                      className={`color-swatch ${
                        selectedColor?.name === color.name ? "selected" : ""
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {selectedColor && (
          <div className="card color-details">
            <h3>Selected Color Details</h3>
            <div className="color-details-grid">
              <div>
                <div
                  className="color-preview"
                  style={{ backgroundColor: selectedColor.hex }}
                />
                <p>
                  <strong>Color Name:</strong> {selectedColor.name}
                </p>
                <p>
                  <strong>Brand:</strong> {selectedColor.brand}
                </p>
                <p>
                  <strong>Color Code:</strong> {selectedColor.code}
                </p>
              </div>
              <div>
                <h4>Purchase Information</h4>
                <p>
                  <strong>Hex Code:</strong> {selectedColor.hex}
                </p>
                <p>
                  <strong>Product Code:</strong> {selectedColor.code}
                </p>
                <p>
                  <strong>Color Family:</strong> {selectedColor.family}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PaintVisualizer;
