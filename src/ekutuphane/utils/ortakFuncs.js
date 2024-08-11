// import { Button } from 'primereact/button';
// import yetkiTipleri from 'utils/data/yetki-tipleri';
// import { callAPI, GET } from 'utils/axiosUtils';
// import produce from 'immer';
// import React from 'react';
// import { Badge } from 'primereact/badge';
// import { Steps } from 'primereact/steps';
// import { ScrollPanel } from 'primereact/scrollpanel';
// import { openTabsSubject, subjectPublish } from './store/Store';
// import { favoritesKey } from './constants';
// import { CODE2_BBS_CANLI, ESKI_BBS_CANLI } from './EdysUtils';
// import { renderToString } from 'react-dom/server';
// import { faTemperature0 } from '@fortawesome/free-solid-svg-icons';
// import { Avatar } from 'primereact/avatar';
// import { AvatarGroup } from 'primereact/avatargroup';
// import { Tooltip } from 'primereact/tooltip';
// import moduleList from 'utils/data/module.json'


// let globalToast = null;
// function yyyymmdd(date) {
//   const yyyy = date.getFullYear();
//   const mm = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1); // getMonth() is zero-based
//   const dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
//   return "".concat(yyyy).concat('-').concat(mm).concat('-').concat(dd);
// }

// export function yyyymmddhhmm(date) {
//   const tarih = yyyymmdd(date);
//   const hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
//   const min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
//   return "".concat(tarih).concat('T').concat(hh).concat(':').concat(min);
// }

// export function toDateSendAPI(date) {
//   const tarihSaat = yyyymmddhhmm(date);
//   const ss = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
//   return "".concat(tarihSaat).concat(':').concat(ss).concat('.000Z');
// }

// export function setGlobalToast(ref) {
//   globalToast = ref;
// }

// export function getGlobalToast() {
//   return globalToast;
// }

// export function isObject(variable) {
//   return Object.prototype.toString.call(variable) === '[object Object]';
// }

// export function isArray(variable) {
//   return Object.prototype.toString.call(variable) === '[object Array]';
// }

// export function handleRequiredCheck(array) {
//   return array?.filter(val => (val.value === undefined || val.value === '' || val.value === null || val.value.length === 0) || val.value === false).map(val => val.label + ' alanına değer girilmelidir.')
// }

// export function parametreBodyTemplate(value, paramList) {

//   return paramList?.filter(val => String(val.value) === String(value)).map(val => val.label).join(' ');
// }

// export function kullaniciBodyTemplate(value, paramList) {
//   return paramList?.filter(val => String(val.value) === String(value)).map(val => val.label).join(' ');
// }

// export function surecIslemDurumBodyTemplate(value) {
//   if (value === "BEKLEMEDE") {
//     return <Badge value="BEKLEMEDE" severity="warning"></Badge>
//   }
//   else if (value === "ONAYLANDI") {
//     return <Badge value="ONAYLANDI" severity="success"></Badge>
//   }
//   else if (value === "BEKLEMEDE") {
//     return <Badge value="BEKLEMEDE" severity="warning"></Badge>
//   }
// }

// export function moduleBodyTemplate(value) {
//   if (value) {
//     const item = moduleList?.find(item => item.value === value); // value değerine göre JSON verisini arar
//     const priority = item ? item.priority : 'N'; // Eğer item bulunursa, priority değerini alır; aksi halde 'N' olarak kabul eder

//     return priority === 'Y' ? (
//       <span className={`customer-badge status-qualified`}>EBYS</span>
//     ) : <span className={`customer-badge status-new`}>DA</span>
//   }
// }

// export function kepIndirildiBodyTemplate(value) {
//   if (value === "E") {
//     return <Badge value="INDIRILMEDI" severity="danger"></Badge>
//   }
//   else if (value === "H") {
//     return <Badge value="INDIRILDI" severity="success"></Badge>
//   }
// }

// export function bolgeBodyTemplate(value, paramList) {
//   if (paramList.length > 0) {
//     const newBolgeList = paramList.map(val => val.label).filter(onlyUnique);
//     return newBolgeList
//       ?.map(val => {
//         const tmp = val.split(' ');
//         return { value: tmp[0], label: val.replace(' ', '-') }
//       })
//       ?.filter(val => val.value === String(value)).map(val => val.label).join(' ');
//   }
// }

// export function handleFilterChange(tmp, setFilterItem) {
//   for (var i = 0; i < Object.keys(tmp).length; i++) {
//     handleChange(Object.keys(tmp)[i], Object.values(tmp)[i].value, setFilterItem);
//   }
// };

// export function handleChange(field, value, setItem) {
//   setItem(oldState => {
//     const next = produce(oldState, draft => {
//       draft[field] = value;
//     });
//     return next;
//   });
// };



