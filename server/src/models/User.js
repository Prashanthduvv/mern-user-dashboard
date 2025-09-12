import mongoose from 'mongoose';
const { Schema } = mongoose;

const AddressSchema = new Schema({
  street: { type: String, minlength:5, maxlength:100, required:true },
  city: { type: String, minlength:2, maxlength:50, required:true },
  zipcode: { type: String, match:/^\d{5,10}$/, required:true }
}, { _id: false });

const CompanySchema = new Schema({ name: { type: String, minlength:2, maxlength:100, required:true } }, { _id: false });

const UserSchema = new Schema({
  name: { type: String, required:true, minlength:3, maxlength:50 },
  username: { type: String, required:true, minlength:3, maxlength:20, unique:true },
  email: { type: String, required:true, maxlength:100, unique:true, match:/.+@.+\..+/ },
  phone: { type: String, maxlength:20 },
  website: { type: String, maxlength:100 },
  isActive: { type: Boolean, required:true },
  skills: { type: [String], validate: { validator: arr=> arr.every(s=>s.length>=2 && s.length<=10), message:'Each skill must be 2–10 chars' } },
  availableSlots: { type: [String], validate: { validator: arr => arr.every(d => new Date(d).getTime() > Date.now()), message: 'availableSlots must be future ISO dates' } },
  address: AddressSchema,
  company: CompanySchema,
  role: { type: String, enum: ['Admin','Editor','Viewer'], required:true }
}, { timestamps: true });

UserSchema.index({ name: 'text', email: 'text', username: 'text' });

export default mongoose.model('User', UserSchema);
