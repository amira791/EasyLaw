
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../Context/LogoProvider';
import './Profile.css';
import Logo from '../LOGO/Logo';
import Footer from '../Footer/Footer';
import NavBarProfile from './NavBarProfile';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


import usePayment from '../../Hooks/usePayment';

function Facture() {
    const [initials, setInitials] = useState('');
    const [userAccount, setUserAccount] = useState([]);
    const { formData } = useContext(AuthContext);
    const { getUserInvoices } = usePayment();

    useEffect(() => {
        const nameInitials = formData.nom ? formData.nom.slice(0, 2).toUpperCase() : '';
        setInitials(nameInitials);
    }, [formData.nom]);

    useEffect(() => {
        const fetchUserInvoices = async () => {
            try {
                const invoices = await getUserInvoices();
                if (invoices) {
                    setUserAccount(invoices);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des factures :', error);
            }
        };

        fetchUserInvoices();
    }, []);

    const handleDownload = (pdfUrl) => {
        window.open(pdfUrl, '_blank');
    };

    return (
        <>
            <Logo />
            <div className='profile_container'>
                <div className='profile_name'>
                    <div className="user-initials-circle"> {initials}</div>
                    <h3>{formData.nom}</h3>
                </div>
                <div className='profile_content'>
                    <div className='facture_container'>
                        <h2>فواتيري </h2>
                        {Array.isArray(userAccount) && userAccount.length > 0 ? (
                            <DataTable value={userAccount} paginator rows={10} style={{ width: '100%', textAlign: 'center' }}>
                                <Column field="pdf" header="" style={{ width: '16%' }} body={(rowData) => (
                                    <button style={{ color: 'red', border: 'none', backgroundColor: 'transparent', fontSize: "16px", cursor: 'pointer' }} onClick={() => { handleDownload(rowData.facture.pdf) }}>تحميل</button>
                                )}></Column>
                                <Column field="facture.methode_de_payment" header="طريقة الدفع " style={{ width: '16%', textAlign: 'center' }}></Column>
                                <Column field="facture.payé" header="مدفوعة " style={{ width: '16%', textAlign: 'center' }} body={(rowData) => (<>{rowData.facture.payé ? "نعم" : "لا"}</>)}></Column>
                                <Column field="facture.montant" header="الثمن" style={{ width: '16%', textAlign: 'center' }}></Column>
                                <Column field="facture.date" header="التاريخ " style={{ width: '16%', textAlign: 'center' }}></Column>
                                <Column field="service" header=" العرض" style={{ width: '16%', textAlign: 'center' }}></Column>
                            </DataTable>
                        ) : (
                            <div>لا توجد فواتير لعرضها</div>
                        )}
                    </div>
                    <NavBarProfile interest="اهتماماتي" services="خدماتي" />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Facture;
