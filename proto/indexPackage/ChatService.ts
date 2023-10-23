// Original file: proto/index.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Empty as _google_protobuf_Empty, Empty__Output as _google_protobuf_Empty__Output } from '../google/protobuf/Empty';
import type { InitiateRequest as _indexPackage_InitiateRequest, InitiateRequest__Output as _indexPackage_InitiateRequest__Output } from '../indexPackage/InitiateRequest';
import type { InitiateResponse as _indexPackage_InitiateResponse, InitiateResponse__Output as _indexPackage_InitiateResponse__Output } from '../indexPackage/InitiateResponse';
import type { MessageRequest as _indexPackage_MessageRequest, MessageRequest__Output as _indexPackage_MessageRequest__Output } from '../indexPackage/MessageRequest';
import type { StreamMessage as _indexPackage_StreamMessage, StreamMessage__Output as _indexPackage_StreamMessage__Output } from '../indexPackage/StreamMessage';
import type { StreamRequset as _indexPackage_StreamRequset, StreamRequset__Output as _indexPackage_StreamRequset__Output } from '../indexPackage/StreamRequset';
import type { UserStreamResponse as _indexPackage_UserStreamResponse, UserStreamResponse__Output as _indexPackage_UserStreamResponse__Output } from '../indexPackage/UserStreamResponse';

export interface ChatServiceClient extends grpc.Client {
  ChatInitiate(argument: _indexPackage_InitiateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_indexPackage_InitiateResponse__Output>): grpc.ClientUnaryCall;
  ChatInitiate(argument: _indexPackage_InitiateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_indexPackage_InitiateResponse__Output>): grpc.ClientUnaryCall;
  ChatInitiate(argument: _indexPackage_InitiateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_indexPackage_InitiateResponse__Output>): grpc.ClientUnaryCall;
  ChatInitiate(argument: _indexPackage_InitiateRequest, callback: grpc.requestCallback<_indexPackage_InitiateResponse__Output>): grpc.ClientUnaryCall;
  chatInitiate(argument: _indexPackage_InitiateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_indexPackage_InitiateResponse__Output>): grpc.ClientUnaryCall;
  chatInitiate(argument: _indexPackage_InitiateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_indexPackage_InitiateResponse__Output>): grpc.ClientUnaryCall;
  chatInitiate(argument: _indexPackage_InitiateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_indexPackage_InitiateResponse__Output>): grpc.ClientUnaryCall;
  chatInitiate(argument: _indexPackage_InitiateRequest, callback: grpc.requestCallback<_indexPackage_InitiateResponse__Output>): grpc.ClientUnaryCall;
  
  ChatStream(argument: _indexPackage_StreamRequset, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_indexPackage_StreamMessage__Output>;
  ChatStream(argument: _indexPackage_StreamRequset, options?: grpc.CallOptions): grpc.ClientReadableStream<_indexPackage_StreamMessage__Output>;
  chatStream(argument: _indexPackage_StreamRequset, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_indexPackage_StreamMessage__Output>;
  chatStream(argument: _indexPackage_StreamRequset, options?: grpc.CallOptions): grpc.ClientReadableStream<_indexPackage_StreamMessage__Output>;
  
  SendMessage(argument: _indexPackage_MessageRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  SendMessage(argument: _indexPackage_MessageRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  SendMessage(argument: _indexPackage_MessageRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  SendMessage(argument: _indexPackage_MessageRequest, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  sendMessage(argument: _indexPackage_MessageRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  sendMessage(argument: _indexPackage_MessageRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  sendMessage(argument: _indexPackage_MessageRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  sendMessage(argument: _indexPackage_MessageRequest, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  
  UserStream(argument: _indexPackage_StreamRequset, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_indexPackage_UserStreamResponse__Output>;
  UserStream(argument: _indexPackage_StreamRequset, options?: grpc.CallOptions): grpc.ClientReadableStream<_indexPackage_UserStreamResponse__Output>;
  userStream(argument: _indexPackage_StreamRequset, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_indexPackage_UserStreamResponse__Output>;
  userStream(argument: _indexPackage_StreamRequset, options?: grpc.CallOptions): grpc.ClientReadableStream<_indexPackage_UserStreamResponse__Output>;
  
}

export interface ChatServiceHandlers extends grpc.UntypedServiceImplementation {
  ChatInitiate: grpc.handleUnaryCall<_indexPackage_InitiateRequest__Output, _indexPackage_InitiateResponse>;
  
  ChatStream: grpc.handleServerStreamingCall<_indexPackage_StreamRequset__Output, _indexPackage_StreamMessage>;
  
  SendMessage: grpc.handleUnaryCall<_indexPackage_MessageRequest__Output, _google_protobuf_Empty>;
  
  UserStream: grpc.handleServerStreamingCall<_indexPackage_StreamRequset__Output, _indexPackage_UserStreamResponse>;
  
}

export interface ChatServiceDefinition extends grpc.ServiceDefinition {
  ChatInitiate: MethodDefinition<_indexPackage_InitiateRequest, _indexPackage_InitiateResponse, _indexPackage_InitiateRequest__Output, _indexPackage_InitiateResponse__Output>
  ChatStream: MethodDefinition<_indexPackage_StreamRequset, _indexPackage_StreamMessage, _indexPackage_StreamRequset__Output, _indexPackage_StreamMessage__Output>
  SendMessage: MethodDefinition<_indexPackage_MessageRequest, _google_protobuf_Empty, _indexPackage_MessageRequest__Output, _google_protobuf_Empty__Output>
  UserStream: MethodDefinition<_indexPackage_StreamRequset, _indexPackage_UserStreamResponse, _indexPackage_StreamRequset__Output, _indexPackage_UserStreamResponse__Output>
}
