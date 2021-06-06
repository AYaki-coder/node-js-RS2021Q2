import { Router } from 'express';
import User from './user.model';
import * as usersService from './user.service';

const router = Router();

router.route('/').get(async (_, res, next) => {
  try {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    res.json(users.map(User.toResponse));
  } catch (error) {
    next(error);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const user = await usersService.get(req.params.id);
    res.json(User.toResponse(user));
  } catch (e) {
    next(e);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const user = await usersService.create(
      new User({
        login: req.body.login,
        password: req.body.password,
        name: req.body.name,
        id: req.body.id,
      })
    );
    res.status(201).json(User.toResponse(user));
  } catch (error) {
    next(error);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const user = await usersService.update(req.params.id, req.body);
    // res.status(200).send('The user has been updated.');
    res.json(User.toResponse(user));
  } catch (e) {
    next(e);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    await usersService.remove(req.params.id);
    res.status(204).send('The user has been deleted');
  } catch (e) {
    next(e);
  }
});

export default router;
