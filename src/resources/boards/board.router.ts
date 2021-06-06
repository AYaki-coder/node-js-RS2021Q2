import { Router } from 'express';
import Board from './board.model';
import * as boardsService from './board.service';

const router = Router();
router.route('/').get(async (_, res, next) => {
  try {
    const boards = await boardsService.getAll();
    res.json(boards.map(Board.toResponse));
  } catch (e) {
    next(e);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const board = await boardsService.get(req.params.id);
    res.json(Board.toResponse(board));
  } catch (e) {
    next(e);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const board = await boardsService.create(
      new Board({
        title: req.body.title,
        columns: req.body.columns,
      })
    );
    res.status(201).json(Board.toResponse(board));
  } catch (e) {
    next(e);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const board = await boardsService.update(req.params.id, req.body);
    res.json(Board.toResponse(board));
  } catch (e) {
    next(e);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    await boardsService.remove(req.params.id);
    res.status(204).send('The board has been deleted');
  } catch (e) {
    next(e);
  }
});

export default router;
