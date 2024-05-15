import React, { useState, useEffect } from 'react';
import './AccountManag.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'; // Import InputText component for search
import TitleBar from '../../TitleBar/TitleBar';
import LogoAdmin from '../../LOGO/LogoAdmin';
import FooterAdmin from '../../Footer/FooterAdmin';
import useUser from '../../../Hooks/useUser';

function AccountManag() {
  const { getAllUsers, activateUser, blockUser, createModerator } = useUser();
  const [userAccount, setUserAccount] = useState([]);
  const [clientSearchQuery, setClientSearchQuery] = useState('');
  const [moderatorSearchQuery, setModeratorSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllUsers(); 
        setUserAccount(response.users);
      } catch (error) {
        console.error('An error occurred while retrieving user information:', error);
      }
    };
  
    fetchData();
  }, []);

  const handleActivateUser = async (username) => {
    try {
      await activateUser(username);
      const response = await getAllUsers(); 
      setUserAccount(response.users);
    } catch (error) {
      console.error('An error occurred while activating the user:', error);
    }
  };
  
  const handleBlockUser = async (username) => {
    try {
      await blockUser(username);
      const response = await getAllUsers(); 
      setUserAccount(response.users);
    } catch (error) {
      console.error('An error occurred while blocking the user:', error);
    }
  };

  const filteredClientUsers = userAccount.filter(user =>
    user.role === 'client' &&
    (user.username.toLowerCase().includes(clientSearchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(clientSearchQuery.toLowerCase()))
  );

  const filteredModeratorUsers = userAccount.filter(user =>
    user.role === 'moderateur' &&
    (user.username.toLowerCase().includes(moderatorSearchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(moderatorSearchQuery.toLowerCase()))
  );

  return (
    <>
      <LogoAdmin />
      <TitleBar title="ادارة الحسابات" />
      <div className='accountManag-container'>
        <h2> حسابات العملاء</h2>
        <div className="search-container">
  <div className="p-input-icon-left">
    <i className="pi pi-search"></i>
    <InputText value={clientSearchQuery} onChange={(e) => setClientSearchQuery(e.target.value)} placeholder="ابحث حسب الاسم أو البريد الإلكتروني" className="p-inputtext" />
  </div>
</div>
        <div className="datatable-responsive">
          <DataTable value={filteredClientUsers} className="p-datatable-sm" paginator rows={7} tableStyle={{ minWidth: '50rem' }}>
            <Column field="username" header="إسم المستخدم" style={{ width: '15%' }} ></Column>
            <Column field="email" header="البريد الإلكتروني" style={{ width: '15%' }}></Column>
            <Column field="etat" header="الوضعية" style={{ width: '15%' }}></Column>
            <Column header="الحالة" style={{ width: '15%' }} body={(rowData) => (
             <div>
                {rowData.etat === 'Active' ? (
                  <Button label="حظر" className="p-button-block" onClick={() => handleBlockUser(rowData.username)} />
                ) : (
                  <Button label="تفعيل" className="p-button-unblock" onClick={() => handleActivateUser(rowData.username)} />
                )}
              </div>
            )} />
          </DataTable>
        </div>
        <h2> حسابات المشرفين</h2>
        <div className="search-container">
  <div className="p-input-icon-left">
    <i className="pi pi-search"></i>
    <InputText value={moderatorSearchQuery} onChange={(e) => setModeratorSearchQuery(e.target.value)} placeholder="ابحث حسب الاسم أو البريد الإلكتروني" className="p-inputtext" />
  </div>
</div>
        <div className="datatable-responsive">
          <DataTable value={filteredModeratorUsers} className="p-datatable-sm" paginator rows={7} tableStyle={{ minWidth: '50rem' }}>
            <Column field="username" header="إسم المستخدم" style={{ width: '15%' }}></Column>
            <Column field="email" header="البريد الإلكتروني" style={{ width: '15%' }}></Column>
            <Column field="etat" header="الوضعية" style={{ width: '15%' }}></Column>
            <Column header="الحالة" style={{ width: '15%' }} body={(rowData) => (
              <div>
                {rowData.etat === 'Active' ? (
                  <Button label="حظر" className="p-button-block" onClick={() => handleBlockUser(rowData.username)} />
                ) : (
                  <Button label="تفعيل" className="p-button-unblock" onClick={() => handleActivateUser(rowData.username)} />
                )}
              </div>
            )} />
          </DataTable>
        </div>
      </div>
      <FooterAdmin />
    </>
  );
}

export default AccountManag;
