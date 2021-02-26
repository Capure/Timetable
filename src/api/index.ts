import express from 'express';
import today from './today';
import week from './week';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Timetable v2 API - 👋🌎🌍🌏'
  });
});

router.use('/today', today);
router.use('/week', week);

export default router;