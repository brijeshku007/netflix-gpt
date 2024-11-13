import React, { useState ,useEffect} from 'react'; 
import { useDispatch } from 'react-redux';
import { changeLangugae } from '../utils/configSlice';
function Dropdown({names}) { 
const[option1,option2,option3]=names
const dispatch=useDispatch();

 
 const [selectedValue, setSelectedValue] = useState('Hot & New'); 
const handleChange = (event) => {
 setSelectedValue(event.target.value);
 dispatch(changeLangugae(event.target.value))
//  console.log(event.target.value)
 };


return (
  <select className='  rounded-md text-white bg-black ' 
  value={selectedValue}
  onChange={handleChange}
  >
  {names.map((x) => (
  <option key={x.name} value={x.identifier} >
  {x.name}
  </option>
  ))}
  </select>
  );
 }
// }
export default Dropdown;