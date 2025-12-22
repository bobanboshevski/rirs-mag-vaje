# =========================
# Base image
# =========================

# Express does not need a build step
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --omit=dev

COPY . .

ENV NODE_ENV = production

expose 3002

CMD ["npm", "start"]


# docker build -t rirs-backend-app ./management-express-backend
# docker run -p 3002:3002 rirs-backend-app