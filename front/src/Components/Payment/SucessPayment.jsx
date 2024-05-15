import React from 'react'
import './Payment.css'
import Logo from '../LOGO/Logo'
import Footer from '../Footer/Footer'

function SucessPayment() {
  return (
    <>
    <Logo/>
    
    <div className="success-payment-container">
  <h1 className="success-payment-title">تم الدفع بنجاح!</h1>
  <div className="success-payment-details">
    <p><strong>اسم المستخدم:</strong> sanaa </p>
    <p><strong>العرض المختار:</strong> العرض المميز</p>
    <p><strong>المبلغ:</strong> 3000 dz</p>
    <p><strong>بداية الاشتراك:</strong> 15 أبريل 2024</p>
    <p><strong>نهاية الاشتراك:</strong> 15 مايو 2024</p>
  </div>
  <div className="receipt-actions">
          <button >تحميل الفاتورة</button>
          <button >طباعة الفاتورة</button>
        </div>
</div>

    <Footer/>
    </>
  )
}

export default SucessPayment