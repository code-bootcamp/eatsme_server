import { Request, Response } from 'express';
import { IContext } from '../interfaces/context';

export interface MockIContext extends IContext {
  req: Request & { user?: { id: string } };
  res: Response;
}
