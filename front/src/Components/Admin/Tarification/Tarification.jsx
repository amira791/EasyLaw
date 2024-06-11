// Tarification.jsx

import React, { useState, useEffect } from 'react';
import LogoAdmin from '../../LOGO/LogoAdmin';
import TitleBar from '../../TitleBar/TitleBar';
import Navigation from '../NavigationBar/Navigation';
import FooterAdmin from '../../Footer/FooterAdmin';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import './Tarification.css';
import usePayment from '../../../Hooks/usePayment';

function Tarification() {

    const {getSubscriptions, getAllAccesses, addSub, changePrice, convert, convertionSymbols} = usePayment();

    const [userAccount, setUserAccount] = useState([]);
    const [accesses , setAccesses] = useState();

    const [priceChanging, setPriceChanging] = useState(false)
    const [priceChangerData, setPriceChangerData] = useState({})
    const [symbols, setSymbols] = useState([])

    useEffect(() => {

        const fetchData = async () => {
          const subs = await getSubscriptions()
          const data = subs?.offers.reverse().map((sub)=>{
                return {
                    id: sub.id,
                    priceId : sub.priceId,
                    bloc:'تحويل العملة',
                    accesses: sub.features.map(f=>f.nom).join(" +"),
                    prixSub : sub.price,
                    subscription : sub.title,
                }
          }) 
          setUserAccount(data)
          const symbs = await convertionSymbols();
          setSymbols(symbs.success)

          const accessdata = await getAllAccesses()
          setAccesses(accessdata?.data)
        }
    
        fetchData()
    
      },[])


    const [subscription, setSubscription] = useState('');
    const [prixSub, setPrixSub] = useState('');
    const droits = new Set()
    const [displayDialog, setDisplayDialog] = useState(false);

    const handleAddSubscription = async () => {
        await addSub(subscription, parseInt(prixSub), Array.from(droits))

        if(!droits.size) 
            return
        const newUserAccount = [...userAccount];
        newUserAccount.push({ bloc: 'تحويل العملة', prixSub: prixSub+ "دج/شهر", subscription: subscription, accesses: accesses.filter(a => droits.has(a.id)).map(f=>f.nom).join(" +"), });
        setUserAccount(newUserAccount);
        setSubscription('');
        setPrixSub(''); 
        setDisplayDialog(false);
    };
    
    
    const handleChangePrice = async () => {
        await changePrice(priceChangerData.id, priceChangerData.priceId, parseInt(prixSub))


        const newUserAccount = [...userAccount];
        let row = newUserAccount.find(o => o.id == priceChangerData.id)
        if (row) {
            Object.assign(row, {prixSub: prixSub+ "دج/شهر" });
        }

        setUserAccount(newUserAccount);
        setPrixSub(''); 
        setPriceChanging(false)
    };

    const handleConvert = async (to, prix, id)=>
    {
        const amount = prix.match(/\d+/);

        const converted = await convert("DZD", to, amount)
        const newP = converted.success
        if(newP){
            const newUserAccount = [... userAccount];
            newUserAccount.find((a)=>a.id == id).converted =  newP.result+" "+ newP.query.to;
            setUserAccount(newUserAccount)
        }
            
    }


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
                    <Column field="accesses" header="الخدمات" ></Column>
                    <Column field="" header="" style={{ width: '16%' }} body={(rowData) => (
                                    <button style={{ color: 'green', border: 'none', backgroundColor: 'transparent', fontSize: "16px", cursor: 'pointer' }} onClick={() => { setPrixSub(rowData.prixSub.replace(/\D/g, '')); setPriceChanging(true); setPriceChangerData({id: rowData.id, priceId: rowData.priceId}); }}>تغيير السعر</button>)}>   
                    </Column>
                    <Column field="" header="" style={{ width: '16%' }} body={(rowData) => (
                                    //<button style={{ color: 'green', border: 'none', backgroundColor: 'transparent', fontSize: "16px", cursor: 'pointer' }} onClick= {()=>{rowData.converted = handleConvert("EUR",rowData.prixSub, rowData.id)}}> تحويل العملة</button>
                                    <>
                                    <select className='currency-sel' name="" id="" value={1} onChange={(e)=>handleConvert(e.target.value, rowData.prixSub, rowData.id)}>
                                        <option value="1" disabled>تحويل العملة</option>
                                        {symbols.map(sym =>
                                        <option value={sym}>{sym}</option> 
                                        )}
                                    </select>
                                    </>
                                    )}>   
                    </Column>
                    <Column field="converted" header="العملة المحولة" ></Column>
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
                            <input id="subscription" type="text" required value={subscription} onChange={(e) => setSubscription(e.target.value)} />
                        </div>
                        <div className="p-field">
                            <label htmlFor="prixSub">سعر الاشتراك  (دج/شهر)</label>
                            <input id="prixSub" type="text" required value={prixSub} onChange={(e) => setPrixSub(e.target.value)} />
                        </div>
                        <div className="p-field">
                            <label htmlFor="prixSub"> الخدمات</label>
                            { accesses?.map(access =>
                                <div className='droit'>  <input type="checkbox" name="ac1" id=""  onChange={(e)=>{if(e.target.checked) droits.add(access.id); else  droits.delete(access.id)}}/>   <span>{access.nom}</span> </div>  
                            )}
                            
                        </div>
                    </div>
                    <div className="p-dialog-footer">
                         <button className="p-button" onClick={handleAddSubscription}>تأكيد</button>
                        <button className="p-button-text" onClick={() => setDisplayDialog(false)}>إلغاء</button>
                       
                    </div>
                </div>
            </Dialog>

            <Dialog header="إضافة اشتراك" visible={priceChanging} style={{ width: '30rem' }} onHide={() => setPriceChanging(false)}
                className="custom-dialog" 
            >
                <div className="popup-content">
                    <div className="p-fluid">
                        <div className="p-field">
                            <label htmlFor="prixSub">سعر الاشتراك  (دج/شهر)</label>
                            <input id="prixSub" type="text" required value={prixSub} onChange={(e) => setPrixSub(e.target.value)} />
                        </div>
                    </div>
                    <div className="p-dialog-footer">
                         <button className="p-button" onClick={handleChangePrice}>تأكيد</button>
                        <button className="p-button-text" onClick={() => setPriceChanging(false)}>إلغاء</button>
                       
                    </div>
                </div>
            </Dialog>
        </>
    );
}

export default Tarification;
