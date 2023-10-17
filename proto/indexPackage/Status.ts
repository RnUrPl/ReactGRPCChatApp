// Original file: proto/index.proto

export const Status = {
  UKNOW: 0,
  ONLINE: 1,
  OFFLINE: 2,
} as const;

export type Status =
  | 'UKNOW'
  | 0
  | 'ONLINE'
  | 1
  | 'OFFLINE'
  | 2

export type Status__Output = typeof Status[keyof typeof Status]
