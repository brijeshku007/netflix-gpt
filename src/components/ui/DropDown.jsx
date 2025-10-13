import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../../store/configSlice";

function Dropdown({ names }) {
  const dispatch = useDispatch();
  const currentLanguage = useSelector((store) => store.config?.lang) || "en";

  const handleChange = (event) => {
    const newLanguage = event.target.value;
    dispatch(changeLanguage(newLanguage));
  };

  return (
    <select
      className="px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 text-sm md:text-base lg:text-lg font-medium text-white bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 hover:bg-gray-700"
      value={currentLanguage}
      onChange={handleChange}
      aria-label="Select Language"
    >
      {names.map((language) => (
        <option
          key={language.identifier}
          value={language.identifier}
          className="bg-gray-800 text-white"
        >
          {language.name}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;
