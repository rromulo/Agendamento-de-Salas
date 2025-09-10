export interface ICreateLog {
  userId: string;
  action: string;
  description: string;
}
export interface ILogProps extends ICreateLog {
  id: string;
  createdAt: Date;
}
