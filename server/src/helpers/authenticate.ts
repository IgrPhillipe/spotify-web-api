import { Response } from 'express';

const authenticate = (res: Response) => {
  res.redirect('http://localhost:3000/authenticate');
};

export default authenticate;
