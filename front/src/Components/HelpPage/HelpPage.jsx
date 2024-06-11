import React, { useState } from 'react';
import './HelpPage.css';
import Logo from '../LOGO/Logo';
import Footer from '../Footer/Footer';
import NavBar from '../MainPage/NavBar/NavBar';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import emailjs from 'emailjs-com';

function HelpPage() {
  const [questions, setQuestions] = useState([
    { id: 1, question: 'كيف يمكنني استعمال محلل النص الذكي ؟',  desc: "محلل النص الذكي هو أداة تساعدك على تحليل النصوص بسهولة. لاستخدامه، أدخل النص الذي ترغب في تحليله في حقل الإدخال المتاح ، اضغط على زر تحليل لبدء العملية. ستظهر النتائج بسرعة وتعرض لك تحليلًا مفصلاً للنص، مثل استخراج المعلومات المهمة أو تحليل المشاعر. إذا كانت لديك أي استفسارات، يمكنك الرجوع إلى قسم المساعدة في التطبيق. ", showContent: false },
    { id: 2, question: 'لم أفهم طريقة الدفع ؟',  desc: "طريقة الدفع في منصتنا بسيطة وسهلة. اتبع الخطوات التالية لفهم كيفية إجراء عملية الدفع:  بعد تسجيل الدخول إلى حسابك، اختر الخدمة انتقل إلى صفحة الدفع و  ستُطلب منك إدخال معلومات الدفع الخاصة بك، مثل رقم البطاقة الائتمانية أو اختيار وسيلة دفع أخرى متاحة.   إذا واجهت أي مشكلة أثناء عملية الدفع، يمكنك التواصل مع خدمة العملاء للحصول على المساعدة اللازمة." , showContent: false },
    { id: 3, question: 'كيف أجدد الاشتراك ؟',  desc: "لتجديد الاشتراك في منصتنا، اتبع الخطوات التالية: تسجيل الدخول: قم بتسجيل الدخول إلى حسابك باستخدام بيانات الاعتماد الخاصة بك. الذهاب إلى صفحة الاشتراكات: انتقل إلى قائمة الحساب أو الإعدادات وابحث عن خيار الاشتراكات أو دارة الاشتراك. اختيار خطة الاشتراك: اختر الخطة التي ترغب في تجديدها. يمكنك اختيار نفس الخطة السابقة أو الترقية إلى خطة جديدة.", showContent: false },
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

  return (
    <>
      <Logo />
      <NavBar />
      <div className='help_page'>
        <h1>
          هل تحتاج الى
          <span className='backgnd-text'> مساعدة ؟ </span>
        </h1>
        <div className='help_container'>
          <div className='help_mail'>
            <input
              type='email'
              className='mail_input'
              placeholder='البريد الالكتروني'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              className='mail_input text_input'
              placeholder='الرسالة ....'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type='button' className='mail_input btn_mail' onClick={handleSendEmail}>
              ارسال الرسالة
            </button>
          </div>
          <div className='help_pic'>
            <h2>تواصل معنا :</h2>
            <div className='help_logo'>
              <img src='./images/helplogo.png' alt='Help Logo' />
            </div>
          </div>
        </div>

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
