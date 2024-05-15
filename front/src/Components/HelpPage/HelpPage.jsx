import React, { useState } from 'react';
import './HelpPage.css';
import Logo from '../LOGO/Logo';
import Footer from '../Footer/Footer';
import NavBar from '../MainPage/NavBar/NavBar';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import emailjs from 'emailjs-com';

function HelpPage() {
  const [questions, setQuestions] = useState([
    { id: 1, question: 'كيف يمكنني استعمال محلل النص الذكي ؟', titre: "test", desc: "hhh", showContent: false },
    { id: 2, question: 'لم أفهم طريقة الدفع ؟', titre: "test1", desc: "hhh1", showContent: false },
    { id: 3, question: 'كيف أجدد الاشتراك ؟', titre: "test2", desc: "hhh2", showContent: false },
  ]);

  const handleToggleContent = (id) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === id ? { ...q, showContent: !q.showContent } : q
      )
    );
  };

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const templateParams = {
      user_email: email,
      message: message,
    };

    console.log(templateParams); // Log params to console for debugging

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID')
      .then((response) => {
        console.log('Email envoyé avec succès !', response.status, response.text);
        alert('Message envoyé avec succès !');
      }, (error) => {
        console.error('Erreur lors de l\'envoi du message', error.text);
        alert('Erreur lors de l\'envoi du message');
      });
  };

  return (
    <>
      <Logo />
      <NavBar />
      <div className='help_page'>
        <h1>
          هل تحتاج الى
          <span className='backgnd-text'> مساعدة ؟ </span>
        </h1>
        <form className='help_container' onSubmit={handleSubmit}>
          <div className='help_mail'>
            <input
              type='email'
              className='mail_input'
              placeholder='البريد الالكتروني'
              value={email}
              onChange={handleEmailChange}
            />
            <textarea
              className='mail_input text_input'
              placeholder='الرسالة ....'
              value={message}
              onChange={handleMessageChange}
            />
            <button type='submit' className='mail_input btn_mail'>
              ارسال الرسالة
            </button>
          </div>
          <div className='help_pic'>
            <h2>تواصل معنا :</h2>
            <div className='help_logo'>
              <img src='./images/helplogo.png' alt='Help Logo' />
            </div>
          </div>
        </form>
        <div className='disply_lignhelp'>
          <div className='ligne_help'></div>
          <p>أسئلة شائعة</p>
          <div className='ligne_help'></div>
        </div>
        <div className='qst_help'>
          {questions.map((q) => (
            <div key={q.id}>
              <div className="icon-container" onClick={() => handleToggleContent(q.id)}>
                <ArrowDropDownIcon />
                <p>{q.question}</p>
              </div>
              {q.showContent && (
                <div className="content-container">
                  <h2>{q.titre}</h2>
                  <p>{q.desc}</p>
                </div>
              )}
              <div className='lign_qst'></div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HelpPage;