// export function aktifBodyTemplate(val) {
//   if (val === 'E' || val === 'H') {
//     return (val === 'E' ? 'Aktif' : 'Pasif');
//   }
//   else if (val === 1 || val === 0) {
//     return (val === 1 ? 'Aktif' : 'Pasif');
//   }

// }

// export function delay(time) {
//   return new Promise(resolve => setTimeout(resolve, time));
// }

// export function havaleEtConfirmTemplate(selectedHavaleList) {
//   let havaleEtmemisKullanicilar = selectedHavaleList.filter(val => val.havaleDurumu === "H");
//   let mevcutKullanici = havaleEtmemisKullanicilar[0]?.sira;
//   let nextKullanici;
//   if (mevcutKullanici < selectedHavaleList.length - 1) {
//     nextKullanici = selectedHavaleList[mevcutKullanici + 1];
//   }
//   return (
//     <>{
//       <div className='p-mt-5 scrollpanel-demo'>
//         <ScrollPanel style={{ width: '100%', height: "90px" }} className="custombar3 p-mb-5">
//           <Steps model={selectedHavaleList.map(val => ({ label: val.adSoyad }))} activeIndex={mevcutKullanici} />
//         </ScrollPanel>
//         {nextKullanici && <>
//           İlgili evrak &nbsp;<span style={{ textDecoration: "underline", fontStyle: "italic" }}><b>{nextKullanici.adSoyad}</b></span> &nbsp; kullanıcısına havale edilecektir!
//         </>}
//         {!nextKullanici && <>
//           Yukarı havale sırasındaki son kullanıcısınız.
//         </>}
//       </div>
//     }</>
//   );
// }

// export function evetHayirBodyTemplate(val) {
//   if (val === 'E' || val === 'H') {
//     return (val === 'E' ? 'EVET' : 'HAYIR');
//   }
//   else if (val === 1 || val === 0) {
//     return (val === 1 ? 'EVET' : 'HAYIR');
//   }

// }

// export function birimKurumNoBodyTemplate(val) {
//   return <Badge value="TEST" severity="success"></Badge>;
// }

// export function evetHayirBadgeBodyTemplate(val) {
//   if (val === 'Evet') {
//     return <>
//       <span className={`customer-badge status-qualified`}>EVET</span></>
//   }
//   else if (val === 'Hayır') {
//     return <>
//       <span className={`customer-badge status-unqualified`}>HAYIR</span></>
//   }
// }

// export function kepTurBodyTemplate(val) {
//   if (val === 'eYazisma') {
//     return <>
//       <span className={`customer-badge status-qualified`}>E-Yazisma</span></>
//   }
//   else if (val === 'standart') {
//     return <>
//       <span className={`customer-badge status-new`}>STANDART</span></>
//   }
// }

// export function havaleDurumBodyTemplate(val) {
//   if (val === 2) {
//     return <>
//       <span className={`customer-badge status-qualified`}>HAVALE EDİLDİ</span></>
//   }
//   else if (val === 1) {
//     return <>
//       <span className={`customer-badge status-new`}>ZİMMETTE</span></>
//   }
//   else if (val === 0) {
//     return <>
//       <span className={`customer-badge status-negotiation`}>ZİMMETE ALINMADI</span></>
//   }
// }

// export function gelgidicBodyTemplate(val) {
//   if (val === 0) {
//     return <>
//       <span className={`customer-badge status-qualified`}>GELEN</span></>
//   }
//   else if (val === 1) {
//     return <>
//       <span className={`customer-badge status-renewal`}>GİDEN</span></>
//   }
//   else if (val === 2) {
//     return <>
//       <span className={`customer-badge status-proposal`}>İÇ</span></>
//   } else if (val === 3) {
//     return <>
//       <span className={`customer-badge status-new`}>TASLAK</span></>
//   }
// }

// export function actionBodyTemplate(handleEdit, handleDelete, handleDetail) {


//   return rowData => {
//     return (
//       <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'right' }}>
//         {handleEdit && <Button type="button" icon="pi pi-pencil" className="p-button-info p-button-rounded p-button-text p-mr-1" style={{ height: '27px', width: '27px', paddingTop: "1px", paddingBottom: "1px" }}
//           onClick={() => handleEdit(rowData)} />}
//         {handleDelete && <Button type="button" icon="pi pi-trash" className="p-button-danger p-button-rounded p-button-text p-mr-1" style={{ height: '27px', width: '27px', paddingTop: "1px", paddingBottom: "1px" }}
//           onClick={() => handleDelete(rowData)} />}
//         {handleDetail && <Button type="button" icon="pi pi-refresh" className="p-button-danger p-button-rounded p-button-text " style={{ height: '27px', width: '27px', paddingTop: "1px", paddingBottom: "1px" }}
//           onClick={() => handleDetail(rowData)} />}
//       </div>
//     );
//   };
// }


// export function toolTipBodyTemplate(rowData) {


