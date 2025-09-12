import React, { useEffect } from 'react';
import UserForm from '../utils/UserForm';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, updateUser } from '../usersSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function UserEditPage(){
  const { id } = useParams(); const dispatch = useDispatch(); const nav = useNavigate();
  const user = useSelector(s=>s.users.current);
  useEffect(()=>{ if(id) dispatch(fetchUser(id)); }, [id, dispatch]);
  if(!user) return <div>Loading...</div>;
  return (
    <div>
      <h2>Edit User</h2>
      <UserForm initial={user} onSubmit={async (v)=>{ const res = await dispatch(updateUser({ id, patch:v })); if (res.error) { toast.error('Error'); return; } toast.success('Updated'); nav(`/users/${id}`); }} />
    </div>
  );
}
