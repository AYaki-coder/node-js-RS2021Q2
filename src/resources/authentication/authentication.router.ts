import { Router } from 'express';
import { signToken } from './authentication.service';

const router = Router();

export const auth = router.post('/', async (req, res) => {
  const { login, password } = req.body;
  const token = await signToken(login, password);
  if (!token) {
    res.status(403).send('Wrong login/password combination');
  } else {
    res.status(200).send({ token });
  }
});