//   return (
//     <td class="CellWithComment">{rowData?.kurumAdi}
//       <span class="CellComment">{rowData?.kurumAdi}</span>
//     </td>
//   );
// };

// export const iconBodyTemplate = (rowData) => {
//   return (
//     <div className="flex align-items-center gap-2">
//       {/* <img alt="flag" src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" 
//             className={`flag flag-${rowData.country.code}`} style={{ width: '24px' }} /> */}
//       <i className="pi pi-folder-open" style={{ fontSize: '18px', marginRight: '10px', color: 'black' }}></i>
//       <span>{rowData.name}</span>
//     </div>
//   );
// };

// export const fileIconBodyTemplate = (rowData) => {
//   return (
//     <div className="flex align-items-center gap-2">
//       {/* <img alt="flag" src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" 
//             className={`flag flag-${rowData.country.code}`} style={{ width: '24px' }} /> */}

//       {
//         rowData?.dataType === 'document' ? (
//           rowData?.extension === '.pdf' ?
//             <i className="pi pi-file-pdf" style={{ fontSize: '18px', marginRight: '10px', color: 'black' }}></i>
//             :
//             rowData?.extension === '.xlsx' || rowData?.extension === '.xls' ?
//               <i className="pi pi-file-excel" style={{ fontSize: '18px', marginRight: '10px', color: 'black' }}></i>
//               :
//               rowData?.extension === '.docx' ?
//                 <i className="pi pi-file" style={{ fontSize: '18px', marginRight: '10px', color: 'black' }}></i>
//                 :
//                 rowData?.extension === '.txt' ?
//                   <i className="pi pi-file" style={{ fontSize: '18px', marginRight: '10px', color: 'black' }}></i>
//                   :
//                   <i className="pi pi-file" style={{ fontSize: '18px', marginRight: '10px', color: 'black' }}></i>
//         ) :
//           <i className="pi pi-folder-open" style={{ fontSize: '18px', marginRight: '10px', color: 'black' }}></i>
//       }

//       <span>{rowData.name}</span>
//       {
//         rowData?.isFavorite === 'E' &&
//         <i className="pi pi-star" style={{ fontSize: '12px', marginLeft: '10px', color: 'black' }}></i>
//       }
//     </div>
//   );
// };

// export function tarihBodyTemplate(tarih) {
//   if (tarih) {
//     return tarih.substring(8, 10) + "/" + tarih.substring(5, 7) + "/" + tarih.substring(0, 4);
//   }
//   return null;
// }

// export function tarihSaatBodyTemplate(tarih) {
//   if (tarih) {
//     return tarih.substring(0, 10) + " " + tarih.substring(11, 19);
//   }
//   return null;
// }


// export function itemBodyTemplate(id, list) {

//   if (id) {
//     return list?.filter(val => (val.value ?? val.id) === id)
//       .map(val => val.label ?? val.adi)[0];
//   }
//   return null;
// }

// export function kullaniciAdSoyadBodyTemplate(id, list) {
//   if (id) {
//     return list?.filter(val => (val.value ?? val.id.toString()) === id.toString())
//       .map(val => val.adi + " " + val.soyadi)[0];
//   }
//   return null;
// }


// export function rollerBodyTemplate(ids, rolList) {
//   if (ids && ids.length) {
//     return rolList
//       ?.filter(val => ids.includes(val.value))
//       .map(val => val.label)
//       .join(' ');
//   }
//   return null;
// }

// export function kurumlarBodyTemplate(kurumId, kurumList) {
//   if (kurumId) {
//     return kurumList
//       ?.filter(val => kurumId === val.kurumId)
//       .map(val => val.kurumAdi)
//       .join(' ');
//   }
//   return null;
// }

// export function yetkiBirimlerBodyTemplate(birimlerId, birimList) {
//   if (birimlerId) {
//     return birimList
//       ?.filter(val => birimlerId === val.birimlerId)
//       .map(val => val.birimAdi)
//       .join(' ');
//   }
//   return null;
// }

// export function illerBodyTemplate(illerId, illerList) {
//   if (illerId) {
//     return illerList
//       ?.filter(val => illerId.toString() === val.illerId)
//       .map(val => val.adi)
//       .join(' ');
//   }
//   return null;
// }

// export function daRolBodyTemplate(value) {

//   if (Number(value) === 0) {
//     return "DUZENLEYEN";
//   }
//   else if (Number(value) === 1) {
//     return "YORUMCU"
//   } else if (Number(value) === 2) {
//     return "GORUNTULEYEN"
//   }
// }

// export function yetkiIlcelerBodyTemplate(ilcelerId, ilcelerList) {

//   if (ilcelerId) {
//     return ilcelerList
//       ?.filter(val => Number(ilcelerId) === val.ilcelerId)
//       .map(val => val.adi)
//       .join(' ');
//   }
//   return null;
// }

// export function onlyUnique(value, index, self) {
//   return self.indexOf(value) === index;
// }


