import React, { useState, useRef, useEffect } from "react";
import {
  Download,
  Info,
  Palette,
  Upload,
  RotateCcw,
  Loader,
} from "lucide-react";

const PaintVisualizer = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [brightness, setBrightness] = useState(100);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const paintColors = [
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

        // Draw original image
        ctx.drawImage(img, 0, 0);

        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Parse the selected color
        const rgb = hexToRgb(color.hex);
        const brightnessMultiplier = brightness / 100;

        // Apply color to transparent/background pixels
        for (let i = 0; i < data.length; i += 4) {
          const alpha = data[i + 3];

          // If pixel is not fully opaque, apply wall color
          if (alpha < 255) {
            data[i] = rgb.r * brightnessMultiplier; // R
            data[i + 1] = rgb.g * brightnessMultiplier; // G
            data[i + 2] = rgb.b * brightnessMultiplier; // B
            data[i + 3] = 255; // Full opacity for background
          } else {
            // For non-transparent pixels (furniture, objects), keep original
            // but apply subtle lighting adjustment
            data[i] = data[i] * brightnessMultiplier;
            data[i + 1] = data[i + 1] * brightnessMultiplier;
            data[i + 2] = data[i + 2] * brightnessMultiplier;
          }
        }

        // Put modified image data back
        ctx.putImageData(imageData, 0, 0);

        // Convert to data URL and set as processed image
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
        // If a color is already selected, apply it to the new image
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Palette className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Paint Visualizer
                </h1>
                <p className="text-sm text-gray-600">
                  Visualize your perfect wall color
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Info className="w-4 h-4" />
              <span>Professional Color Selection Tool</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Visualization Area */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Preview
                  </h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload Room</span>
                    </button>
                    {selectedColor && (
                      <button
                        onClick={resetImage}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Reset</span>
                      </button>
                    )}
                    {processedImage && (
                      <button
                        onClick={downloadImage}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Download className="w-4 h-4" />
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
                  className="hidden"
                />
              </div>

              <div className="relative aspect-video bg-gray-100">
                {isLoading && (
                  <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                    <Loader className="w-12 h-12 text-blue-600 animate-spin" />
                  </div>
                )}
                {uploadedImage ? (
                  <div className="relative w-full h-full flex items-center justify-center p-4">
                    <img
                      src={processedImage || uploadedImage}
                      alt="Room preview"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 text-lg font-medium">
                        Upload your room image
                      </p>
                      <p className="text-gray-400 text-sm mt-2">
                        PNG images with transparent backgrounds work best
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        The transparent area will become your wall color
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {selectedColor && uploadedImage && (
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lighting Adjustment (affects overall brightness)
                  </label>
                  <input
                    type="range"
                    min="60"
                    max="140"
                    value={brightness}
                    onChange={(e) => setBrightness(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Darker Lighting</span>
                    <span className="font-medium">{brightness}%</span>
                    <span>Brighter Lighting</span>
                  </div>
                </div>
              )}
            </div>

            {/* Instructions */}
            {!uploadedImage && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">
                  How to Use
                </h3>
                <ol className="space-y-2 text-blue-800">
                  <li className="flex items-start">
                    <span className="font-bold mr-2">1.</span>
                    <span>
                      Upload a PNG image of your room (transparent background
                      recommended)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">2.</span>
                    <span>
                      Click on any color from the palette to apply it to the
                      background
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">3.</span>
                    <span>
                      Adjust the lighting slider to match your room's natural
                      light
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">4.</span>
                    <span>
                      Download your preview and take the color code to the paint
                      store
                    </span>
                  </li>
                </ol>
              </div>
            )}

            {/* Color Details */}
            {selectedColor && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Selected Color Details
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div
                      className="w-full h-32 rounded-lg shadow-md mb-4 border-2 border-gray-200"
                      style={{ backgroundColor: selectedColor.hex }}
                    />
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">
                          Color Name:
                        </span>
                        <span className="text-gray-900 font-semibold">
                          {selectedColor.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">
                          Brand:
                        </span>
                        <span className="text-gray-900">
                          {selectedColor.brand}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">
                          Color Code:
                        </span>
                        <span className="text-gray-900 font-mono">
                          {selectedColor.code}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Purchase Information
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="font-medium text-blue-900 mb-1">
                          Hex Code
                        </p>
                        <p className="text-blue-700 font-mono">
                          {selectedColor.hex}
                        </p>
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="font-medium text-green-900 mb-1">
                          Product Code
                        </p>
                        <p className="text-green-700 font-mono">
                          {selectedColor.code}
                        </p>
                      </div>
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                        <p className="font-medium text-purple-900 mb-1">
                          Color Family
                        </p>
                        <p className="text-purple-700">
                          {selectedColor.family}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600">
                        <strong>Tip:</strong> Take this color code to your local
                        paint store or order online. Most major retailers can
                        match these colors.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Color Palette Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-4">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Color Palette
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Premium US Paint Colors
                </p>
              </div>

              <div className="p-4 max-h-[calc(100vh-12rem)] overflow-y-auto">
                <div className="grid grid-cols-3 gap-2">
                  {paintColors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => handleColorSelect(color)}
                      className={`group relative aspect-square rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg border-2 ${
                        selectedColor?.name === color.name
                          ? "ring-4 ring-blue-500 scale-105 border-blue-400"
                          : "border-gray-200"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 rounded-lg transition-opacity" />
                      {selectedColor?.name === color.name && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <div className="w-3 h-3 bg-blue-600 rounded-full" />
                          </div>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white text-xs p-1 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="truncate font-medium">{color.name}</p>
                        <p className="text-xs text-gray-300">{color.code}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaintVisualizer;
