import { ITask } from './task';

export interface IList {
  id: string;
  name: string;
  tasks: ITask[];
  createdAt: string;
  updatedAt: string;
}
