export interface ErrorObject {
  key: string;
  message: string;
}

export function isErrorObject(obj: any): obj is ErrorObject {
  return "key" in obj && "message" in obj;
}
