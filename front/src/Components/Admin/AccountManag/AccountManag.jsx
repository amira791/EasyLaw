import React from 'react';
import './AccountManag.css';
import Footer from '../../Footer/Footer';
import Logo from '../../LOGO/Logo';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

// Exemple de données pour la DataTable


function AccountManag() {
    const userAccount = [
        { setting: ' إعدادت الحساب', bloc: 'تعليق الحساب', lastLogin: '  12/12/2023', subscription: '  تجريبي', status: ' نشط', email: 'example1@example.com', username: 'المستخدم 1' },
        { setting: 'إعدادت الحساب', bloc: 'تعليق الحساب', lastLogin: '12/12/2023', subscription: '  تجريبي', status: ' نشط', email: 'example2@example.com', username: 'المستخدم 2' },
        { setting:' إعدادت الحساب', bloc: 'تعليق الحساب', lastLogin: '12/12/2023', subscription: '  تجريبي', status: ' نشط', email: 'example3@example.com', username: 'المستخدم 3' },
        { setting: ' إعدادت الحساب', bloc: 'تعليق الحساب', lastLogin: '  12/12/2023', subscription: '  تجريبي', status: ' نشط', email: 'example1@example.com', username: 'المستخدم 4' },
        { setting: 'إعدادت الحساب', bloc: 'تعليق الحساب', lastLogin: '12/12/2023', subscription: '  تجريبي', status: ' نشط', email: 'example2@example.com', username: 'المستخدم 5'},
        { setting:' إعدادت الحساب', bloc: 'تعليق الحساب', lastLogin: '12/12/2023', subscription: '  تجريبي', status: ' نشط', email: 'example3@example.com', username: 'المستخدم 6' },
        { setting: ' إعدادت الحساب', bloc: 'تعليق الحساب', lastLogin: '  12/12/2023', subscription: '  تجريبي', status: ' نشط', email: 'example1@example.com', username: 'المستخدم 7' },
        { setting: 'إعدادت الحساب', bloc: 'تعليق الحساب', lastLogin: '12/12/2023', subscription: '  تجريبي', status: ' نشط', email: 'example2@example.com', username: 'المستخدم 8' },
        { setting:' إعدادت الحساب', bloc: 'تعليق الحساب', lastLogin: '12/12/2023', subscription: '  تجريبي', status: ' نشط', email: 'example3@example.com', username: 'المستخدم 9' },
        { setting: ' إعدادت الحساب', bloc: 'تعليق الحساب', lastLogin: '  12/12/2023', subscription: '  تجريبي', status: ' نشط', email: 'example1@example.com', username: 'المستخدم 10' },
        { setting: 'إعدادت الحساب', bloc: 'تعليق الحساب', lastLogin: '12/12/2023', subscription: '  تجريبي', status: ' نشط', email: 'example2@example.com', username: 'المستخدم 11' },
        { setting:' إعدادت الحساب', bloc: 'تعليق الحساب', lastLogin: '12/12/2023', subscription: '  تجريبي', status: ' نشط', email: 'example3@example.com', username: 'المستخدم 12' },
        { setting: ' إعدادت الحساب', bloc: 'تعليق الحساب', lastLogin: '  12/12/2023', subscription: '  تجريبي', status: ' نشط', email: 'example1@example.com', username: 'المستخدم 13' },
        { setting: 'إعدادت الحساب', bloc: 'تعليق الحساب', lastLogin: '12/12/2023', subscription: '  تجريبي', status: ' نشط', email: 'example2@example.com', username: 'المستخدم 14' },
        { setting:' إعدادت الحساب', bloc: 'تعليق الحساب', lastLogin: '12/12/2023', subscription: '  تجريبي', status: ' نشط', email: 'example3@example.com', username: 'المستخدم 15' },
       
      ];
  return (
    <>
      <Logo />
      <div className='AccManag_titre'>
        <h2> ادارة الحسابات</h2>
      </div>
      <div className='accountManag-container'>
      <h2> حسابات المستخدمين</h2>
      <DataTable value={userAccount} paginator rows={7}  tableStyle={{ minWidth: '50rem' }}>
          <Column field="setting" header="" style={{ width: '15%' }}></Column>
          <Column field="bloc" header="" style={{ width: '15%',color:'red' }}></Column>
          <Column field="lastLogin" header="آخر تسجيل" style={{ width: '15%' }}></Column>
          <Column field="subscription" header="عرض الاشتراك" style={{ width: '15%' }}></Column>
          <Column field="status" header="الوضعية" style={{ width: '15%' }}></Column>
          <Column field="email" header="البريد الإلكتروني" style={{ width: '15%' }}></Column>
          <Column field="username" header="إسم المستخدم" style={{ width: '15%' }}></Column>
        </DataTable>

        <h2>  حسابات المشرفين</h2>
      <DataTable value={userAccount} paginator rows={7}  tableStyle={{ minWidth: '50rem' }}>
          <Column field="setting" header="" style={{ width: '15%' }}></Column>
          <Column field="bloc" header="" style={{ width: '15%',color:'red' }}></Column>
          <Column field="lastLogin" header="آخر تسجيل" style={{ width: '15%' }}></Column>
          <Column field="subscription" header="عرض الاشتراك" style={{ width: '15%' }}></Column>
          <Column field="status" header="الوضعية" style={{ width: '15%' }}></Column>
          <Column field="email" header="البريد الإلكتروني" style={{ width: '15%' }}></Column>
          <Column field="username" header="إسم المستخدم" style={{ width: '15%' }}></Column>
        </DataTable>
      </div>
      <Footer />
    </>
  );
}

export default AccountManag;
