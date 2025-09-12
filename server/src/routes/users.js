import express from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';

const router = express.Router();

const userValidation = [
  body('name').isString().isLength({ min:3, max:50 }),
  body('username').isString().isLength({ min:3, max:20 }),
  body('email').isEmail().isLength({ max:100 }),
  body('phone').optional().isString().isLength({ max:20 }),
  body('website').optional().isURL().isLength({ max:100 }),
  body('isActive').isBoolean(),
  body('skills').isArray(),
  body('skills.*').isString().isLength({ min:2, max:10 }),
  body('availableSlots').isArray(),
  body('availableSlots.*').isISO8601().custom(v => new Date(v).getTime() > Date.now()),
  body('address.street').isString().isLength({ min:5, max:100 }),
  body('address.city').isString().isLength({ min:2, max:50 }),
  body('address.zipcode').matches(/^\d{5,10}$/),
  body('company.name').isString().isLength({ min:2, max:100 }),
  body('role').isIn(['Admin','Editor','Viewer'])
];

// GET /users
router.get('/', async (req, res) => {
  try {
    const { page='1', pageSize='10', role, isActive, q, sortBy='name', order='asc' } = req.query;
    const p = Math.max(1, parseInt(page));
    const ps = Math.min(100, Math.max(1, parseInt(pageSize)));
    const filter = {};
    if (role) filter.role = role;
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    if (q) filter.$text = { $search: q };
    const sort = { [sortBy]: order === 'desc' ? -1 : 1 };
    const [items, total] = await Promise.all([
      User.find(filter).sort(sort).skip((p-1)*ps).limit(ps),
      User.countDocuments(filter)
    ]);
    res.json({ items, total, page: p, pageSize: ps, totalPages: Math.ceil(total/ps) });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// GET /users/:id
router.get('/:id', async (req, res) => {
  try {
    const item = await User.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// POST /users
router.post('/', userValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const created = await User.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /users/:id
router.patch('/:id', async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new:true, runValidators:true });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// DELETE /users/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

export default router;
