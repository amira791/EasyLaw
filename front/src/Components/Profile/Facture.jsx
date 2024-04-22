import React,{useState,useContext,useEffect} from 'react'
import { AuthContext } from '../../Context/LogoProvider';
import './Profile.css'
import Logo from '../LOGO/Logo';
import Footer from '../Footer/Footer';
import NavBarProfile from './NavBarProfile';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import axios from 'axios';
import usePayment from '../../Hooks/usePayment';

function Facture() {
    const [initials, setInitials] = useState('');
    const [userAccount, setUserAccount] = useState([]);
    const {  formData} = useContext(AuthContext);
    const { getUserInvoices } = usePayment();
    useEffect(() => {
        const nameInitials = formData.nom ? formData.nom.slice(0, 2).toUpperCase() : '';
        setInitials(nameInitials);
      }, [formData.nom]);

      useEffect(() => {
        const fetchUserInvoices = async () => {
            const invoices = await getUserInvoices(); 
            if (invoices) {
                setUserAccount(invoices);
            }
        };

        fetchUserInvoices();
    }, []);

    const handleDownload = (pdfUrl) => {
        window.open(pdfUrl, '_blank');
    };
    
  return (
   <>
   <Logo/>
   <div className='profile_container'>
<div className='profile_name'>
    <div className="user-initials-circle"> {initials}</div>
        <h3>{formData.nom}</h3>
    </div>
    <div className='profile_content'>
   <div className='facture_container'> 
   <h2>فواتيري </h2>
   <DataTable value={userAccount} paginator rows={5}  style={{ width: '100%',textAlign:'center' }}>
   <Column field="pdf" header="" style={{ width: '16%', color:'red' }} body={(rowData) => (
                                <button style={{ color:'red' }} onClick={() => handleDownload(rowData.pdf)}>Télécharger</button>
                            )}></Column>
          <Column field="methode_de_payment" header="طريقة الدفع " style={{ width: '16%' ,textAlign:'center'}}></Column>
          <Column field="Ispaid" header="مدفوعة " style={{ width: '16%' ,textAlign:'center'}}></Column>
          <Column field="montant" header="الثمن" style={{ width: '16%' ,textAlign:'center'}}></Column>
          <Column field="date" header="التاريخ " style={{ width: '16%',textAlign:'center' }}></Column>
          <Column field="offre" header=" العرض" style={{ width: '16%',textAlign:'center' }}></Column>
        </DataTable>
   </div>
   <NavBarProfile interest="اهتماماتي"  services="خدماتي"/>
   </div>
  </div>
   <Footer/>
   </>
  )
}
export default Facture

