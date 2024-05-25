import React, { useEffect, useState } from 'react';
import LogoModerateur from '../../LOGO/LogoModerateur';
import TitleBar from '../../TitleBar/TitleBar';
import FooterAdmin from '../../Footer/FooterAdmin';
import './Scraping.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function ScrapingUpdate() {
  const { id_text } = useParams();

  const [formData, setFormData] = useState({
    id_text: '',
    type_text: '',
    signature_date: '',
    publication_date: '',
    jt_number: '',
    source: '',
    official_journal: {
      year: '',
      number: ''
    },
    official_journal_page: '',
    description: '',
    extracted_text: '',
    intrest: null,
    scrapping: 1
  });

  const [save, setSave] = useState({
    id_text: '',
    type_text: '',
    signature_date: '',
    publication_date: '',
    jt_number: '',
    source: '',
    official_journal: {
      year: '',
      number: ''
    },
    official_journal_page: '',
    description: '',
    extracted_text: '',
    intrest: null,
    scrapping: 1
  });

  const [message, setMessage] = useState({ content: '', type: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8888/data_collection/getJT/${id_text}/`);
        const data = response.data;
        setFormData({
          id_text: data.id_text,
          type_text: data.type_text,
          signature_date: data.signature_date,
          publication_date: data.publication_date,
          jt_number: data.jt_number || '',
          source: data.source,
          official_journal: data.official_journal,
          official_journal_page: data.official_journal_page || '',
          description: data.description,
          extracted_text: data.extracted_text,
          intrest: data.intrest,
          scrapping: data.scrapping
        });
        setSave({
          id_text: data.id_text,
          type_text: data.type_text,
          signature_date: data.signature_date,
          publication_date: data.publication_date,
          jt_number: data.jt_number || '',
          source: data.source,
          official_journal: data.official_journal,
          official_journal_page: data.official_journal_page || '',
          description: data.description,
          extracted_text: data.extracted_text,
          intrest: data.intrest,
          scrapping: data.scrapping
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id_text]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOfficialJournalChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      official_journal: {
        ...prevFormData.official_journal,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8888/data_collection/updateJT/', formData);
      setMessage({ content: 'تم حفظ التعديلات بنجاح!', type: 'success' });
    } catch (error) {
      setMessage({ content: 'حدث خطأ أثناء حفظ التعديلات. حاول مرة أخرى.', type: 'error' });
    }
  };

  const resetForm = () => {
    setFormData({
      id_text: '',
      type_text: '',
      signature_date: '',
      publication_date: '',
      jt_number: '',
      source: '',
      official_journal: {
        year: '',
        number: ''
      },
      official_journal_page: '',
      description: '',
      extracted_text: '',
      intrest: null,
      scrapping: 1
    });
  };

  const cancelModifications = () => {
    setFormData(save);
  };

  return (
    <>
      <LogoModerateur title="صفحة الاشراف" />
      <TitleBar title="ادارة المحتوى القانوني" />
      <div className="moderateurMain-titre">
        <h3>تعديل النص القانوني</h3>
      </div>
      <form className="scraping_update" onSubmit={handleSubmit}>
        <div className="scraping_updateSection1">
          <label className="scraping_lable">
            نوع النص
            <input
              className="scraping_input"
              type="text"
              name="type_text"
              value={formData.type_text}
              onChange={handleChange}
              placeholder="مرسوم"
            />
          </label>
          <label className="scraping_lable">
            رقم
            <input
              className="scraping_input"
              type="text"
              name="jt_number"
              value={formData.jt_number}
              onChange={handleChange}
              placeholder="88-234"
            />
          </label>
          <label className="scraping_lable">
            المصدر
            <input
              className="scraping_input"
              type="text"
              name="source"
              value={formData.source}
              onChange={handleChange}
              placeholder="المصدر"
            />
          </label>
        </div>

        <input
          className="scraping_inputsect2"
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="الوصف"
        />

        <div className="scraping_updateContainer">
          <div className="scraping_updateSection2">
            <label className="scraping_lable1">
              الجريدة الرسمية لسنة
              <input
                style={{ width: '160px' }}
                className="scraping_input"
                type="text"
                name="year"
                value={formData.official_journal.year}
                onChange={handleOfficialJournalChange}
                placeholder="السنة"
              />
            </label>
            <label className="scraping_lable1">
              العدد
              <input
                style={{ width: '100px' }}
                className="scraping_input"
                type="text"
                name="number"
                value={formData.official_journal.number}
                onChange={handleOfficialJournalChange}
                placeholder=""
              />
            </label>
            <label className="scraping_lable1">
              الصفحة
              <input
                style={{ width: '100px' }}
                className="scraping_input"
                type="text"
                name="official_journal_page"
                value={formData.official_journal_page}
                onChange={handleChange}
                placeholder=""
              />
            </label>
          </div>

          <div className="scraping_updateSection2">
            <label className="scraping_lable1">
              تاريخ التوقيع
              <input
                style={{ width: '225px' }}
                className="scraping_input"
                type="date"
                name="signature_date"
                value={formData.signature_date}
                onChange={handleChange}
              />
            </label>
            <label className="scraping_lable1">
              تاريخ النشر
              <input
                style={{ width: '225px' }}
                className="scraping_input"
                type="date"
                name="publication_date"
                value={formData.publication_date}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="scraping_updateSection2">
            <label className="scraping_lable2">
              النص الكامل
              <textarea
                className="scraping_textarea"
                name="extracted_text"
                value={formData.extracted_text}
                onChange={handleChange}
                placeholder="النص الكامل"
                rows={6}
              />
            </label>
          </div>
        </div>
        <h5 style={{ textAlign: 'right', marginTop: '0', paddingTop: '0', color: '#374957' }}>
          هل يعدل نصا قانونيا اخر؟ إن كان كذلك  يرجى ادخاله.
        </h5>

        <div className="scraping_update_btn scraping_update_button">
          <label className="scraping_lable">
            النص
            <select
              className="scraping_input"
              type="text"
              name="type_text"
              value={formData.type_text}
              onChange={handleChange}
              placeholder="مرسوم"
            >
              <option value="">النص</option>
              <option value="يلغي">يلغي</option>
              <option value="يلغي">يلغي</option>
            </select>
          </label>
          <Link to="/" className="update_btn fullbtn">
            <button type="button">اختر النص المعدل</button>
          </Link>
        </div>

        {message.content && (
          <div className={`message ${message.type === 'success' ? 'success' : 'error'}`}>
            {message.content}
          </div>
        )}

        <div className="scraping_update_button">
          <button className="update_btn" type="submit">
            حفظ التعديلات
          </button>
          <button className="update_btn" type="button" onClick={cancelModifications}>
            إلغاء التعديلات
          </button>
        </div>
      </form>
      <FooterAdmin />
    </>
  );
}

export default ScrapingUpdate;
