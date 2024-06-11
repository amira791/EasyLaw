import React, { useState, useEffect } from 'react';
import ApiService from './ApiService'; // Adjust the path as needed
import './Jaraid.css'; // Create this CSS file for styling
import Logo from '../LOGO/Logo';
import NavBar from '../MainPage/NavBar/NavBar';
import Gpt from '../Search/GPT/Gpt';
import Footer from '../Footer/Footer';

const Jaraid = () => {
  const [data, setData] = useState({ years: [] });
  const [showYearsDropdown, setShowYearsDropdown] = useState(false);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [showNumbersDropdown, setShowNumbersDropdown] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(''); // Initialize with an empty string
  const [numbers, setNumbers] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]);
  const [selectedJournal, setSelectedJournal] = useState(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await ApiService.fetchFirstData('/years');
        console.log('Fetched data:', result);
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors as needed
      }
    };

    fetchDataAsync();
  }, []);

  const handleYearSelect = async (year) => {
    setSelectedYear(year);
    setShowNumbersDropdown(false);
    try {
      const numbersResponse = await ApiService.fetchSecondData(`/${year}/`);
      console.log('Fetched numbers:', numbersResponse);
      setNumbers(numbersResponse.number ?? []);
      setShowNumbersDropdown(true);
    } catch (error) {
      console.error('Error fetching numbers:', error);
      // Handle errors as needed
    }
  };

  const handleOpenPDF = (number) => {
    if (selectedYear) {
      setSelectedJournal({ year: selectedYear, number });
    } else {
      // Handle the case where year or number is not selected
      console.error('Year and number must be selected to open PDF.');
    }
  };

  return (
    <>
      <Logo />
      <NavBar />

      <div className='journal'>
        <label htmlFor="year-select">اختر السنة:</label>
        <select id="year-select" value={selectedYear} onChange={(e) => handleYearSelect(e.target.value)}>
          <option value="">اختر السنة</option>
          {data.years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <div className='disply_journaux'>

          <div className="scroll-container">
            {numbers.map((number) => (
              <div key={number} className="number-item" onClick={() => handleOpenPDF(number)}>
                الجريدة الرسمية رقم {number} سنة {selectedYear}
              </div>
            ))}
          </div>
          {selectedJournal && (
            <iframe
            src={`D:\\pdfs\\1962\\F1962001.p`}
            width="100%"
            height="500px"
            title={`Journal ${selectedJournal.number} - ${selectedJournal.year}`}
          />
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Jaraid;
