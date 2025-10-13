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
      className="px-3 py-2 md:px-4 md:py-2 lg:px-5 lg:py-2 xl:px-4 xl:py-2 text-sm md:text-base lg:text-base font-medium text-white bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 hover:bg-gray-700"
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