// export function getKurumlar(kurumlar) {
//   return kurumlar?.Kurumlar?.map(val => ({ value: val.kurumId, label: val.kurumAdi }));
// }

// export function getBolgeler(bolgeler) {
//   return bolgeler?.Bolgeler?.map(val => ({ value: val.bolgeKodu, label: val.bolgeAdi }));
// }

// export function listeyiKapsiyor(base, other) {
//   for (const val of other) {
//     if (!base.includes(val)) {
//       return false;
//     }
//   }
//   return true;
// }

// export function getFirmalar(firmalar) {
//   return firmalar?.map(val => ({ value: val.id, label: val.firmaAdi }));
// }
// export function getSubeler(subeler) {
//   return subeler?.map(val => ({ value: val.id, label: val.subeAdi }));
// }
// export function getSehirler(sehirler) {
//   return sehirler?.map(val => ({ value: val.id, label: val.adi }));
// }
// export function getIlceler(ilceler) {
//   return ilceler?.map(val => ({ value: val.id, label: val.adi }));
// }
// export function getIlcelerBySehirId(ilceler, sehirId) {
//   return ilceler?.filter(val => (val.illerId === sehirId))
//     .map(val => ({ value: val.ilcelerId, label: val.adi }));
// }

// export function getBolgeKoduByBolgeId(bolgeler, bolgeId) {
//   return bolgeler?.Bolgeler?.filter(val => (val.bolgeId === bolgeId))
//     .map(val => val.bolgeKodu);
// }

// export function getBolgeIdByBolgeKodu(bolgeler, bolgeKodu) {
//   return bolgeler?.Bolgeler?.filter(val => (val.bolgeKodu === bolgeKodu))
//     .map(val => val.bolgeId);
// }

// export function getBolgeKoduByVezneKodu(vezneler, vezneKodu) {
//   return vezneler?.Vezneler?.filter(val => (val.vezneKodu === vezneKodu))
//     .map(val => val.bolgeKodu);
// }


// export function getRoller(roller) {
//   return roller?.map(val => ({ value: val.id, label: val.adi }));
// }

// export function getIller(iller) {
//   return iller?.map(val => ({ value: val.ilKodu || val.illerId, label: val.ilAdi || val.adi }));
// }

// export function yetkiTipleriTemplate(rowData) {
//   return yetkiTipleri.filter(val => val.value === rowData.tipi)[0]?.label;
// }

// export function yetkiParentIdTemplate(yetkiler) {
//   return rowData => {
//     if (rowData.parentId) {
//       return yetkiler.filter(val => val.id === rowData.parentId)[0]?.adi;
//     }
//     return null;
//   };
// }
// export function toTreeData(data, idKey = 'id', parentKey = 'parentId', childrenKey = 'children') {
//   const tree = [];
//   const childrenOf = {};

//   data
//     .map(val => ({ ...val, key: val[idKey], label: `${val.adi} ( ${val.tipi} )` }))
//     .forEach((item) => {
//       const { [idKey]: id, [parentKey]: parentId = 0 } = item;
//       childrenOf[id] = childrenOf[id] || [];
//       item[childrenKey] = childrenOf[id];


//       parentId
//         ? (
//           childrenOf[parentId] = childrenOf[parentId] || []
//         ).push(item)
//         : tree.push(item);
//     });

//   return tree;
// }

// export function getSubField(val, fieldStr) {
//   let res = val;
//   for (const field of fieldStr.split('.')) {
//     res = res[field];
//     if (!res) break;
//   }
//   return res;
// }

// export function convertDateRangeToGMT3(dateRange) {
//   let startDate = dateRange[0]?._d ? dateRange[0]?._d : dateRange[0];
//   let endDate = dateRange[1]?._d ? dateRange[1]?._d : dateRange[1];
//   if (startDate) {
//     startDate = new Date(startDate);
//     startDate.setHours(startDate.getHours() + 3);
//   }
//   if (endDate) {
//     endDate = new Date(endDate);
//     endDate.setHours(endDate.getHours() + 3);
//   }
//   const newDateRange = [startDate, endDate];
//   return newDateRange;
// }
// export function convertDateToGMT3(date) {
//   if (date) {
//     date = new Date(date);
//     date.setHours(date.getHours() + 3);
//     return date;
//   }
// }

// export function getTimeFromDate(date) {
//   if (date) {
//     date = date.toString();
//     return date.substring(16, 21);
//   }
// }

// export function convertDayToMonth(date) {
//   if (date) {

//     const ay = date.substring(0, 2);
//     const gun = date.substring(3, 5);
//     const yil = date.substring(6, 10);
//     return gun + "/" + ay + "/" + yil;
//   }
// }


// export function firstDayOfCurrentMonth() {
//   const date = new Date();
//   const y = date.getFullYear();
//   const m = date.getMonth();
//   const firstDay = new Date(y, m, 1);//ayın ilk günü
//   return firstDay;

