FROM node:alpine as builder
WORKDIR /app
COPY . ./

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3.5 \
    python3-pip \
    && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN yarn install

#ARG REACT_APP_KEYCLOAK_REALM
#ARG REACT_APP_KEYCLOAK_URL
#ARG REACT_APP_KEYCLOAK_CLIENT_ID
#
#ENV REACT_APP_KEYCLOAK_REALM $REACT_APP_KEYCLOAK_REALM
#ENV REACT_APP_KEYCLOAK_URL $REACT_APP_KEYCLOAK_URL
#ENV REACT_APP_KEYCLOAK_CLIENT_ID $REACT_APP_KEYCLOAK_CLIENT_ID

RUN yarn build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
