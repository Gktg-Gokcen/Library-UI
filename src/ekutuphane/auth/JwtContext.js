/* eslint-disable */
import PropTypes from 'prop-types';
import { createContext, useReducer, useCallback, useMemo, useEffect } from 'react';
import axios from '../utils/axios';
import localStorageAvailable from '../utils/localStorageAvailable';
import { isValidToken, setSession } from './utils';
import { useLocales } from 'src/locales';
import { ACTIVE } from 'src/ortak/constant';
import { PATH_AUTH } from 'src/routes/paths';
import { GET, callAPI } from 'src/utils/axiosUtils';

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
  usage: null,
  templates: []
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
      usage: action.payload.usage,
      templates: action.payload.templates
    };
  }
  if (action.type === 'USAGE') {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: state.user,
      usage: action.payload.usage,
      templates: state.templates
    };
  }
  if (action.type === 'LOGIN') {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
      usage: action.payload.usage,
      templates: action.payload.templates
    };
  }
  if (action.type === 'REGISTER') {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
      usage: action.payload.usage,
    };
  }
  if (action.type === 'GOOGLE') {

    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
      usage: action.payload.usage,
      templates: action.payload.templates
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }

  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext(null);

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};


export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const storageAvailable = localStorageAvailable();
  const { onChangeLang } = useLocales();


  const initialize = useCallback(async () => {

    try {

      const access_token = storageAvailable ? localStorage.getItem('access_token') : '';

      if (access_token && isValidToken(access_token)) {
        setSession(access_token);
        const response = await axios.get('/user');
        const user = response.data;
        if (user) {
          const res = await callAPI({
            method: GET,
            url: `usage`,
          });

          const resTemplate = await callAPI({
            method: GET,
            url: `template/findAll`,
          });

          dispatch({
            type: 'INITIAL',
            payload: {
              isAuthenticated: true,
              user,
              usage: res.data,
              templates: resTemplate.data,
            },
          });
        } else {
          dispatch({
            type: 'INITIAL',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [storageAvailable]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email, username, password) => {
    try {
      const response = await axios.post('/auth/login/', {
        email,
        username,
        password,
      });

      const { access_token, user } = response.data;

      if (user.active === ACTIVE.YES && access_token) {
        localStorage.setItem("access_token", access_token);
        setSession(access_token);
        onChangeLang(user?.system_language ?? 'en');
        const res = await callAPI({
          method: GET,
          url: `usage`,
        });
        const resTemplate = await callAPI({
          method: GET,
          url: `template/findAll`,
        });
        dispatch({
          type: 'LOGIN',
          payload: {
            user,
            usage: res.data,
            templates: resTemplate.data,
          },
        });
      } else if (user.active === ACTIVE.PENDING) {
        localStorage.setItem("email", user.email);
        window.location.href = PATH_AUTH.authCreate;
      }

    } catch (error) {
      throw new Error(error.errorMessage)
    }
  }, []);

  // REFRESH
  const refresh = useCallback(async () => {
    const access_token = storageAvailable ? localStorage.getItem('access_token') : '';

    if (access_token && isValidToken(access_token)) {
      setSession(access_token);
      const response = await axios.get('/user');

      const user = response.data;
      localStorage.setItem("access_token", access_token);
      setSession(access_token);
      onChangeLang(user?.system_language ?? 'en');
      const res = await callAPI({
        method: GET,
        url: `usage`,
      });

      const resTemplate = await callAPI({
        method: GET,
        url: `template/findAll`,
      });

      dispatch({
        type: 'INITIAL',
        payload: {
          isAuthenticated: true,
          user,
          usage: res?.data,
          templates: resTemplate?.data,
        },
      });
    }
  }, [storageAvailable]);

  // USAGE
  const refreshUsage = useCallback(async () => {
    const access_token = storageAvailable ? localStorage.getItem('access_token') : '';

    if (access_token && isValidToken(access_token)) {
      const res = await callAPI({
        method: GET,
        url: `usage`,
      });
      dispatch({
        type: 'USAGE',
        payload: {
          isAuthenticated: true,
          user: state.user,
          templates: state.templates,
          usage: res.data
        },
      });
    }
  }, [storageAvailable]);

  // REGISTER
  const register = useCallback(async (name, lastname, email, password) => {
    const response = await axios.post('/user/create', {
      name,
      lastname,
      email,
      password,
    });

    const { access_token, user } = response.data;

    if (user.active === ACTIVE.YES && access_token) {
      localStorage.setItem('access_token', access_token);
      dispatch({
        type: 'REGISTER',
        payload: {
          user,
        },
      });
    } else if (user.active === ACTIVE.PENDING) {
      localStorage.setItem("email", user.email);
      window.location.href = PATH_AUTH.authCreate;
    }


  }, []);


  const loginWithGoogle = useCallback(async (res) => {
    const credentialResponse = res.data;
    const response = await axios.post('auth/google-login', {
      credentialResponse
    });

    const { access_token, user } = response.data;

    onChangeLang(user?.system_language ?? 'en');

    localStorage.setItem('access_token', access_token);

    const usage = await callAPI({
      method: GET,
      url: `usage`,
    });

    const resTemplate = await callAPI({
      method: GET,
      url: `template/findAll`,
    });

    dispatch({
      type: 'GOOGLE',
      payload: {
        user,
        usage: usage?.data,
        templates: resTemplate?.data
      },
    });
  }, []);

  // LOGOUT
  const logout = useCallback(() => {
    setSession(null);
    dispatch({
      type: 'LOGOUT',
    });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      usage: state.usage,
      templates: state.templates,
      method: 'jwt',
      login,
      register,
      loginWithGoogle,
      logout,
      refresh,
      refreshUsage,
    }),
    [state.isAuthenticated, state.isInitialized, state.user, state.usage, state.templates, login, register, loginWithGoogle, logout, refresh, refreshUsage]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
