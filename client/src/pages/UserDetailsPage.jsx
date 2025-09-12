import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../usersSlice';
import { useParams, Link } from 'react-router-dom';

export default function UserDetailsPage(){
  const { id } = useParams(); const dispatch = useDispatch();
  const user = useSelector(s=>s.users.current);
  useEffect(()=>{ if(id) dispatch(fetchUser(id)); }, [id, dispatch]);
  if(!user) return <div>Loading...</div>;
  const uid = user._id||user.id;
  return (
    <div>
      <Link to={`/users/${uid}/edit`}>Edit</Link>
      <h2>{user.name}</h2>
      <p><b>Username:</b> {user.username}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Phone:</b> {user.phone}</p>
      <p><b>Role:</b> {user.role}</p>
      <p><b>Active:</b> {user.isActive?'Yes':'No'}</p>
    </div>
  );
}
