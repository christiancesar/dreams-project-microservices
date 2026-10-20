import { FlightOffer } from "../@types/amadeus/flights/FlightOfferSearchResponse.js";
import { HotelOffer } from "../@types/amadeus/hotels/HotelOfferSearchResponse.js";

export type AssemblingPackageServiceResponse = {
  flight: FlightOffer;
  hotel: HotelOffer;  
  off: number;  
  amount: number;
}