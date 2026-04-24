export type RemoveUndefinedUtility<T> = {
  [K in keyof T as undefined extends T[K] ? never : K]: T[K];
};