// }


// export function convertDateToString(d) {
//   if (d) {
//     var date = new Date(d),
//       mnth = ("0" + (date.getMonth() + 1)).slice(-2),
//       day = ("0" + date.getDate()).slice(-2);
//     return [date.getFullYear(), mnth, day].join("/");
//   }
// }

// export function convertDateTimeToStringGMT3(d) {

//   if (d) {
//     var date = new Date(d),
//       mnth = ("0" + (date.getMonth() + 1)).slice(-2),
//       day = ("0" + date.getDate()).slice(-2),
//       hours = ("0" + date.getHours()).slice(-2),
//       minutes = ("0" + date.getMinutes()).slice(-2),
//       seconds = ("0" + date.getSeconds()).slice(-2);

//     return [day, mnth, date.getFullYear()].join("/") + " " + [hours, minutes, seconds].join(":");
//   }
// }


// export function convertDateToJavaUtilDate(d) {
//   if (d) {
//     var date = new Date(d),
//       mnth = ("0" + (date.getMonth() + 1)).slice(-2),
//       day = ("0" + date.getDate()).slice(-2);
//     return [day, mnth, date.getFullYear()].join("/");
//   } else {
//     return null;
//   }
// }

// export function getDay(d) {
//   if (d) {
//     var date = new Date(d),
//       day = ("0" + date.getDate()).slice(-2);
//     return day;
//   } else {
//     return null;
//   }
// }

// export function getYear(d) {
//   if (d) {
//     var date = new Date(d)
//     return date.getFullYear();
//   } else {
//     return null;
//   }
// }

// export async function assignParameterToVariable(tabloAdi, setDegisken, kodVarMi) {
//   const parameters = await getParametreByTabloAdi(tabloAdi);
//   if (kodVarMi) {
//     setDegisken(parameters?.map(val => ({ ...val, value: val.kodu, label: val.aciklama + " [" + val.kodu + "]" })));
//   }
//   else {
//     setDegisken(parameters?.map(val => ({ ...val, value: val.kodu, label: val.aciklama })));
//   }
// }

// export async function assignParameterToVariableWithAciklama(tabloAdi, setDegisken, kodVarMi) {
//   const parameters = await getParametreByTabloAdi(tabloAdi);
//   if (kodVarMi) {
//     setDegisken(parameters?.map(val => ({ value: val.aciklama, label: val.aciklama + " [" + val.kodu + "]" })));
//   }
//   else {
//     setDegisken(parameters?.map(val => ({ value: val.aciklama, label: val.aciklama })));
//   }
// }

// export async function getParametreByTabloAdi(tabloAdi) {
//   const res = await callAPI({
//     method: GET,
//     url: 'api/2.0/yetki/yetki-parametre-by-tablo-adi',
//     params: { tabloAdi: tabloAdi },
//   });
//   const newParametre = res.data.YetkiParametre;
//   return newParametre;
// }

// export async function getFndRegValue(groupCode, stringName) {
//   const res = await callAPI({
//     method: GET,
//     url: 'api/2.0/abone/get-fnd-reg-value',
//     params: { groupCode: groupCode, stringName: stringName },
//   });
//   return res.data.FndRegValue?.stringValue;
// }

// export async function getBaslangicUnvanlar(sira) {
//   const res = await callAPI({
//     method: GET,
//     url: 'api/2.0/yetki/yetki-surec-detay-baslangic-unvan',
//     params: { sira: sira },
//   });
//   return res.data.YetkiSurecDetay[0]?.tanim;
// }

// export function handleOpenTab(item, openTabs, history) {
//   // TABS görünümü için.
//   if (item.to) {
//     const existingItem = openTabs.find(val => val.to === item.to);
//     if (existingItem) {
//       const newOpenTabs = [];
//       for (const openTab of openTabs) {
//         if (openTab.to === item.to) {
//           newOpenTabs.push({ ...openTab, sonTiklandi: true });
//           history.push(item.to)
//         } else {
//           newOpenTabs.push({ ...openTab, sonTiklandi: false });
//         }
//       }
//       subjectPublish(openTabsSubject, newOpenTabs);
//     } else {
//       const newOpenTabs = [];
//       for (const openTab of openTabs) {
//         newOpenTabs.push({ ...openTab, sonTiklandi: false });
//       }
//       newOpenTabs.push({ ...item, sonTiklandi: true });
//       history.push(item.to)
//       subjectPublish(openTabsSubject, newOpenTabs);
//     }
//   }
// }

// export function handleCloseCurrentTab(openTabs) {
//   const pathname = window.location.hash.replace("#", "");
//   const newOpenTabs = openTabs.filter(val => val.to !== pathname);
//   subjectPublish(openTabsSubject, newOpenTabs);
// }

