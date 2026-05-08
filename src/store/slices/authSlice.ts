import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: { email: string; username: string; _id: number } | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const tokenRes = await fetch('https://webdev-music-003b5b991590.herokuapp.com/user/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!tokenRes.ok) {
        const error = await tokenRes.json();
        return rejectWithValue(error.message || 'Ошибка авторизации');
      }
      
      const tokens = await tokenRes.json();
      
      const userRes = await fetch('https://webdev-music-003b5b991590.herokuapp.com/user/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const userData = await userRes.json();
      
      localStorage.setItem('accessToken', tokens.access);
      localStorage.setItem('refreshToken', tokens.refresh);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return { tokens, user: userData };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: { email: string; password: string; username: string }, { rejectWithValue }) => {
    try {
      const signupRes = await fetch('https://webdev-music-003b5b991590.herokuapp.com/user/signup/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const signupData = await signupRes.json();
      
      if (!signupRes.ok) {
        return rejectWithValue(signupData.message || 'Ошибка регистрации');
      }
      
      const tokenRes = await fetch('https://webdev-music-003b5b991590.herokuapp.com/user/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });
      
      const tokens = await tokenRes.json();
      
      localStorage.setItem('accessToken', tokens.access);
      localStorage.setItem('refreshToken', tokens.refresh);
      localStorage.setItem('user', JSON.stringify(signupData.result));
      
      return { tokens, user: signupData.result };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const restoreSession = createAsyncThunk(
  'auth/restore',
  async () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const userStr = localStorage.getItem('user');
    
    if (accessToken && refreshToken && userStr) {
      return {
        accessToken,
        refreshToken,
        user: JSON.parse(userStr),
      };
    }
    throw new Error('No session');
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.accessToken = action.payload.tokens.access;
        state.refreshToken = action.payload.tokens.refresh;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.accessToken = action.payload.tokens.access;
        state.refreshToken = action.payload.tokens.refresh;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;