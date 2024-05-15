import React, { useState } from 'react';
import './HelpPage.css';
import Logo from '../LOGO/Logo';
import Footer from '../Footer/Footer';
import NavBar from '../MainPage/NavBar/NavBar';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import emailjs from 'emailjs-com';

function HelpPage() {
  const [questions, setQuestions] = useState([
<<<<<<< HEAD
    { id: 1, question: 'كيف يمكنني استعمال محلل النص الذكي ؟', titre: "test", desc: "hhh", showContent: false },
    { id: 2, question: '  لم أفهم طريقة الدفع ؟', titre: "test1", desc: "hhh1", showContent: false },
    { id: 3, question: ' كيف أجدد الاشتراك ؟', titre: "test2", desc: "hhh2", showContent: false },
=======
    { id: 1, question: 'كيف يمكنني استعمال محلل النص الذكي ؟',  desc: "محلل النص الذكي هو أداة تساعدك على تحليل النصوص بسهولة. لاستخدامه، أدخل النص الذي ترغب في تحليله في حقل الإدخال المتاح ، اضغط على زر تحليل لبدء العملية. ستظهر النتائج بسرعة وتعرض لك تحليلًا مفصلاً للنص، مثل استخراج المعلومات المهمة أو تحليل المشاعر. إذا كانت لديك أي استفسارات، يمكنك الرجوع إلى قسم المساعدة في التطبيق. ", showContent: false },
    { id: 2, question: 'لم أفهم طريقة الدفع ؟',  desc: "طريقة الدفع في منصتنا بسيطة وسهلة. اتبع الخطوات التالية لفهم كيفية إجراء عملية الدفع:  بعد تسجيل الدخول إلى حسابك، اختر الخدمة انتقل إلى صفحة الدفع و  ستُطلب منك إدخال معلومات الدفع الخاصة بك، مثل رقم البطاقة الائتمانية أو اختيار وسيلة دفع أخرى متاحة.   إذا واجهت أي مشكلة أثناء عملية الدفع، يمكنك التواصل مع خدمة العملاء للحصول على المساعدة اللازمة." , showContent: false },
    { id: 3, question: 'كيف أجدد الاشتراك ؟',  desc: "لتجديد الاشتراك في منصتنا، اتبع الخطوات التالية: تسجيل الدخول: قم بتسجيل الدخول إلى حسابك باستخدام بيانات الاعتماد الخاصة بك. الذهاب إلى صفحة الاشتراكات: انتقل إلى قائمة الحساب أو الإعدادات وابحث عن خيار الاشتراكات أو دارة الاشتراك. اختيار خطة الاشتراك: اختر الخطة التي ترغب في تجديدها. يمكنك اختيار نفس الخطة السابقة أو الترقية إلى خطة جديدة.", showContent: false },
>>>>>>> 36cc33654d8ec7d81266c33825013a22b3d35939
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

  const handleSendEmail = () => {
    window.location.href = `mailto:km_mohandouali@esi.dz?subject=Help&body=Email: ${email}%0A%0A${message}`;
  };

<<<<<<< HEAD
=======
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

>>>>>>> 36cc33654d8ec7d81266c33825013a22b3d35939
  return (
    <>
      <Logo />
      <NavBar />
      <div className='help_page'>
        <h1>
          هل تحتاج الى
          <span className='backgnd-text'> مساعدة ؟ </span>
        </h1>
<<<<<<< HEAD
        <div className='help_container'>
=======
        <form className='help_container' onSubmit={handleSubmit}>
>>>>>>> 36cc33654d8ec7d81266c33825013a22b3d35939
          <div className='help_mail'>
            <input
              type='email'
              className='mail_input'
              placeholder='البريد الالكتروني'
              value={email}
<<<<<<< HEAD
              onChange={(e) => setEmail(e.target.value)}
=======
              onChange={handleEmailChange}
>>>>>>> 36cc33654d8ec7d81266c33825013a22b3d35939
            />
            <textarea
              className='mail_input text_input'
              placeholder='الرسالة ....'
              value={message}
<<<<<<< HEAD
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type='button' className='mail_input btn_mail' onClick={handleSendEmail}>
=======
              onChange={handleMessageChange}
            />
            <button type='submit' className='mail_input btn_mail'>
>>>>>>> 36cc33654d8ec7d81266c33825013a22b3d35939
              ارسال الرسالة
            </button>
          </div>
          <div className='help_pic'>
            <h2>تواصل معنا :</h2>
            <div className='help_logo'>
              <img src='./images/helplogo.png' alt='Help Logo' />
            </div>
          </div>
<<<<<<< HEAD
        </div>

        <div className='disply_lignhelp'>
          <div className='ligne_help'></div>
          <p>أسئلة شائعة</p>
          <div className='ligne_help'></div>
        </div>
=======
        </form>
        <div className='disply_lignhelp'>
          <div className='ligne_help'></div>
          <p>أسئلة شائعة</p>
          <div className='ligne_help'></div>
        </div>
>>>>>>> 36cc33654d8ec7d81266c33825013a22b3d35939
        <div className='qst_help'>
          {questions.map((q) => (
            <div key={q.id}>
              <div className="icon-container" onClick={() => handleToggleContent(q.id)}>
                <ArrowDropDownIcon />
<<<<<<< HEAD
                <p>{q.question}</p>
              </div>
              {q.showContent && (
                <div className="content-container">
                  <h2>{q.titre}</h2>
                  <p>{q.desc}</p>
=======
                <p style={{fontWeight:500}}>{q.question}</p>
              </div>
              {q.showContent && (
                <div className="content-container">
                  
                  <p style={{color:"#374957"}}>{q.desc}</p>
>>>>>>> 36cc33654d8ec7d81266c33825013a22b3d35939
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
