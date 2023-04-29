import { ITask } from './task';

export interface ICategory {
  id: string;
  name: string;
  tasks: ITask[];
  createdAt: string;
  updatedAt: string;
}
