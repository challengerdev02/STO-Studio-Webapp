FROM node:lts as dependencies
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /app
ENV NODE_ENV development
# If you are using a custom next.config.js file, uncomment this line.
# COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json


ARG ARG_PORT=7000
ARG ARG_BASE_URL=https://mc-app.bytegum.com
ARG ARG_API_URL=https://mc-api.bytegum.com

ENV PORT $ARG_PORT
ENV BASE_URL $ARG_BASE_URL
ENV API_URL $ARG_API_URL

EXPOSE $PORT

RUN echo $PORT

CMD ["yarn", "start"]