// export function handleCloseCurrentTabAndOpenNewTab(item, openTabs, history) {
//   const pathname = window.location.hash.replace("#", "");
//   const newOpenTabs = openTabs.filter(val => val.to !== pathname);
//   handleOpenTab(item, newOpenTabs, history);
// }

// export function handleAllTabsClose(openTabs) {
//   const newOpenTabs = [];
//   newOpenTabs.push({ ...openTabs[0], sonTiklandi: true });
//   getGlobalToast().show({ severity: 'info', summary: 'Tüm Sekmeler Kapandı.', life: 3000 });
//   subjectPublish(openTabsSubject, newOpenTabs);
// }

// export function handleAddFavorites(options, openTabs) {
//   let tab;
//   //Eski ekranlar ekleniyor ise openTabs parametresi boş geliyor...eminT
//   if (!openTabs) {
//     if (options.action) {
//       tab = { label: renderToString(options.label).replace(/<[^>]+>/g, ''), action: options.action, menuId: options.id };
//     } else if (options.to) {
//       tab = { label: renderToString(options.label).replace(/<[^>]+>/g, ''), to: options.to };
//     }
//   } else {
//     tab = { ...openTabs[options.index] };
//     tab = { label: renderToString(tab.label).replace(/<[^>]+>/g, ''), to: tab.to };
//   }
//   let mevcutFavorilerim = JSON.parse(localStorage.getItem(favoritesKey));
//   const tmp = mevcutFavorilerim.find(val => isObjectEqual(val, tab))
//   if (tmp) {
//     let newFavorilerim = mevcutFavorilerim.filter(val => !isObjectEqual(val, tab));
//     localStorage.setItem(favoritesKey, JSON.stringify(newFavorilerim));
//     getGlobalToast().show({ severity: 'info', summary: `${tab.label} sayfası favorilerden çıkartıldı!`, life: 3000 });
//   } else {
//     mevcutFavorilerim.push(tab);
//     localStorage.setItem(favoritesKey, JSON.stringify(mevcutFavorilerim));
//     getGlobalToast().show({ severity: 'success', summary: `${tab.label} sayfası favorilere eklendi!`, life: 3000 });
//   }
// }

// export function handleRemoveFavorites(options) {
//   let tab;
//   if (options.action) {
//     tab = { label: renderToString(options.name).replace(/<[^>]+>/g, ''), action: options.action, menuId: options.menuId };
//   } else if (options.to) {
//     tab = { label: renderToString(options.name).replace(/<[^>]+>/g, ''), to: options.to };
//   } let mevcutFavorilerim = JSON.parse(localStorage.getItem(favoritesKey));
//   const tmp = mevcutFavorilerim.find(val => isObjectEqual(val, tab));
//   if (tmp) {
//     let newFavorilerim = mevcutFavorilerim.filter(val => !isObjectEqual(val, tab));
//     localStorage.setItem(favoritesKey, JSON.stringify(newFavorilerim));
//     getGlobalToast().show({ severity: 'info', summary: `${tab.label} sayfası favorilerden çıkartıldı!`, life: 3000 });
//   }
// }

// export function handleRefreshTab(options, openTabs) {
//   let tab = { ...openTabs[options.index] };
//   let newOpenTabs = openTabs.map((val, i) => (i === options.index) ? { label: '', to: '', sonTiklandi: false } : { ...val })
//   subjectPublish(openTabsSubject, newOpenTabs);
//   newOpenTabs = openTabs.map((val, i) => (i === options.index) ? { ...tab } : { ...val })
//   subjectPublish(openTabsSubject, newOpenTabs)
// }

// export function popUpAc(url) {
//   window.open(url, 'popUpWindow', 'height=700,width=1500,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
// }

// export function pasaportYetkiKontrol(activeUser) {
//   if (
//     activeUser?.personelUnvanId === 20070 ||
//     activeUser?.personelUnvanId === 20075 ||
//     activeUser?.personelUnvanId === 20005 ||
//     activeUser?.personelUnvanId === 20033 ||
//     activeUser?.personelUnvanId === 20002 ||
//     activeUser?.personelUnvanId === 20012 ||
//     activeUser?.personelUnvanId === 20023 ||
//     activeUser?.personelUnvanId === 20301 ||
//     activeUser?.personelUnvanId === 20072 ||
//     activeUser?.personelUnvanId === 20200 ||
//     activeUser?.personelUnvanId === 20019 ||
//     activeUser?.personelUnvanId === 20066 ||
//     activeUser?.personelUnvanId === 20283 ||
//     activeUser?.personelUnvanId === 20013 ||
//     activeUser?.personelUnvanId === 20015 ||
//     activeUser?.personelUnvanId === 20008 ||
//     activeUser?.personelUnvanId === 20010 ||
//     activeUser?.personelUnvanId === 20027 ||
//     activeUser?.personelUnvanId === 20084
//   ) {
//     return true;
//   } else {
//     return false;
//   }
// }

