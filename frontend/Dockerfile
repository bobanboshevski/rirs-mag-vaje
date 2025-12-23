# multi-stage docker image

# =========================
# 1) Builder stage
# =========================
FROM node:20-alpine as builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# copy from source to /app
COPY . .


ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build

# =========================
# 2) Production runtime
# =========================
FROM node:20-alpine as runner

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
#COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]

# docker build -t rirs-frontend-app ./frontend
# docker run -p 3000:3000 rirs-frontend-app


