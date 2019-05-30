    
import { Request, Response } from "express";
import { User } from './../../models/User';
import { Provider } from './../../models/provider';

export interface MyContext {
  req: Request;
  res: Response;
  userId: string | null;
  user?: User | null;
  provider?: Provider | null;
}