import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const API_URL = import.meta.env.VITE_API_URL;

fetch(`${API_URL}/users`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(newUser),
});
export const fetchUsers = createAsyncThunk('users/fetch', async (params={}) => {
  const { data } = await axios.get(`${API}/users`, { params });
  return data;
});

export const fetchUser = createAsyncThunk('users/fetchOne', async (id) => {
  const { data } = await axios.get(`${API}/users/${id}`);
  return data;
});

export const createUser = createAsyncThunk('users/create', async (payload) => {
  const { data } = await axios.post(`${API}/users`, payload);
  return data;
});

export const updateUser = createAsyncThunk('users/update', async ({ id, patch }) => {
  const { data } = await axios.patch(`${API}/users/${id}`, patch);
  return data;
});

export const deleteUser = createAsyncThunk('users/delete', async (id) => {
  await axios.delete(`${API}/users/${id}`);
  return id;
});

const slice = createSlice({
  name:'users',
  initialState:{ items:[], total:0, page:1, pageSize:10, loading:false, current:null },
  reducers:{},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (s)=>{ s.loading=true; });
    builder.addCase(fetchUsers.fulfilled, (s,a)=>{ s.loading=false; s.items=a.payload.items; s.total=a.payload.total; s.page=a.payload.page; s.pageSize=a.payload.pageSize; });
    builder.addCase(fetchUser.fulfilled, (s,a)=>{ s.current=a.payload; });
    builder.addCase(createUser.fulfilled, (s,a)=>{ s.items.unshift(a.payload); s.total+=1; });
    builder.addCase(updateUser.fulfilled, (s,a)=>{ s.items = s.items.map(u => (u._id||u.id)==(a.payload._id||a.payload.id)? a.payload : u); if (s.current && (s.current._id||s.current.id)==(a.payload._id||a.payload.id)) s.current=a.payload; });
    builder.addCase(deleteUser.fulfilled, (s,a)=>{ s.items = s.items.filter(u => (u._id||u.id)!==a.payload); s.total-=1; });
  }
});

export default slice.reducer;
