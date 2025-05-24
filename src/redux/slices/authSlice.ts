import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User, UserRole } from '@/lib/types';
import { MOCK_USERS } from '@/lib/constants';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

// Mock login function (to be replaced with real API calls)
export const loginUser = (email: string, password: string) => {
  return async (dispatch: any) => {
    dispatch(loginStart());
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user with matching email (in a real app, this would be a server-side check)
      const foundUser = Object.values(MOCK_USERS).find(user => user.email === email);
      
      if (foundUser && password === 'password') { // Simple mock password check
        dispatch(loginSuccess(foundUser));
        return true;
      } else {
        dispatch(loginFailure('Invalid email or password'));
        return false;
      }
    } catch (error) {
      dispatch(loginFailure('An error occurred during login'));
      return false;
    }
  };
};

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;