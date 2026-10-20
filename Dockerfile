# Imagem única para todas as APIs. Escolha o serviço com --build-arg SERVICE=<pasta>.
# Ex.: SERVICE=apiGateway, userMicroservice, flightMicroservice, hotelMicroservice, packageMicroservice
# syntax=docker/dockerfile:1
FROM node:24-bookworm-slim

ARG SERVICE
ENV NODE_ENV=development \
    NPM_CONFIG_UPDATE_NOTIFIER=false

# OpenSSL é exigido pelo engine do Prisma nesta base slim.
RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Dependências primeiro, para o cache de camadas valer enquanto o package-lock não muda.
COPY ${SERVICE}/package.json ${SERVICE}/package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci

COPY ${SERVICE}/ ./

# Gera o cliente Prisma quando o serviço tem banco.
RUN if [ -f prisma/schema.prisma ]; then npx prisma generate; fi

CMD ["npm", "run", "dev:server"]
