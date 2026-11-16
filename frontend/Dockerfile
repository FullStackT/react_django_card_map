FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy project node
COPY . .

EXPOSE 5173

# Expose host so Docker can forward the port
CMD ["npm", "run", "dev", "--", "--host"]
