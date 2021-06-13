import { Router } from 'express';
import { Req1 } from './task';
import Task from './task.model';
import * as tasksService from './task.service';

const router = Router({ mergeParams: true });

router.route('/').get(async (req: Req1, res, next) => {
  try {
    const tasks = await tasksService.getAll(req.params.boardID);
    res.json(tasks.map(Task.toResponse));
  } catch (e) {
    next(e);
  }
});

router.route('/:taskId').get(async (req, res, next) => {
  try {
    const task = await tasksService.get(req.params.taskId);
    res.json(Task.toResponse(task));
  } catch (e) {
    next(e);
  }
});

router.route('/').post(async (req: Req1, res, next) => {
  try {
    const task = await tasksService.create(
      new Task({
        title: req.body.title,
        order: req.body.order,
        description: req.body.description,
        userId: req.body.userId,
        boardId: req.params.boardID,
        columnId: null,
      })
    );
    res.status(201).json(Task.toResponse(task));
  } catch (e) {
    next(e);
  }
});

router.route('/:taskId').put(async (req, res, next) => {
  try {
    const task = await tasksService.update(req.params.taskId, req.body);
    res.json(Task.toResponse(task));
  } catch (e) {
    next(e);
  }
});

router.route('/:taskId').delete(async (req, res, next) => {
  try {
    await tasksService.remove(req.params.taskId);
    res.status(204).send('The task has been deleted');
  } catch (e) {
    next(e);
  }
});

export default router;
