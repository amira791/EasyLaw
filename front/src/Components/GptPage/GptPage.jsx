import React from 'react'
import './GptPage.css'
import Logo from '../LOGO/Logo'
import Footer from '../Footer/Footer'

function GptPage() {
  return (
    <>
    <Logo/>
    <div className='gptPage_container'>
        <div className='gpt_historique'>
            <h4>محادثة جديدة</h4>
            <h4>أرشيف الأسئلة</h4>
            <ul>
                <li>ما هو التأثير القانوني لاتفاقية (X) في القانون الدولي؟</li>
                <li>ما هو التأثير القانوني لاتفاقية (X) في القانون الدولي؟</li>
                <li>ما هو التأثير القانوني لاتفاقية (X) في القانون الدولي؟</li>
                <li>ما هو التأثير القانوني لاتفاقية (X) في القانون الدولي؟</li>
            </ul>
            <div style={{width:'80%',border:'1px solid white'}}></div>
        </div>
        <div className='gpt_search'>
            <h1>حلل نصك القانوني هنا </h1>
            <input type='textarea'
            className='gpt_search_engine'
            placeholder='  . . .  اطرح سؤالا '/>
            <h3>بعض الأسئلة الشائعة </h3>
            <div className='gpt_qst'>
                <div className='gpt_qst_item'>ما هو التأثير القانوني لاتفاقية (X) في القانون الدولي؟</div>
                <div className='gpt_qst_item' >ما هي الإجراءات القانونية اللازمة لتقديم الإقرار الضريبي؟</div>
                <div className='gpt_qst_item' >هل يمكن للمدعي تقديم دعوى ضد المدعى بسبب الضرر الذي تسبب فيه؟</div>
                <div className='gpt_qst_item' >ما هي الشروط القانونية للحصول على حضانة الأطفال في حالة الطلاق؟</div>
            </div>
        </div>


    </div>
    <Footer/>
    </>
  )
}

export default GptPage