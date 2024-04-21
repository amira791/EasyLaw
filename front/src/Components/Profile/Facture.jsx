import React,{useState,useContext,useEffect} from 'react'
import { AuthContext } from '../../Context/LogoProvider';
import './Profile.css'
import Logo from '../LOGO/Logo';
import Footer from '../Footer/Footer';
import NavBarProfile from './NavBarProfile';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import axios from 'axios';

function Facture() {
    const [initials, setInitials] = useState('');
    const [userAccount, setUserAccount] = useState([]);
    const {  formData} = useContext(AuthContext);
    useEffect(() => {
        const nameInitials = formData.nom ? formData.nom.slice(0, 2).toUpperCase() : '';
        setInitials(nameInitials);
      }, [formData.nom]);

      useEffect(() => {
        const fetchUserInvoices = async () => {
            const token=localStorage.getItem('access_token');
            try {
                const response = await axios.get('http://localhost:8000/Payement_validation/getinvoices', {
                    headers: {
                        Authorization: `Token ${token}` 
                    }
                });
                setUserAccount(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des factures :', error);
            }
        };

        fetchUserInvoices();
    }, []);


      const userAccountt = [
        { modePayement: 'Dhahabia', Ispaid: '  نعم', prix: ' 2000', date: '  12/12/2023', offre: ' العرض' },
        { modePayement: 'Dhahabia', Ispaid: '  نعم', prix: ' 2000', date: '  12/12/2023', offre: ' العرض' },
        { modePayement: 'Dhahabia', Ispaid: '  نعم', prix: ' 2000', date: '  12/12/2023', offre: ' العرض' },
        { modePayement: 'Dhahabia', Ispaid: '  نعم', prix: ' 2000', date: '  12/12/2023', offre: ' العرض' },
        { modePayement: 'Dhahabia', Ispaid: '  نعم', prix: ' 2000', date: '  12/12/2023', offre: ' العرض' },
        { modePayement: 'Dhahabia', Ispaid: '  نعم', prix: ' 2000', date: '  12/12/2023', offre: ' العرض' },
        { modePayement: 'Dhahabia', Ispaid: '  نعم', prix: ' 2000', date: '  12/12/2023', offre: ' العرض' },
       
      ];
    
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
   <DataTable value={userAccountt} paginator rows={5}  style={{ width: '100%',textAlign:'center' }}>
          <Column field="modePayement" header="طريقة الدفع " style={{ width: '20%' ,textAlign:'center'}}></Column>
          <Column field="Ispaid" header="مدفوعة " style={{ width: '20%' ,textAlign:'center'}}></Column>
          <Column field="prix" header="الثمن" style={{ width: '20%' ,textAlign:'center'}}></Column>
          <Column field="date" header="التاريخ " style={{ width: '20%',textAlign:'center' }}></Column>
          <Column field="offre" header=" العرض" style={{ width: '20%',textAlign:'center' }}></Column>
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
