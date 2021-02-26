import express from 'express';
import { LessonService } from '../services/lesson';

const router = express.Router();

router.get('/', async (req, res) => {
  const angInf = req.query.angInf !== undefined ? req.query.angInf.toString() : "gr1";
  const wf = req.query.wf !== undefined ? req.query.wf.toString() : "CH";
  const lang = req.query.lang !== undefined ? req.query.lang.toString() : "gr4r";
  const filter = req.query.filter !== undefined ? req.query.filter.toString() === "true" : false;
  const lessonService = new LessonService(req.app.locals.vulcan);
  const lessons = await lessonService.getLessonsForTheWeek({angInf, wf, lang, filter});
  res.json({lessons});
});

export default router;