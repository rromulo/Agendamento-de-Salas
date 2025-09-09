export type TLogAction = 
  | "LOGIN"
  | "PAGE_ACCESS"
  | "DATA_VIEW"
  | "DATA_CREATE"
  | "DATA_EDIT"
  | "DATA_DELETE"
  | "LOGOUT";


export interface ICreateLog {
  userId: string;
  action: TLogAction;
  description: string;
}
export interface ILogProps extends ICreateLog {
  id: string;
  createdAt: Date;
}
