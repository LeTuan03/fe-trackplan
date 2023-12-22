import { createContext, useContext, useEffect, useReducer, useRef } from "react";
import PropTypes from "prop-types";
import { authenticationServices } from "src/services/authServices";
import { STATUS } from "src/appConst";
import { addAccount } from "src/services/customerServices";

const HANDLERS = {
  INITIALIZE: "INITIALIZE",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...// if payload (user) is provided, then is authenticated
      (user
        ? {
            isAuthenticated: true,
            isLoading: false,
            user,
          }
        : {
            isLoading: false,
          }),
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

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
      isAuthenticated = window.sessionStorage.getItem("authenticated") === "true";
    } catch (err) {
      console.error(err);
    }

    dispatch({
      type: HANDLERS.INITIALIZE,
      payload: isAuthenticated ? JSON.parse(window.sessionStorage.getItem("currentUser")) : null,
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
      if (data?.status === STATUS.SUCCESS) {
        sessionStorage.setItem("currentUser", JSON.stringify(data?.data));
        window.sessionStorage.setItem("authenticated", "true");
        dispatch({
          type: HANDLERS.SIGN_IN,
          payload: data?.data,
        });
      }
    } catch (error) {
      if (error?.response?.status === STATUS.UNAUTHORIZED) {
        throw new Error(error?.response?.data?.message);
      } else if (error?.response?.status === STATUS.ERROR) {
        throw new Error(error?.response?.data?.message);
      } else {
        throw new Error("Please check your email and password");
      }
    }
  };

  const signUp = async (email, username, password, role) => {
    try {
      const data = await addAccount({ username, password, email, role });
    } catch (error) {
      if (error?.response?.status === STATUS.ERROR) {
        throw new Error(error?.response?.data?.message);
      } else {
        throw new Error("Please check your email and password");
      }
    }
  };

  const signOut = () => {
    try {
      window.sessionStorage.removeItem("authenticated");
      dispatch({
        type: HANDLERS.SIGN_OUT,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
