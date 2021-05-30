const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll(req.params.boardID);
  res.json(tasks.map(Task.toResponse));
});

router.route('/:taskId').get(async (req, res) => {
  try {
    const task = await tasksService.get(req.params.taskId);
    res.json(Task.toResponse(task));
  } catch (e) {
    res.status(404).send('Could not find a task');
  }
});

router.route('/').post(async (req, res) => {
  const task = await tasksService.create(
    new Task({
      title: req.body.title,
      order: req.body.order,
      description: req.body.description,
      userId: req.body.userId,
      boardId: req.params.boardID,
      columnId: null
    })
  );
  res.status(201).json(Task.toResponse(task));
});

router.route('/:taskId').put(async (req, res) => {
  try {
    const task = await tasksService.update(req.params.taskId, req.body);
    res.json(Task.toResponse(task));
  } catch (e) {
    res.status(404).send('Could not find a task');
  }
});

router.route('/:taskId').delete(async (req, res) => {
  try {
    await tasksService.remove(req.params.taskId);
    res.status(204).send('The task has been deleted');
  } catch (e) {
    res.status(404).send('Could not find a task');
  }
});

module.exports = router;