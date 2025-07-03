FROM node:20-alpine as build
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN npm ci
# Copy the rest of the frontend code
COPY . .
# Build the application
RUN npm run build
# Production stage
FROM nginx:alpine
# Copy the built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html
# Copy nginx configuration
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]