// export async function eskiBbsPopUpAc(activeUser, menuId) {
//   //pasaport menüsüne erişim için kontrolde kullanıldı. Geçici düzeltilecek.
//   let yetkiKontrol = true;
//   if (menuId === 17106) {
//     yetkiKontrol = pasaportYetkiKontrol(activeUser);
//   }
//   if (yetkiKontrol) {
//     let kullaniciId = '&kullaniciId=' + activeUser.id;
//     const res = await callAPI({ method: GET, url: 'api/2.0/yetki/yetki-kullanici-sso-key-guncelle' });
//     const key = res.data.YetkiKullanici;
//     window.open(`${ESKI_BBS_CANLI}/botas/yetki/login.do?islem=inDoorGoPage${kullaniciId}&key=${key}&menuId=${menuId}`, "_blank", 'height=700,width=1500,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
//   } else {
//     getGlobalToast().show({ severity: 'error', summary: 'Bu menüye erişim yetkiniz yoktur!', life: 3000 });
//   }
// }

// export async function code2BbsPopUpAc(activeUser, projectUuid, roleId) {
//   let kullaniciId = '&kullaniciId=' + activeUser.id;
//   const res = await callAPI({ method: GET, url: 'api/2.0/yetki/yetki-kullanici-sso-key-guncelle' });
//   const key = res.data.YetkiKullanici;
//   window.open(`${CODE2_BBS_CANLI}/showPage?_tid=10722${kullaniciId}&key=${key}&projectUuid=${projectUuid}&roleId=${roleId}`, "_blank", 'height=700,width=1500,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
// }


// export async function eskiBbsTarayiciAc(activeUser, evrakno) {
//   let kullaniciId = '&kullaniciId=' + activeUser.id;
//   let menuId = '22773';
//   const res = await callAPI({ method: GET, url: 'api/2.0/yetki/yetki-kullanici-sso-key-guncelle' });
//   const key = res.data.YetkiKullanici;
//   window.open(`${ESKI_BBS_CANLI}/botas/yetki/login.do?islem=inDoorGoPage${kullaniciId}&key=${key}&menuId=${menuId}&token=${activeUser?.token}&evrakno=${evrakno}`, 'popUpWindow', 'height=700,width=1500,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
// }

// export async function eskiBbsBarkodAc(activeUser, tarih, rprSayi, birim) {
//   let kullaniciId = '&kullaniciId=' + activeUser.id;
//   let menuId = '22774';
//   const res = await callAPI({ method: GET, url: 'api/2.0/yetki/yetki-kullanici-sso-key-guncelle' });
//   const key = res.data.YetkiKullanici;
//   window.open(`${ESKI_BBS_CANLI}/botas/yetki/login.do?islem=inDoorGoPage${kullaniciId}&key=${key}&menuId=${menuId}&tarih=${tarih}&rprSayi=${rprSayi}&birim=${birim}`, 'popUpWindow', 'height=700,width=1500,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
// }

// export function eImzaPopUpAc(url) {
//   let eImzaWindow = window.open(url, 'eImzaWindow', 'height=700,width=1500,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
//   delay(2000).then(() => eImzaWindow?.close());
// }

// export function popUpAcVeYazdir(url) {
//   window.open(url, 'popUpWindow', 'height=700,width=1500,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');

// }

// //Kelimelerin ilk harflerini büyük yapar
// export function capitalizeTheFirstLetterOfEachWord(words) {
//   var separateWord = words.toLowerCase().split(' ');
//   for (var i = 0; i < separateWord.length; i++) {
//     separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
//       separateWord[i].substring(1);
//   }
//   return separateWord.join(' ');
// }

// //2 objenin value larının eşitliğini kıyaslar
// export function isObjectEqual(obj1, obj2) {
//   var props1 = Object.getOwnPropertyNames(obj1);
//   var props2 = Object.getOwnPropertyNames(obj2);
//   if (props1.length !== props2.length) {
//     return false;
//   }
//   for (var i = 0; i < props1.length; i++) {
//     let val1 = obj1[props1[i]];
//     let val2 = obj2[props1[i]];
//     let isObjects = isObject(val1) && isObject(val2);
//     if ((isObjects && !isObjectEqual(val1, val2)) || (!isObjects && val1 !== val2)) {
//       return false;
//     }
//   }
//   return true;
// }

// export function findKullanicilarBySurecIsKolu(kullanicilar, birimler, surecIsKolu) {
//   const newKullanicilar = kullanicilar.map(kullanici => ({ ...kullanici, surecIsKolu: birimler?.filter(birim => birim.birimlerId === kullanici.birimId)[0]?.surecIsKolu }));
//   return newKullanicilar.filter(kul => kul?.surecIsKolu?.includes(surecIsKolu));
// }

