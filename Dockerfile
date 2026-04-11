FROM node:18

# Install nginx
RUN apt-get update && apt-get install -y nginx

WORKDIR /app

# Copy backend
COPY package*.json ./
RUN npm install
COPY . .

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Start both services
CMD service nginx start && node app.js