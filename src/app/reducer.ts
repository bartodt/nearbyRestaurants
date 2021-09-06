import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Restaurant, Reviews } from '../types';

interface Storage {
  list: Restaurant[];
  reviews: Reviews[];
  recentSearchs: string[];
  isLoading: boolean;
  error: any;
}

const initialState: Storage = {
  list: [],
  reviews: [],
  recentSearchs: [],
  isLoading: false,
  error: null,
};


export const { actions, reducer } = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setList: (state, { payload }: PayloadAction<Restaurant[]>) => {
      state.list = payload;
    },
    setReviews: (state, { payload }: PayloadAction<Reviews[]>) => {
      state.reviews = payload;
    },
    loading: (state) => {
      state.isLoading = true;
    },
    success: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    failure: (state, { payload }: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = payload;
    },
    cleanUp: (state) => {
      Object.assign(state, initialState);
    } // not in use,
  },

}, );

export const { setList, setReviews, failure, loading, success } = actions;

export const getList = (rootState: RootState): Restaurant[] => {
  return rootState.state.list;
};

export const getReviews = (rootState: RootState): Reviews[] => {
  return rootState.state.reviews;
};

export const getErrors = (rootState: RootState): any => {
  return rootState.state.error;
};

export const isLoading = (rootState: RootState): boolean => {
  return rootState.state.isLoading;
};

export default reducer;