// //Açık olan sekmeler ve options'ın içerisinden alınan index bilgisi ile beraber sekmenin favori sekme olup olmadığı dönülür.
// export function isFavorite(options, openTabs) {
//   let tab = { ...openTabs[options.index] };
//   tab = { label: renderToString(tab.label).replace(/<[^>]+>/g, ''), to: tab.to };
//   let mevcutFavorilerim = JSON.parse(localStorage.getItem(favoritesKey));
//   const tmp = mevcutFavorilerim.find(val => isObjectEqual(val, tab))
//   if (tmp) {
//     return true;
//   } else {
//     return false;
//   }
// }

// export function isObjectNullOrEmpty(obj) {
//   const isNullish = Object.values(obj).every(value => {
//     if (value === null || value === '' || value === undefined || (value.length === 0 && value.constructor === Object)) {
//       return true;
//     }
//     return false;
//   });
//   return isNullish;
// }

// export function isObjectKeysEmpty(obj) {
//   const keys = Object.keys(obj);

//   if (keys.length === 0) {
//     return true;
//   }

//   return false;
// }

// export function generateRandomColor() {
//   return Math.floor(Math.random() * 16777215).toString(16);
// }

// export function getColorByName(value) {
//   return Math.floor(value.charCodeAt() / 100 * 16777215).toString(16);
// }

// export function convertTurkishToEnglish(value) {
//   let charMap = {
//     Ç: 'C',
//     Ö: 'O',
//     Ş: 'S',
//     İ: 'I',
//     I: 'I',
//     Ü: 'U',
//     Ğ: 'G',
//     ç: 'c',
//     ö: 'o',
//     ş: 's',
//     ı: 'i',
//     ü: 'u',
//     ğ: 'g'
//   };

//   var str = value.replaceAll(' ', '*');
//   let str_array = str.split('');
//   for (var i = 0, len = str_array.length; i < len; i++) {
//     str_array[i] = charMap[str_array[i]] || str_array[i];
//   }

//   str = str_array.join('');

//   let clearStr = str.replaceAll('*', ' ');
//   return clearStr;
// }

// export function compareByName(a, b) {
//   if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
//     return -1;
//   }
//   if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
//     return 1;
//   }
//   return 0;
// }

// export function compareBySira(a, b) {
//   if (a.sira < b.sira) {
//     return -1;
//   }
//   if (a.sira > b.sira) {
//     return 1;
//   }
//   return 0;
// }

// //1. sırada genel müdür yardımcıları altında daire başkanları onun altındada kalan grup kodlu birimler listelenir.eminT
// export function sortByGrupKodu(array) {
//   let temp = [];
//   for (let index = 0; index < array.length; index++) {
//     if (array[index]?.grupkodu === "GNMDYRD") {
//       temp.push({ ...array[index], sira: 1 });
//     } else if (array[index]?.grupkodu === "DAIREBSK") {
//       temp.push({ ...array[index], sira: 2 });
//     } else {
//       temp.push({ ...array[index], sira: 3 });
//     }
//   }
//   return temp.sort(compareBySira);
// }

// export function avatarBodyTemplate(value) {
//   return (
//     <div className="box avatar p-pt-0" style={{ display: 'flex', alignItems: 'center' }}>
//       <Avatar label={value?.charAt(0).toUpperCase()} style={{ width: '25px', height: '25px', marginRight: '8px' }} shape="circle">
//       </Avatar>
//       {value}
//     </div>
//   )
// }

// export function avatarGroupBodyTemplate(permissions, kullanicilar, activeUserId) {
//   return (
//     <div className="box avatar p-pt-0" style={{ display: 'flex', alignItems: 'center' }}>
//       <AvatarGroup>
//         {permissions?.filter(val => val.userId !== activeUserId).map((value, index) => {
//           const kullaniciAdi = kullanicilar?.find(val => val.id === value.userId)?.kullaniciAdi;
//           return (
//             <React.Fragment key={index}>
//               <Avatar
//                 label={kullaniciAdi?.charAt(0).toUpperCase()}
//                 style={{ width: '25px', height: '25px', marginRight: '8px' }}
//                 size="large"
//                 shape="circle"
//                 data-pr-tooltip={kullaniciAdi}
//                 data-pr-position="top"
//               />
//             </React.Fragment>
//           );
//         })}
//       </AvatarGroup>
//       <Tooltip target=".p-avatar" />
//     </div>
//   );
// }

// export function actionBodyTemplateDosyaTasi(handleTasi, rowData, selectedFolderDocument) {
//   return (
//     <div style={{ width: "fit-content" }}>
//       {handleTasi &&
//         <Button
//           type="button"
//           label='Taşı'
//           className="p-button-primary"
//           style={{ height: '25px', width: '50px' }}
//           onClick={() => handleTasi(rowData)}
//           disabled={rowData?.id === selectedFolderDocument?.id}
//         />}
//     </div>
//   );
// }

