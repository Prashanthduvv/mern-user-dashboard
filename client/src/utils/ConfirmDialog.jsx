import React from 'react';
export default function ConfirmDialog({ open, title='Confirm', message='Are you sure?', onConfirm, onCancel }){
  if(!open) return null;
  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.4)',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{background:'#fff',padding:16,borderRadius:6,width:360}}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div style={{display:'flex',justifyContent:'flex-end',gap:8}}>
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm} style={{background:'#c0392b',color:'#fff'}}>Delete</button>
        </div>
      </div>
    </div>
  );
}
