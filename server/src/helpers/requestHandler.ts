import { Request, Response } from 'express';

const requestHandler = (req: Request, res: Response) => {
  const data = {
    status: null,
    message: null,
    data: null,
  };

  if (res.locals.status) data.status = res.locals.status;
  if (res.locals.message) data.message = res.locals.message;
  if (res.locals.data) data.data = res.locals.data;

  res.status(res.locals.status || 200).json(data);
};

export default requestHandler;
