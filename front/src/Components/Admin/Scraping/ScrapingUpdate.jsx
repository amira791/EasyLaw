import React, { useState } from 'react';
import LogoModerateur from '../../LOGO/LogoModerateur';
import TitleBar from '../../TitleBar/TitleBar';
import FooterAdmin from '../../Footer/FooterAdmin';
import './Scraping.css';
import { Link } from 'react-router-dom';

function ScrapingUpdate() {
  const generateFormattedText = () => {
    return `
      <h5>مرسوم ممضي في 25 ديسمبر 1975</h5>
      <p>وزارة الداخلية</p>
      <p>الجريدة الرسمية عدد 1 مؤرخة في 02 يناير 1976، الصفحة 3</p>
      <p>يتضمن إنهاء مهام مديرين بالمجالس التنفيذية للولايات.</p>

      <h5>مرسوم ممضي في 25 ديسمبر 1975</h5>
      <p>وزارة الداخلية</p>
      <p>الجريدة الرسمية عدد 1 مؤرخة في 02 يناير 1976، الصفحة 3</p>
      <p>يتضمن إنهاء مهام مديرين بالمجالس التنفيذية للولايات.</p>
    `;
  };

  const [formData, setFormData] = useState({
    type: 'ABC',
    number: '',
    source: '',
    officialYear: '',
    issueNumber: '',
    signingDate: '',
    publicationDate: '',
    fullText: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulaire soumis avec les données :', formData);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      type: '',
      number: '',
      source: '',
      officialYear: '',
      issueNumber: '',
      signingDate: '',
      publicationDate: '',
      fullText: '',
    });
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
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="مرسوم"
            />
          </label>
          <label className="scraping_lable">
            رقم
            <input
              className="scraping_input"
              type="text"
              name="number"
              value={formData.number}
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
              placeholder="وزارة الخارجية"
            />
          </label>
        </div>

        <input
          className="scraping_inputsect2"
          type="text"
          name="fullText"
          value={formData.fullText}
          onChange={handleChange}
          placeholder="يتضمن إنهاء مهام مديرين بالمجالس التنفيذية للولايات."
        />

        <div className="scraping_updateContainer">
          <div className="scraping_updateSection2">
            <label className="scraping_lable1">
              الجريدة الرسمية لسنة
              <input
                style={{ width: '160px' }}
                className="scraping_input"
                type="text"
                name="officialYear"
                value={formData.officialYear}
                onChange={handleChange}
                placeholder="2024"
              />
            </label>
            <label className="scraping_lable1">
              العدد
              <input
                style={{ width: '100px' }}
                className="scraping_input"
                type="text"
                name="issueNumber"
                value={formData.issueNumber}
                onChange={handleChange}
                placeholder="23"
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
                name="signingDate"
                value={formData.signingDate}
                onChange={handleChange}
              />
            </label>
            <label className="scraping_lable1">
              تاريخ النشر
              <input
                style={{ width: '225px' }}
                className="scraping_input"
                type="date"
                name="publicationDate"
                value={formData.publicationDate}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="scraping_updateSection2">
            <label className="scraping_lable2">
              النص الكامل
              <div
                className="formatted-text"
                dangerouslySetInnerHTML={{ __html: generateFormattedText() }}
              />
            </label>
          </div>
        </div>
        <h5 style={{textAlign:'right',marginTop:'0',paddingTop:'0',color:'#374957'}}
        >هل يعدل نصا قانونيا اخر؟ إن كان كذلك  يرجى ادخاله.</h5>

<div className="scraping_update_btn scraping_update_button">
<button className="update_btn emptybtn" type="button" onClick={resetForm}>
          النص
          </button>
          
          <button className="update_btn" type="button" onClick={resetForm}>
          يلغي
          </button>
          <Link to="/" className="update_btn fullbtn"> <button type="submit">
          اختر النص المعدل
          </button></Link>
          
        </div>


        <div className="scraping_update_button">
          <button className="update_btn" type="submit">
            حفظ التعديلات
          </button>
          <button className="update_btn" type="button" onClick={resetForm}>
            إلغاء التعديلات
          </button>
        </div>
      </form>
      <FooterAdmin />
    </>
  );
}

export default ScrapingUpdate;
