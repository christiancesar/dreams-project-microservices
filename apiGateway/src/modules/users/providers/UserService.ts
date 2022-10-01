import { UsersClient } from 'dreams-proto-sharing/src/contracts/user/user_grpc_pb';
import { ChannelCredentials } from '@grpc/grpc-js';

const userClient = new UsersClient('0.0.0.0:50052', ChannelCredentials.createInsecure()) 

export default userClient;