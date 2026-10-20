import { ChannelCredentials } from '@grpc/grpc-js';
import { PackagesClient } from 'dreams-proto-sharing/src/contracts/package/package_grpc_pb';

const packageClient = new PackagesClient(process.env.PACKAGE_SERVICE_ADDRESS ?? '0.0.0.0:50051', ChannelCredentials.createInsecure()) 

export default packageClient;