import { Response } from 'express';

const authenticate = async (res: Response, url: string) => {
  res.redirect(url);
};

export default authenticate;
