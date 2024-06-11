import React, { useEffect, useState } from 'react';
import LogoModerateur from '../../LOGO/LogoModerateur';
import TitleBar from '../../TitleBar/TitleBar';
import FooterAdmin from '../../Footer/FooterAdmin';
import './Scraping.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import useSearch from '../../../Hooks/useSearch';
import { DeleteIcon } from '@chakra-ui/icons';

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
        const response = await axios.get(`http://localhost:8000/data_collection/getJT/${id_text}/`);
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

  const [ajusted_jt, setAdjusted_jt] = useState({
    id_text: "",
    description: "",
    type_text: "",
    signature_date: "",
    publication_date: "",
    jt_number: "",
    source: "",
    official_journal_year: "",
    official_journal_number: ""
  });
  const [selectedAjustingOption, setSelectedAdjustingOption] = useState("")
  const [ajustedTexts, setAdjustedTexts] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/data_collection/adjustments/${id_text}/`);
        const data = response.data;
        console.log(data);
        setAdjustedTexts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSelectedAjustedJT = async (item) => {
    setAdjusted_jt(item);
    closeModal();
    const adjustement = {
      adjusted_num: item.id_text,
      adjusting_num: id_text,
      adjustment_type: selectedAjustingOption
    }
    try {
      await axios.post('http://localhost:8000/data_collection/createAdjust/', adjustement);
      setMessage({ content: 'تم حفظ التعديلات بنجاح!', type: 'success' });
      setAdjustedTexts([item, ...ajustedTexts])
      console.log([item, ...ajustedTexts])
    } catch (error) {
      setMessage({ content: 'حدث خطأ أثناء حفظ التعديلات. حاول مرة أخرى.', type: 'error' });
    }
  }

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
    console.log('Form Data:', formData);  // Print formData to the console
    try {
      await axios.post('http://localhost:8000/data_collection/updateJT/', formData);
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

  const [filterData, setFilterData] = useState({
    q: '',
    year: '',
    source: '',
    type: ''
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterData({
      ...filterData,
      [name]: value,
    });
  };

  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const applyFilters = async () => {
    // Implement filter logic here
    console.log('Filters applied:', filterData);
    
    const queryParams = filterData
    try {
      const response = await axios.get(
        `http://localhost:8000/data_collection/adjusted_search`,
        {
          headers: { 'Authorization': `Token ${localStorage.getItem('access_token')}` },
          params: queryParams,
        }
      );
      console.log('Résultats de la recherche:', response.data);
      setResults(response.data.results)
    } catch (error) {
      if (error.response?.status === 403) {
        console.error('You are not allowed to search.');
        navigate("/subscrib");
      } else {
        console.error('Erreur lors de la recherche:', error);
      }
    }
  };



  const {years, sources, types} = useSearch()

  const adjustment_values = [
    {option : "يستدرك", value: "استدراك في"},
    {option : "يعدل", value: "معدل بـ"},
    {option : "يلغي", value: "ملغى بـ"},
    {option : "يوافق على", value: "موافق عليه بـ"} ,
    {option : "نص تطبيقي ل", value: "نص تطبيقي"}
  ]

  const handleRemoveItem = async (indexToRemove, item) => {

    const adjustement = {
      adjusted_num: item.id_text,
      adjusting_num: id_text,
    }
    try {
      await axios.post('http://localhost:8000/data_collection/adjustment/delete/', adjustement);
      setAdjustedTexts((prevTexts) =>
        prevTexts.filter((_, index) => index !== indexToRemove)
      );
    } catch (error) {
      console.log(error)
    }

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
                disabled
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
                disabled
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
       


              <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Filter Modal"
        className="customModal"
        overlayClassName="customOverlay"
      >
        <h2>تصفية النصوص</h2>
        <div className="filter_form">
          <label>
            كلمة مفتاحية
            <input
              type="text"
              name="q"
              value={filterData.keyword}
              onChange={handleFilterChange}
            />
          </label>
          <label>
            السنة
            <select
              name="year"
              value={filterData.year}
              onChange={handleFilterChange}
            >
              <option value="">اختر السنة</option>
              {years.map((yearOption) => (
                <option key={yearOption} value={yearOption}>
                  {yearOption}
                </option>
              ))}
            </select>
          </label>
          <label>
            المصدر
            <select
              name="source"
              value={filterData.source}
              onChange={handleFilterChange}
            >
              <option value="">اختر المصدر</option>
              {sources.map((sourceOption) => (
                <option key={sourceOption} value={sourceOption}>
                  {sourceOption}
                </option>
              ))}
            </select>
          </label>
          <label>
            النوع
            <select
              name="type"
              value={filterData.type}
              onChange={handleFilterChange}
            >
              <option value="">اختر النوع</option>
              {types.map((typeOption) => (
                <option key={typeOption} value={typeOption}>
                  {typeOption}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="results_container">
          {results.map((item, index) => (
            <div key={index} className="result_item" onClick={() => {
              handleSelectedAjustedJT(item)
            }} >
              <h2>{item.type_text}</h2>
              <p>{item.source}</p>
              <p>
                الجريدة الرسمية عدد {item.official_journal_number} مؤرخة في {item.publication_date}
              </p>
              <p>{item.description}</p>
            </div>
          ))}
        </div>

        <button onClick={applyFilters} className="scraping_modifierButton">
          بحث
        </button>
        <button onClick={closeModal} className="scraping_modifierButton">
          إغلاق
        </button>
      </Modal>


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
              value={selectedAjustingOption}
              onChange={(e) => setSelectedAdjustingOption(e.target.value) }
              placeholder="مرسوم"
            >
              <option value="">النص</option>
              {adjustment_values.map((value) => (
                <option key={value.option} value={value.value}>
                  {value.option}
                </option>
              ))}
            </select>
          </label>
          <button onClick={openModal} className="update_btn fullbtn" type="button">اختر النص المعدل</button>
        </div>

        <h5 style={{ textAlign: 'right', marginTop: '20px', paddingTop: '0', color: '#374957' }}>
          نصوص يجددها هذا النص
        </h5>
        <div className="results_container">
          {ajustedTexts.map((item, index) => (
            <div key={index} className="adj_item">
              <div className="icon_container">
                <DeleteIcon onClick={() => handleRemoveItem(index, item)} className="trash_icon" />
              </div>
              <div>
                <h2>{item.type_text}</h2>
                <p>{item.source}</p>
                <p>
                  الجريدة الرسمية عدد {item.official_journal_number} مؤرخة في {item.publication_date}
                </p>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>


      </form>
      <FooterAdmin />
    </>
  );
}

export default ScrapingUpdate;
