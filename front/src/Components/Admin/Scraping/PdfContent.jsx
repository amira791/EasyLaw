import React from 'react'
import './ScrapingResult.css'
import { Worker, Viewer } from '@react-pdf-viewer/core';

function PdfContent() {
  return (
    <>
     <div className='scraping-contentPDF'  style={{ height: '750px',}}>
                
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                    <Viewer fileUrl="./ProjetTDM.pdf" />
                </Worker>
                </div>
    </>
  )
}

export default PdfContent