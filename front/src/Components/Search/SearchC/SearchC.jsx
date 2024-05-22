import React, { useState, useEffect } from 'react';
import '../SearchResult/SearchResult.css';
import { Link } from 'react-router-dom';

function convertirDateEnArabe(dateString) {
  const date = new Date(dateString);
  const jour = date.getDate();
  const mois = date.getMonth() + 1;
  const annee = date.getFullYear();
  const moisEnArabe = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];
  const moisArabe = moisEnArabe[mois - 1];
  return `${jour} ${moisArabe} ${annee}`;
}

const SearchC = ({ result }) => {
  const [showFullText, setShowFullText] = useState({});

  return (
    <div key={result.id_text} className="searchResult-item">
      <h2>
        <span dangerouslySetInnerHTML={{ __html: result.type_text }} /> {result.jt_number} ممضي في {convertirDateEnArabe(result.signature_date)}
      </h2>
      <p><span dangerouslySetInnerHTML={{ __html: result.source }} /></p>
      <p>الجريدة الرسمية في {convertirDateEnArabe(result.publication_date)}</p>
      <p dangerouslySetInnerHTML={{ __html: result.description }} />
      <p>
        {showFullText[result.id_text] ? (
          <span dangerouslySetInnerHTML={{ __html: result.text_file_content}} />
        ) : (
          <span dangerouslySetInnerHTML={{ __html: result.truncated_text_file_content}} />
        )}
      </p>
      <Link to={`http://127.0.0.1:8888/data_collection/details?official_journal_year=${result.official_journal_year}&official_journal_number=${result.official_journal_number}&official_journal_page=${result.official_journal_page}#page=${result.real_page}`} target="_blank">التفاصيل</Link>
      {result.adjustments.map(adjustment => (
        <div key={adjustment.adjusting_text.id_text} className="adjustment-item">
          {adjustment.adjusting_text.adjusted_texts.length > 0 && (
            <div>
              <p style={{ fontWeight: 'bold' }}>{adjustment.adjusting_text.adjusted_texts[0].adjustment_type}</p>
              <div className="adjustment-item1">
                <h5 style={{ fontWeight: 'bold', color: '#1D8B8C' }}>
                  {adjustment.adjusting_text.type_text} {adjustment.adjusting_text.jt_number} ممضي في {convertirDateEnArabe(adjustment.adjusting_text.signature_date)}
                </h5>
                <p>{adjustment.adjusting_text.source}</p>
                <p>الجريدة الرسمية في {convertirDateEnArabe(adjustment.adjusting_text.publication_date)}</p>
                <p>{adjustment.adjusting_text.description}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SearchC;
