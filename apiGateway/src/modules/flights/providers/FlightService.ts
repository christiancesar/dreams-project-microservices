import { ChannelCredentials } from '@grpc/grpc-js';
import { FlightsClient } from "../../../proto/flight_grpc_pb.js";

const flightClient = new FlightsClient(process.env.FLIGHT_SERVICE_ADDRESS ?? '0.0.0.0:50053', ChannelCredentials.createInsecure()) 

export default flightClient;