import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, deleteUser, updateUser } from '../usersSlice';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from '../utils/ConfirmDialog';
import { toast } from 'react-toastify';

export default function UsersListPage(){
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { items, total, page, pageSize } = useSelector(s=>s.users);
  const [params, setParams] = useState({ page:1, pageSize:10, sortBy:'name', order:'asc' });
  const [toDelete, setToDelete] = useState();
  useEffect(()=>{ dispatch(fetchUsers(params)); }, [dispatch, params]);
  const onToggle = (id, next) => dispatch(updateUser({ id, patch:{ isActive: next } }));
  const confirmDelete = async () => { if(!toDelete) return; await dispatch(deleteUser(toDelete)); toast.success('Deleted'); setToDelete(undefined); };
  return (
    <div>
      <div style={{display:'flex',gap:8,marginBottom:12}}>
        <input placeholder="Search..." onChange={e=> setParams(p=>({...p, q:e.target.value, page:1}))} />
        <select onChange={e=> setParams(p=>({...p, role:e.target.value||undefined, page:1}))}><option value="">All Roles</option><option>Admin</option><option>Editor</option><option>Viewer</option></select>
        <a style={{marginLeft:'auto'}} href="/create">+ Create New User</a>
      </div>
      <table>
        <thead><tr><th>Name</th><th>Username</th><th>Email</th><th>Role</th><th>Active</th><th>Actions</th></tr></thead>
        <tbody>
          {items.map(r=>{
            const id = r._id||r.id;
            return <tr key={id}><td>{r.name}</td><td>{r.username}</td><td>{r.email}</td><td>{r.role}</td>
              <td><input type="checkbox" checked={r.isActive} onChange={e=> onToggle(id, e.target.checked)} /></td>
              <td><button onClick={()=>nav(`/users/${id}`)}>View</button> <button onClick={()=>nav(`/users/${id}/edit`)}>Edit</button> <button onClick={()=>setToDelete(id)}>Delete</button></td>
            </tr>;
          })}
        </tbody>
      </table>
      <div style={{marginTop:8}}>Total: {total}</div>
      <ConfirmDialog open={!!toDelete} onCancel={()=>setToDelete(undefined)} onConfirm={confirmDelete} />
    </div>
  );
}
