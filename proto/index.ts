import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { ChatServiceClient as _indexPackage_ChatServiceClient, ChatServiceDefinition as _indexPackage_ChatServiceDefinition } from './indexPackage/ChatService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  google: {
    protobuf: {
      Empty: MessageTypeDefinition
    }
  }
  indexPackage: {
    ChatService: SubtypeConstructor<typeof grpc.Client, _indexPackage_ChatServiceClient> & { service: _indexPackage_ChatServiceDefinition }
    InitiateRequest: MessageTypeDefinition
    InitiateResponse: MessageTypeDefinition
    MessageRequest: MessageTypeDefinition
    Status: EnumTypeDefinition
    StreamMessage: MessageTypeDefinition
    StreamRequset: MessageTypeDefinition
    User: MessageTypeDefinition
    UserStreamResponse: MessageTypeDefinition
  }
}

