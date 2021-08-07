# base image
FROM node:alpine3.14 as build-deps

# make app directory
RUN mkdir /app
WORKDIR /app

# copy source
COPY . /app

# install module
RUN yarn install
# build 
RUN yarn build

# nginx
FROM nginx:1.21
COPY --from=build-deps /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g",  "daemon off;"]
