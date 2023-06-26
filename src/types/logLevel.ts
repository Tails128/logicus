export interface LogLevel<T> {
  name: string;
  id: T;
  associatedEmoji?: string;
  color: [number, number, number];
  logImportance: number;
}
