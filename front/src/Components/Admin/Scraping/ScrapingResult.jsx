import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ScrapingResult.css';
import FooterAdmin from '../../Footer/FooterAdmin';
import TitleBar from '../../TitleBar/TitleBar';
import LogoAdmin from '../../LOGO/LogoAdmin';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';

import '@react-pdf-viewer/core/lib/styles/index.css';
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { Link, useLocation } from 'react-router-dom';

function ScrapingResult() {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const [activeButton, setActiveButton] = useState(0);
    const [results, setResults] = useState([]);
    const [jts, setJts] = useState([])
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.results) {
            setResults(location.state.results);
            axios.get(`http://localhost:8000/data_collection/juridical_texts/${location.state.results.id}/`)
                .then(response => {
                    // Update state with the fetched data
                    setJts(response.data); // Assuming response.data is an array of objects
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [location.state]);

    const handleButtonClick = (index) => {
        setActiveButton(index);
    };

    return (
        <>
            <LogoAdmin title="صفحة الاشراف "/>
            <TitleBar title="ادارة المحتوى القانوني"/>
            <div className='display_scrapingRslt'>
                <div className='scraping-result-container'>
                    <h2>نتائج  استخراج النصوص القانونية (Scraping)  </h2>
                    <div style={{width:'100%',direction:'rtl'}}>
                        <select
                           style={{margin:'2%'}}
                           id="year"
                           className='select_item'
                        >
                            <option value="">نوع النص</option>
                        </select>
                    </div>
                </div>

                <div>
                    {jts.map((item, index) => (
                        <div key={index} className="searchResult-item">
                            <h2>{item.type_text}</h2>
                            <p>{item.source}</p>
                            <p>الجريدة الرسمية عدد {item.official_journal.number} مؤرخة في {item.publication_date}، الصفحة {item.official_journal_page}</p>
                            <p>{item.description}</p>
                            <div>
                            </div>
                            <Link to={`/scrapingupdate/${item.id_text}`} target="_blank" className='detail_Link'>
                                التعديل على النص
                                <EditNoteOutlinedIcon sx={{marginRight:'3%'}}/>
                            </Link>
                        </div>
                    ))}
                </div>
                <button className='notify_user'>اشعار المتابعين</button>
            </div>
            <FooterAdmin/>
        </>
    );
}

export default ScrapingResult;
