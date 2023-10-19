// Original file: proto/index.proto

import type { Status as _indexPackage_Status, Status__Output as _indexPackage_Status__Output } from '../indexPackage/Status';

export interface User {
  'id'?: (number);
  'name'?: (string);
  'status'?: (_indexPackage_Status);
  'avatarUrt'?: (string);
}

export interface User__Output {
  'id'?: (number);
  'name'?: (string);
  'status'?: (_indexPackage_Status__Output);
  'avatarUrt'?: (string);
}
