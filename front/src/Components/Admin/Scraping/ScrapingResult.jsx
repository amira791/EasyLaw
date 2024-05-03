import React, { useState } from 'react';
import './ScrapingResult.css';
import FooterAdmin from '../../Footer/FooterAdmin';
import TitleBar from '../../TitleBar/TitleBar';
import LogoAdmin from '../../LOGO/LogoAdmin';

import '@react-pdf-viewer/core/lib/styles/index.css';
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import { pdfjs } from 'react-pdf';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { Container } from 'semantic-ui-react';
import PdfContent from './PdfContent';

function ScrapingResult() {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const [activeButton, setActiveButton] = useState(0); //  le bouton actif

    const handleButtonClick = (index) => {
        setActiveButton(index); // Mettre à jour le bouton actif
    };

    return (
        <>
            <LogoAdmin title="صفحة الاشراف "/>
            <TitleBar title="ادارة المحتوى القانوني"/>
            <div className='scraping-result-container'>
                <h2>(Scraping) كشط النصوص القانونية </h2>
               <PdfContent/>

                <div className='scraping-result-btn'>
                    <button className={activeButton === 0 ? 'active' : ''} onClick={() => handleButtonClick(0)}>اشعار المتابعين</button>
                    <button className={activeButton === 1 ? 'active' : ''} onClick={() => handleButtonClick(1)}>تصنيف المحتوى</button>
                    <button className={activeButton === 2 ? 'active' : ''} onClick={() => handleButtonClick(2)}>فهرسة المحتوى</button>
                </div>
            </div>
            <FooterAdmin/>
        </>
    );
}

export default ScrapingResult;
