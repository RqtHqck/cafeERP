FROM node:18
LABEL authors="Ihar Tsitou"

# Workdir
WORKDIR /app

# Copy dependencies
COPY package*.json ./

# Run installation script
RUN npm install

# Copy project files into container
COPY . .

EXPOSE 8080

# Set ENV
ENV NODE_ENV=prod

CMD ["npm", "run", "start:prod"]
