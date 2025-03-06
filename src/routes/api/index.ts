// UPDATE THIS CODE!!!!!!
// 

import { Router } from 'express';
import { courseRouter } from './friendRoutes.js';
import { studentRouter } from './userRoutes.js';

const router = Router();

router.use('/courses', courseRouter);
router.use('/students', studentRouter);

export default router;
