import React, { useState } from "react";

const unitCategories = {
  Length: {
    units: ["millimeters", "centimeters", "meters", "kilometers", "inches", "feet", "miles"],
    convert: (value, from, to) => {
      const factors = {
        millimeters: 1000,
        centimeters: 100,
        meters: 1,
        kilometers: 0.001,
        inches: 39.3701,
        feet: 3.28084,
        miles: 0.000621371,
      };
      return (value / factors[from]) * factors[to];
    },
  },

  Weight: {
    units: ["grams", "kilograms", "pounds", "ounces"],
    convert: (value, from, to) => {
      const factors = {
        grams: 1000,
        kilograms: 1,
        pounds: 2.20462,
        ounces: 35.274,
      };
      return (value / factors[from]) * factors[to];
    },
  },

  Temperature: {
    units: ["Celsius", "Fahrenheit", "Kelvin"],
    convert: (value, from, to) => {
      if (from === to) return value;
      if (from === "Celsius")
        return to === "Fahrenheit" ? value * 9/5 + 32 : value + 273.15;
      if (from === "Fahrenheit")
        return to === "Celsius" ? (value - 32) * 5/9 : (value - 32) * 5/9 + 273.15;
      if (from === "Kelvin")
        return to === "Celsius" ? value - 273.15 : (value - 273.15) * 9/5 + 32;
    },
  },
};

function Unit() {
  const [category, setCategory] = useState("Length");
  const [fromUnit, setFromUnit] = useState("meters");
  const [toUnit, setToUnit] = useState("feet");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  const handleConvert = () => {
    if (value === "" || isNaN(value)) {
      setResult("Please enter a valid number");
      return;
    }
    const converter = unitCategories[category];
    const converted = converter.convert(parseFloat(value), fromUnit, toUnit);
    setResult(converted.toFixed(4));
  };

  const units = unitCategories[category].units;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">Unit Converter</h1>

        {/* Category Selection */}
        <label className="block mb-2 font-medium text-gray-700">Category</label>
        <select
          className="w-full border rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setFromUnit(unitCategories[e.target.value].units[0]);
            setToUnit(unitCategories[e.target.value].units[1]);
          }}
        >
          {Object.keys(unitCategories).map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        {/* From and To Selectors */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1">
            <label className="block mb-2 font-medium text-gray-700">From</label>
            <select
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
            >
              {units.map((u) => (
                <option key={u}>{u}</option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block mb-2 font-medium text-gray-700">To</label>
            <select
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
            >
              {units.map((u) => (
                <option key={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Value Input */}
        <label className="block mb-2 font-medium text-gray-700">Value</label>
        <input
          type="number"
          className="w-full border rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter a value..."
        />

        {/* Convert Button */}
        <button
          onClick={handleConvert}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-all font-semibold"
        >
          Convert
        </button>

        {/* Result Display */}
        {result && (
          <div className="mt-4 text-center text-lg font-semibold text-gray-800">
            Result:{" "}
            <span className="text-indigo-600">
              {result} {isNaN(result) ? "" : toUnit}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Unit;
