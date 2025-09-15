import React from 'react';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';

const UserSchema = Yup.object({
  name: Yup.string().min(3).max(50).required('Required'),
  username: Yup.string().min(3).max(20).required('Required'),
  email: Yup.string().email().max(100).required('Required'),
  phone: Yup.string().max(20),
  website: Yup.string().url().max(100),
  isActive: Yup.boolean().required(),
  skills: Yup.array().of(Yup.string().min(2).max(10)).required().min(1),
  availableSlots: Yup.array().of(Yup.string().test('future','Must be future', v => !!v && new Date(v).getTime() > Date.now())).required().min(1),
  address: Yup.object({ street: Yup.string().min(5).max(100).required(), city: Yup.string().min(2).max(50).required(), zipcode: Yup.string().matches(/^\d{5}(-\d{4})?$/).required() }),
  company: Yup.object({ name: Yup.string().min(2).max(100).required() }),
  role: Yup.mixed().oneOf(['Admin','Editor','Viewer']).required()
});

const empty = {
  name:'', username:'', email:'', phone:'', website:'', isActive:false, skills:[], availableSlots:[], address:{street:'',city:'',zipcode:''}, company:{name:''}, role:'Viewer'
};

export default function UserForm({ initial=empty, onSubmit }){
  return (
    <Formik initialValues={initial} validationSchema={UserSchema} enableReinitialize onSubmit={onSubmit}>
      {({ values, errors, touched, handleChange }) => (
        <Form style={{display:'grid',gap:12}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            <div>
              <label>Name</label><br/>
              <input name="name" value={values.name} onChange={handleChange} />
              {touched.name && errors.name && <div style={{color:'red'}}>{errors.name}</div>}
            </div>
            <div>
              <label>Username</label><br/>
              <input name="username" value={values.username} onChange={handleChange} />
              {touched.username && errors.username && <div style={{color:'red'}}>{errors.username}</div>}
            </div>
            <div>
              <label>Email</label><br/>
              <input name="email" value={values.email} onChange={handleChange} />
              {touched.email && errors.email && <div style={{color:'red'}}>{errors.email}</div>}
            </div>
            <div>
              <label>Phone</label><br/>
              <input name="phone" value={values.phone} onChange={handleChange} />
            </div>
            <div>
              <label>Website</label><br/>
              <input name="website" value={values.website} onChange={handleChange} />
            </div>
            <div>
              <label>Role</label><br/>
              <select name="role" value={values.role} onChange={handleChange}>
                <option>Admin</option><option>Editor</option><option>Viewer</option>
              </select>
            </div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12}}>
            <div>
              <label>Street</label><br/>
              <input name="address.street" value={values.address.street} onChange={handleChange} />
            </div>
            <div>
              <label>City</label><br/>
              <input name="address.city" value={values.address.city} onChange={handleChange} />
            </div>
            <div>
              <label>Zipcode</label><br/>
              <input name="address.zipcode" value={values.address.zipcode} onChange={handleChange} pattern='/^\d{5}(-\d{4})?$/' />
            </div>
          </div>

          <div>
            <label>Company</label><br/>
            <input name="company.name" value={values.company.name} onChange={handleChange} />
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            <div>
              <label>Skills</label>
              <FieldArray name="skills" render={helpers=>(
                <div>
                  <div style={{display:'flex',gap:8,marginBottom:8}}>
                    <input id="newSkill" placeholder="e.g. react" />
                    <button type="button" onClick={()=>{ const el=document.getElementById('newSkill'); if(el && el.value){ helpers.push(el.value); el.value=''; } }}>Add</button>
                  </div>
                  <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                    {values.skills.map((s,i)=> <span key={i} style={{border:'1px solid #ccc',padding:'4px 8px'}}>{s} <button type="button" onClick={()=>helpers.remove(i)}>×</button></span>)}
                  </div>
                </div>
              )} />
            </div>
            <div>
              <label>Available Slots (future ISO)</label>
              <FieldArray name="availableSlots" render={helpers=>(
                <div>
                  <div style={{display:'flex',gap:8,marginBottom:8}}>
                    <input id="newSlot" placeholder="YYYY-MM-DDTHH:mm:ss.sssZ" />
                    <button type="button" onClick={()=>{ const el=document.getElementById('newSlot'); if(el && el.value){ helpers.push(el.value); el.value=''; } }}>Add</button>
                  </div>
                  <ul>{values.availableSlots.map((s,i)=> <li key={i}>{s} <button type="button" onClick={()=>helpers.remove(i)}>remove</button></li>)}</ul>
                </div>
              )} />
            </div>
          </div>

          <div>
            <label><input type="checkbox" name="isActive" checked={values.isActive} onChange={handleChange} /> Active</label>
            {errors.isActive && <div style={{color:'red'}}>{errors.isActive}</div>}
          </div>

          <div><button type="submit" style={{padding:'8px 12px'}}>Save</button></div>
        </Form>
      )}
    </Formik>
  );
}
