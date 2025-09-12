import React from 'react';
import UserForm from '../utils/UserForm';
import { useDispatch } from 'react-redux';
import { createUser } from '../usersSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function UserCreatePage(){
  const dispatch = useDispatch(); const nav = useNavigate();
  return (
    <div>
      <h2>Create User</h2>
      <UserForm onSubmit={async (v)=>{ const res = await dispatch(createUser(v)); if (res.error) { toast.error('Error'); return; } toast.success('Created'); nav('/'); }} />
    </div>
  );
}
