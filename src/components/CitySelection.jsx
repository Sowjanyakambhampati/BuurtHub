import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CitySelection() {
    const [cities, setCities] = useState([]);
    const [selectCity, setSelectCity] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://community-forum-backend.adaptable.app/city')
            .then(response => {
                console.log("Cities List :: " + response.data);
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
        <div className="text-center">
            <div className="mb-4">
                <label htmlFor="city-select" className="block text-lg font-semibold mb-2">Select Your City</label>
                <select
                    id="city-select"
                    name="city-select"
                    className="select-style w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    onChange={handleSelectCity}
                >
                    <option value="">Select your city</option>
                    {cities.map(city => (
                        <option key={city._id} value={city.cityname}>{city.cityname}</option>
                    ))}
                </select>
            </div>
            {selectCity && <p className="text-lg">You selected: {selectCity}</p>}
        </div>
    );
}

export default CitySelection;
