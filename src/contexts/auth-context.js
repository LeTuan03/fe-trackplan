import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import { authenticationServices } from 'src/services/authServices';
import { STATUS } from 'src/appConst';
import { addAccount } from 'src/services/customerServices';

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
    } catch (err) {
      console.error(err);
    }

    dispatch({
      type: HANDLERS.INITIALIZE
    });
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const signIn = async (username, password) => {
    try {
      const data = await authenticationServices({ username, password });
      console.log(data)
      if (data?.status === STATUS.SUCCESS) {
        sessionStorage.setItem("currentUser", JSON.stringify(data?.data))
        dispatch({
          type: HANDLERS.SIGN_IN,
          payload: data?.data
        });
      }
    } catch (error) {
      console.log(error)
      throw new Error('Please check your email and password');
    }
  };

  const signUp = async (email, username, password) => {
    try {
      const data = await addAccount({ username, password, email, role: 1 });
      // if (data?.status === STATUS.SUCCESS) {
      // sessionStorage.setItem("currentUser", JSON.stringify(data?.data))
      //   dispatch({
      //     type: HANDLERS.SIGN_IN,
      //     payload: data?.data
      //   });
      // }
    } catch (error) {
      console.log(error)
      throw new Error('Please check your email and password');
    }
  };

  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        // skip,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
