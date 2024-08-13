// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from '../axios/axios';

// import { type IUser } from '../types/User';
// import { STATUS } from '../types/Status';
// import { type RootType } from './store';

// interface ILogin {
//   phone: string;
//   password: string;
// }

// export const fetchLogin = createAsyncThunk<IUser, ILogin>(
//   'auth/fetchLogin',
//   async (params, thunkAPI) => {
//     const { data } = await axios.post('/auth/login', { ...params });
//     if (data?.role === 'ADMIN' || data?.role === 'STADION_OWNER') {
//       localStorage.setItem('accessToken', data.accessToken);
//       return data;
//     }
//     return thunkAPI.rejectWithValue('');
//   },
// );

// export const fetchAuthMe = createAsyncThunk<IUser, void>(
//   'auth/fetchAuthMe',
//   async (_, thunkAPI) => {
//     const { data } = await axios.get<IUser>('/auth');
//     if (data?.role === 'ADMIN' || data?.role === 'STADION_OWNER') {
//       localStorage.setItem('accessToken', data.accessToken);
//       return data;
//     }
//     return thunkAPI.rejectWithValue('');
//   },
// );

// interface IInitialState {
//   user: IUser | null;
//   status: STATUS;
//   isInvalid: boolean;
// }

// const initialState: IInitialState = {
//   user: null,
//   status: STATUS.WAITING,
//   isInvalid: false,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout: (state) => {
//       localStorage.removeItem('accessToken');
//       state.user = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(fetchLogin.fulfilled, (state, action) => {
//       state.user = action.payload;
//       state.status = STATUS.SUCCESS;
//       state.isInvalid = false;
//     });
//     builder.addCase(fetchLogin.rejected, (state) => {
//       state.user = null;
//       state.isInvalid = true;
//       state.status = STATUS.ERROR;
//     });
//     builder.addCase(fetchLogin.pending, (state) => {
//       state.user = null;
//       state.status = STATUS.LOADING;
//     });
//     builder.addCase(fetchAuthMe.pending, (state) => {
//       state.user = null;
//       state.status = STATUS.LOADING;
//     });
//     builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
//       state.user = action.payload;
//       state.status = STATUS.SUCCESS;
//     });
//     builder.addCase(fetchAuthMe.rejected, (state) => {
//       state.user = null;
//       state.status = STATUS.ERROR;
//     });
//   },
// });

// export const authReducer = authSlice.reducer;
// export const selectAuth = (state: RootType) => state.auth;

// export const { logout } = authSlice.actions;



import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../axios/axios';

import { type IUser } from '../types/User';
import { STATUS } from '../types/Status';
import { type RootType } from './store';

interface ILogin {
  phone: string;
  password: string;
}

export const fetchLogin = createAsyncThunk<IUser, ILogin>(
  'auth/fetchLogin',
  async (params, thunkAPI) => {
    try {
      const { data } = await axios.post('/auth/login', { ...params });
      if (data?.role === 'ADMIN' || data?.role === 'STADION_OWNER') {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('user', JSON.stringify(data));
        return data;
      }
      return thunkAPI.rejectWithValue('');
    } catch (error) {
      return thunkAPI.rejectWithValue('');
    }
  }
);

export const fetchAuthMe = createAsyncThunk<IUser, void>(
  'auth/fetchAuthMe',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get<IUser>('/auth');
      if (data?.role === 'ADMIN' || data?.role === 'STADION_OWNER') {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('user', JSON.stringify(data));
        return data;
      }
      return thunkAPI.rejectWithValue('');
    } catch (error) {
      return thunkAPI.rejectWithValue('');
    }
  }
);

interface IInitialState {
  user: IUser | null;
  status: STATUS;
  isInvalid: boolean;
}

const getUserFromLocalStorage = (): IUser | null => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Failed to parse user data from local storage:', error);
    }
  }
  return null;
};

const initialState: IInitialState = {
  user: getUserFromLocalStorage(),
  status: STATUS.WAITING,
  isInvalid: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = STATUS.SUCCESS;
      state.isInvalid = false;
    });
    builder.addCase(fetchLogin.rejected, (state) => {
      state.user = null;
      state.isInvalid = true;
      state.status = STATUS.ERROR;
      localStorage.removeItem('user'); 
    });
    builder.addCase(fetchLogin.pending, (state) => {
      state.user = null;
      state.status = STATUS.LOADING;
    });
    builder.addCase(fetchAuthMe.pending, (state) => {
      state.user = null;
      state.status = STATUS.LOADING;
    });
    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = STATUS.SUCCESS;
    });
    builder.addCase(fetchAuthMe.rejected, (state) => {
      state.user = null;
      state.status = STATUS.ERROR;
      localStorage.removeItem('user');
    });
  },
});

export const authReducer = authSlice.reducer;
export const selectAuth = (state: RootType) => state.auth;

export const { logout } = authSlice.actions;
