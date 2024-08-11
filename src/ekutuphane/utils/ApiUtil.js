import qs from 'qs';
import axios from 'axios';

import { ISLEM_SEARCH } from './BbsConst';
import { userKey, usersKey } from './constants';

const userItem = localStorage.getItem(userKey);
export const axiosData = { user: userItem ? JSON.parse(userItem) : null };
const axiosObj = axios.create({
  paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
});

axiosObj.interceptors.response.use(
    response => response,
    error => {
      if (error?.response?.status === 403) {
        if (localStorage.getItem(userKey)) {
          localStorage.removeItem(userKey);
          localStorage.removeItem(usersKey);
          axiosData.user = null;
          window.location.reload();
        }
      }
      return Promise.reject(error);
    }
  );

export const GET = 'get';
export const POST = 'post';
export const PUT = 'put';
export const DELETE = 'delete';

export async function callAPI({ method, url, headers, params, data, logError = true, setLoading, responseType, requiredArray, islem, toast = true, toastMessage, toastSeverity ,deleteMessage, onUploadProgress }) {

  
  if (setLoading) {
    setLoading(true);
  }
  if ((method === PUT || method === POST) && (islem !== ISLEM_SEARCH)) {
    // if (handleRequiredCheck(requiredArray)?.length) {
    //   warningService.show({ message: handleRequiredCheck(requiredArray) });
    //   setLoading(false);
    //   return null;
    // }
  }
  try {
    const res = await axiosObj({
      method,
      url: `${process.env.REACT_APP_API_URL}/${url}`,
      headers: { ...headers, Authorization: `Bearer ${axiosData.user?.token}` },
      params,
      data,
      onUploadProgress,
      responseType
    });
    if (setLoading) {
      setLoading(false);
    }
    // if (method === POST && islem !== ISLEM_SEARCH && toast && !toastMessage) {
    //   getGlobalToast().show({ severity: toastSeverity ?? 'success', summary: 'Kayıt başarı ile eklenmiştir', life: 3000 });
    // } else if (method === PUT && toast) {
    //   getGlobalToast().show({ severity: toastSeverity ?? 'success', summary: 'Kayıt başarı ile güncellenmiştir', life: 3000 });
    // } else if (method === DELETE && toast) {
    //   getGlobalToast().show({ severity: toastSeverity ?? 'success', summary: 'Kayıt başarı ile silinmiştir.', life: 3000 });
    // }else if(toastMessage){
    //   getGlobalToast().show({ severity: toastSeverity ?? 'success', summary: toastMessage, life: 3000 });
    // }
    return res;

  } catch (e) {
    if (e?.response?.status !== 403) {
      if (setLoading) {
        setLoading(false);
      }
    //   getGlobalToast().show({ severity: 'error', summary: 'UYARI', detail: <p>{e.response?.data?.message}</p>, life: 3000 });
    //   if (e?.response?.data?.errors?.length) {
    //     getGlobalToast().show({ severity: 'error', summary: 'UYARI ', detail: <p>{e?.response?.data?.errors?.map(val => <>{val?.defaultMessage}<br /></>)}</p>, life: 3000 });
    //   }
    }

    throw e;
  }


}



