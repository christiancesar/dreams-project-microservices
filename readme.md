# Dreams: Microsserviços

Implementação da aplicação de compra de pacotes de viagem dividida em microsserviços, um dos dois estudos de caso do TCC [Arquitetura de Microsserviços: Projetos, Padrões e Princípios](https://github.com/christiancesar/dreams-origins/blob/main/docs/TCC-Christian-Cesar-2022-Arquitetura-de-Microsservicos.pdf) (UFR, 2022).

O mesmo domínio foi implementado antes como monólito, em [dreams-project-monolith](https://github.com/christiancesar/dreams-project-monolith). A proposta do TCC é comparar as duas arquiteturas usando o mesmo domínio.

Versão em inglês: [README.en.md](README.en.md)

## Arquitetura

Um **API Gateway** em HTTP recebe as requisições do cliente e repassa para os microsserviços por **gRPC**. Cada serviço tem seu próprio banco MongoDB e não acessa o banco de outro serviço.

```
                 HTTP (3333)
   Cliente  ───────────────────►  apiGateway (Express)
                                    │
          gRPC                      │  gRPC
   ┌───────────────┬────────────────┼────────────────┬───────────────┐
   ▼               ▼                ▼                ▼               │
userMicroservice  packageMicroservice  flightMicroservice  hotelMicroservice
 gRPC 50052        gRPC 50051           gRPC 50053          gRPC 50054
                      │                  HTTP 3332          HTTP 3331
                      └──── gRPC ───► flight e hotel (para montar pacotes)
```

| Serviço | Porta gRPC | Porta HTTP | Responsabilidade |
|---|---|---|---|
| apiGateway | - | 3333 | Ponto único de entrada da API REST |
| userMicroservice | 50052 | - | Cadastro e consulta de usuários |
| flightMicroservice | 50053 | 3332 | Ofertas de voo e voos registrados |
| hotelMicroservice | 50054 | 3331 | Ofertas de hotel e hotéis registrados |
| packageMicroservice | 50051 | - | Monta pacotes (voo + hotel) e consulta pacotes |

O serviço de pacotes é o único que depende dos outros. Ao criar um pacote, ele primeiro registra o voo. Se o hotel falhar, um evento inativa o voo já criado, para não deixar dados órfãos. Essa parte está em `packageMicroservice/src/shared/events/PackageTripEventHandle.ts`.

### Contratos compartilhados

Os contratos gRPC ficam no repositório [dreams-proto-sharing](https://github.com/christiancesar/dreams-proto-sharing), publicado no npm como `dreams-proto-sharing`. Cada serviço e o gateway instalam o mesmo pacote, então o cliente e o servidor usam os mesmos tipos e métodos.

Métodos definidos nos contratos:

- `user`: `createUser`, `listUsers`, `showUser`, `updateUser`
- `flight`: `searchFlightOffer`, `createFlight`, `listFlights`, `showFlight`, `listFlightbyUser`
- `hotel`: `searchHotelOffer`, `createHotel`, `listHotels`, `showHotel`, `listHotelByUser`
- `package`: `searchPackage`, `createPackage`, `listPackages`, `listPackageByUser`

## Estrutura do repositório

```
dreams-project-microservices/
├── apiGateway/            # API REST pública (Express), chama os serviços via gRPC
├── userMicroservice/      # gRPC de usuários
├── flightMicroservice/    # gRPC de voos, com provedor Amadeus
├── hotelMicroservice/     # gRPC de hotéis, com provedor Amadeus
├── packageMicroservice/   # gRPC de pacotes, consome voos e hotéis
└── docs/
    └── insomnia-request.json   # requisições para importar no Insomnia
```

Dentro de cada serviço, a organização segue a arquitetura hexagonal: `modules/` ou `services/` com as regras de negócio, `repositories/` com interface e implementação Prisma, `protos/` com a implementação do contrato gRPC, e `shared/providers/` com os adaptadores para o Amadeus.

## Pré-requisitos

- Node.js LTS e Yarn
- Cluster MongoDB (MongoDB Atlas, ou replica set local, exigido pelo Prisma)
- Credenciais da API Amadeus para os serviços de voo e hotel

## Como executar

Cada serviço é independente. Repita os passos abaixo em cada pasta.

1. Crie o `.env` a partir do exemplo e preencha as variáveis:

   ```bash
   cp .env.example .env
   ```

2. Instale as dependências e gere o cliente Prisma:

   ```bash
   yarn install
   npx prisma generate
   npx prisma db push
   ```

3. Suba o serviço:

   ```bash
   yarn dev:server
   ```

Suba nesta ordem: `userMicroservice`, `flightMicroservice`, `hotelMicroservice`, `packageMicroservice` e, por último, `apiGateway`. O gateway conecta nos serviços pelo endereço fixo `0.0.0.0` e pelas portas da tabela acima.

Para testar, importe `docs/insomnia-request.json` no Insomnia. O gateway responde em `http://localhost:3333`.

### Variáveis de ambiente

Cada `.env.example` tem `DATABASE_URL` e, nos serviços de voo, hotel e pacote, `AMADEUS_CLIENT_ID` e `AMADEUS_CLIENT_SECRET`. Use um banco separado por serviço, por exemplo `users`, `flights`, `hotels` e `packages`.

> Atenção: os exemplos de `DATABASE_URL` do serviço de hotel e do serviço de pacote apontam para os bancos `flights` e `users`, respectivamente. Ajuste para o banco do próprio serviço antes de rodar.

### Recompilando os contratos

Você só precisa disto se alterar os arquivos `.proto` localmente. Os serviços usam a versão publicada no npm. Os scripts `compile` de cada serviço geram os stubs a partir de `src/protos/contracts`, mas esse caminho não existe no repositório. Para alterar contratos, use o [dreams-proto-sharing](https://github.com/christiancesar/dreams-proto-sharing), que tem o script `compile` próprio.

## Limitações conhecidas

- **Amadeus:** o Amadeus Self-Service, usado no TCC, foi encerrado em julho de 2026. Sem acesso Enterprise, as buscas de oferta de voo e hotel não funcionam. Cadastro, persistência e a comunicação entre os serviços continuam funcionando com dados salvos.
- **Dependência do pacote de contratos:** a versão do `dreams-proto-sharing` usada aqui é a `1.0.5-a` publicada no npm. Se um contrato mudar no repositório e não for publicado, os serviços não enxergam a mudança.
- **Endereços fixos:** as conexões gRPC usam `0.0.0.0` e as chamadas HTTP do pacote usam `localhost`, sem variáveis de ambiente. Para rodar em containers, isso precisa virar configuração.
- **Sem orquestração:** o projeto não tem `docker-compose`. Cada serviço sobe separadamente.

## Documentação

- Artigo completo: [TCC em PDF](https://github.com/christiancesar/dreams-origins/blob/main/docs/TCC-Christian-Cesar-2022-Arquitetura-de-Microsservicos.pdf)
- Requisições do Insomnia e imagens da interface: `docs/`
