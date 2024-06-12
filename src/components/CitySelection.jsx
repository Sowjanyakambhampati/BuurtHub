// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function CitySelection() {
//   const [selectCity, setSelectCity] = useState('');
//   const navigate = useNavigate();

//   const handleSelectCity = (event) => {
//     const selectedCity = event.target.value;
//     setSelectCity(selectedCity);
//     if (selectedCity) {
//       navigate(`/usercitypage/${selectedCity}`);
//     }
//   };

//   return (
//     <div>
//       <div className="control">
//         <label htmlFor="city-select"></label>
//         <select id="city-select" name="city-select" onChange={handleSelectCity}>
//           <option value="select">Select your city</option>
//           <option value="Amsterdam">Amsterdam</option>
//           <option value="Den-Haag">Den Haag</option>
//           <option value="Gieten">Gieten</option>
//           <option value="Groningen">Groningen</option>
//           <option value="Haarlem">Haarlem</option>
//           <option value="Hoofddorp">Hoofddorp</option>
//           <option value="Leiden">Leiden</option>
//           <option value="Nijmegen">Nijmegen</option>
//           <option value="Rotterdam">Rotterdam</option>
//           <option value="Utrecht">Utrecht</option>
//         </select>
//       </div>
//       {selectCity && <p>You selected: {selectCity}</p>}
//     </div>
//   );
// }

// export default CitySelection;
// components/CitySelector.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function CitySelection() {
    const [cities, setCities] = useState([]);
    const [selectCity, setSelectCity] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:5005/city')
            .then(response => {
              console.log("Cities List :: " + response.data)
                setCities(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the cities!', error);
            });
    }, []);
    const handleSelectCity = (event) => {
        const selectedCity = event.target.value;
        setSelectCity(selectedCity);
        if (selectedCity) {
            navigate(`/usercitypage/${selectedCity}`);
        }
    };
    return (
        <div>
            <div className="control">
                <label htmlFor="city-select"></label>
                <select id="city-select" name="city-select" className="select-style" onChange={handleSelectCity}>
                    <option value="">Select your city</option>
                    {cities.map(city => (
                        <option key={city._id} value={city.cityname}>{city.cityname}</option>
                    ))}
                </select>
            </div>
            {selectCity && <p>You selected: {selectCity}</p>}
        </div>
    );
}
export default CitySelection;