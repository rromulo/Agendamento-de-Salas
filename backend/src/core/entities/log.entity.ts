export type TLogAction = 
  | "LOGIN"
  | "PAGE_ACCESS"
  | "DATA_VIEW"
  | "DATA_CREATE"
  | "DATA_EDIT"
  | "DATA_DELETE"
  | "LOGOUT";

export class Log {
  public id: number | null;
  public userId: string;
  public action: TLogAction;
  public description: string;
  public timestamp: Date;

  constructor(
    id: number | null,
    userId: string,
    action: TLogAction,
    description: string
  ) {
    this.id = id;
    this.userId = userId;
    this.action = action;
    this.description = description;
    this.timestamp = new Date();
  }

  public toString(): string {
    const logMessage = `[${this.timestamp.toISOString()}] User ${this.userId} performed ${this.action}: ${this.description}`
    return logMessage
  }

}