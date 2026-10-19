# Dreams: Microservices

Microservices implementation of a travel-package booking application. It is one of the two case studies in my Bachelor's thesis [Microservices Architecture: Projects, Patterns and Principles](https://github.com/christiancesar/dreams-origins/blob/main/docs/TCC-Christian-Cesar-2022-Arquitetura-de-Microsservicos.pdf) (UFR, 2022, in Portuguese).

The same domain was first built as a monolith in [dreams-project-monolith](https://github.com/christiancesar/dreams-project-monolith). The thesis compares the two architectures using the same domain.

Portuguese version: [readme.md](readme.md)

## Architecture

An **API Gateway** over HTTP receives client requests and forwards them to the microservices over **gRPC**. Each service has its own MongoDB database and does not access another service's database.

```
                 HTTP (3333)
   Client  ───────────────────►  apiGateway (Express)
                                    │
          gRPC                      │  gRPC
   ┌───────────────┬────────────────┼────────────────┬───────────────┐
   ▼               ▼                ▼                ▼               │
userMicroservice  packageMicroservice  flightMicroservice  hotelMicroservice
 gRPC 50052        gRPC 50051           gRPC 50053          gRPC 50054
                      │                  HTTP 3332          HTTP 3331
                      └──── gRPC ───► flight and hotel (to assemble packages)
```

| Service | gRPC port | HTTP port | Responsibility |
|---|---|---|---|
| apiGateway | - | 3333 | Single REST entry point |
| userMicroservice | 50052 | - | User registration and lookup |
| flightMicroservice | 50053 | 3332 | Flight offers and registered flights |
| hotelMicroservice | 50054 | 3331 | Hotel offers and registered hotels |
| packageMicroservice | 50051 | - | Builds packages (flight + hotel) and lists them |

The package service is the only one that depends on the others. When it creates a package, it registers the flight first. If the hotel step fails, an event deactivates the flight that was already created, so no orphan data is left behind. The logic lives in `packageMicroservice/src/shared/events/PackageTripEventHandle.ts`.

### Shared contracts

The gRPC contracts live in [dreams-proto-sharing](https://github.com/christiancesar/dreams-proto-sharing), published to npm as `dreams-proto-sharing`. Each service and the gateway install the same package, so client and server share the same types and methods.

Methods defined in the contracts:

- `user`: `createUser`, `listUsers`, `showUser`, `updateUser`
- `flight`: `searchFlightOffer`, `createFlight`, `listFlights`, `showFlight`, `listFlightbyUser`
- `hotel`: `searchHotelOffer`, `createHotel`, `listHotels`, `showHotel`, `listHotelByUser`
- `package`: `searchPackage`, `createPackage`, `listPackages`, `listPackageByUser`

## Repository layout

```
dreams-project-microservices/
├── apiGateway/            # public REST API (Express), calls services over gRPC
├── userMicroservice/      # users gRPC service
├── flightMicroservice/    # flights gRPC service, with Amadeus provider
├── hotelMicroservice/     # hotels gRPC service, with Amadeus provider
├── packageMicroservice/   # packages gRPC service, consumes flights and hotels
└── docs/
    └── insomnia-request.json   # requests to import into Insomnia
```

Inside each service, the code follows hexagonal architecture: `modules/` or `services/` hold the business rules, `repositories/` holds the interface and the Prisma implementation, `protos/` holds the gRPC contract implementation, and `shared/providers/` holds the adapters for Amadeus.

## Prerequisites

- Node.js LTS and Yarn
- A MongoDB cluster (MongoDB Atlas, or a local replica set, which Prisma requires)
- Amadeus API credentials for the flight and hotel services

## Running it

Each service is independent. Repeat these steps in each folder.

1. Create `.env` from the example and fill in the variables:

   ```bash
   cp .env.example .env
   ```

2. Install dependencies and generate the Prisma client:

   ```bash
   yarn install
   npx prisma generate
   npx prisma db push
   ```

3. Start the service:

   ```bash
   yarn dev:server
   ```

Start them in this order: `userMicroservice`, `flightMicroservice`, `hotelMicroservice`, `packageMicroservice`, and finally `apiGateway`. The gateway connects to the services at the fixed address `0.0.0.0` on the ports listed above.

To try the API, import `docs/insomnia-request.json` into Insomnia. The gateway answers at `http://localhost:3333`.

### Environment variables

Each `.env.example` defines `DATABASE_URL`. The flight, hotel and package services also define `AMADEUS_CLIENT_ID` and `AMADEUS_CLIENT_SECRET`. Use a separate database per service, for example `users`, `flights`, `hotels` and `packages`.

> Warning: the example `DATABASE_URL` in the hotel service points to the `flights` database, and the one in the package service points to `users`. Change them to each service's own database before running.

### Rebuilding the contracts

You only need this if you change the `.proto` files locally. The services use the version published on npm. Each service's `compile` script generates stubs from `src/protos/contracts`, a folder that does not exist in this repository. To change contracts, use [dreams-proto-sharing](https://github.com/christiancesar/dreams-proto-sharing), which has its own `compile` script.

## Known limitations

- **Amadeus:** the Amadeus Self-Service program, used during the thesis, was shut down in July 2026. Without Enterprise access, flight and hotel offer search does not work. Registration, persistence and inter-service communication still work with stored data.
- **Contracts package:** this project uses `dreams-proto-sharing` 1.0.5-a from npm. If a contract changes in the repository and is not published, the services will not see the change.
- **Fixed addresses:** gRPC connections use `0.0.0.0`, and the package service's HTTP calls use `localhost`, with no environment variables. Running in containers would require turning these into configuration.
- **No orchestration:** the project has no `docker-compose`. Each service starts on its own.

## Documentation

- Full thesis (Portuguese): [PDF](https://github.com/christiancesar/dreams-origins/blob/main/docs/TCC-Christian-Cesar-2022-Arquitetura-de-Microsservicos.pdf)
- Insomnia requests and interface images: `docs/`
