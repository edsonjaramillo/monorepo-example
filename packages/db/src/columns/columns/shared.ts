export type ColumnsSelector<T> = {
  [K in keyof T]?: true;
};
