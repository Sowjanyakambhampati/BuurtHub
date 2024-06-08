import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CitySelection() {
  const [selectCity, setSelectCity] = useState('');
  const navigate = useNavigate();

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
        <select id="city-select" name="city-select" onChange={handleSelectCity}>
          <option value="select">Select your city</option>
          <option value="Amsterdam">Amsterdam</option>
          <option value="Den-Haag">Den Haag</option>
          <option value="Dordrecht">Dordrecht</option>
          <option value="Groningen">Groningen</option>
          <option value="Haarlem">Haarlem</option>
          <option value="Hoofddorp">Hoofddorp</option>
          <option value="Leiden">Leiden</option>
          <option value="Nijmegen">Nijmegen</option>
          <option value="Rotterdam">Rotterdam</option>
          <option value="Utrecht">Utrecht</option>
        </select>
      </div>
      {selectCity && <p>You selected: {selectCity}</p>}
    </div>
  );
}

export default CitySelection;
