// Tarification.jsx

import React, { useState } from 'react';
import LogoAdmin from '../../LOGO/LogoAdmin';
import TitleBar from '../../TitleBar/TitleBar';
import Navigation from '../NavigationBar/Navigation';
import FooterAdmin from '../../Footer/FooterAdmin';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import './Tarification.css';

function Tarification() {
    const [userAccount, setUserAccount] = useState([
        { bloc: 'تحويل العملة', prixSub: '3000000.00 دج', subscription: 'الاشعارات' },
        { bloc: 'تحويل العملة', prixSub: '3000000.00 دج', subscription: 'الاشعارات' },
        { bloc: 'تحويل العملة', prixSub: '3000000.00 دج', subscription: 'الاشعارات' },
    ]);

    const [subscription, setSubscription] = useState('');
    const [prixSub, setPrixSub] = useState('دج');
    const [displayDialog, setDisplayDialog] = useState(false);

    const handleAddSubscription = () => {
        const newUserAccount = [...userAccount];
        newUserAccount.push({ bloc: 'تحويل العملة', prixSub: prixSub, subscription: subscription });
        setUserAccount(newUserAccount);
        setSubscription('');
        setPrixSub('دج'); 
        setDisplayDialog(false);
    };

    return (
        <>
            <LogoAdmin title="صفحة الادارة" />
            <TitleBar title="ادارة المنصة" />
            <Navigation />
            <div className='tarification_page'>
                <div className='tarification_section1'>
                    <h3>تسعيرة الاشتراكات</h3>
                    <button  className="btn_addSub" onClick={() => setDisplayDialog(true)}>اضافة اشتراك</button>
                </div>
                <DataTable value={userAccount} paginator rows={7} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="subscription" header="الاشتراك" ></Column>
                    <Column field="prixSub" header="سعر الاشتراك" ></Column>
                    <Column field="bloc" header="" style={{ color: '#1D8B8C', fontWeight: "600" }}></Column>
                </DataTable>
            </div>
            <FooterAdmin />

            <Dialog header="إضافة اشتراك" visible={displayDialog} style={{ width: '30rem' }} onHide={() => setDisplayDialog(false)}
                className="custom-dialog" 
            >
                <div className="popup-content">
                    <div className="p-fluid">
                        <div className="p-field">
                            <label htmlFor="subscription">الاشتراك</label>
                            <input id="subscription" type="text" value={subscription} onChange={(e) => setSubscription(e.target.value)} />
                        </div>
                        <div className="p-field">
                            <label htmlFor="prixSub">سعر الاشتراك</label>
                            <input id="prixSub" type="text" value={prixSub} onChange={(e) => setPrixSub(e.target.value)} />
                        </div>
                    </div>
                    <div className="p-dialog-footer">
                         <button className="p-button" onClick={handleAddSubscription}>تأكيد</button>
                        <button className="p-button-text" onClick={() => setDisplayDialog(false)}>إلغاء</button>
                       
                    </div>
                </div>
            </Dialog>
        </>
    );
}

export default Tarification;
