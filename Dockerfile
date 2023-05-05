# Sử dụng node image với tag LTS (14.x.x)
FROM node:14-alpine
# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json
COPY package*.json ./

RUN rm -rf /app/node_modules

RUN npm install bcrypt --force
# Cài đặt dependencies
RUN npm install --force

# Sao chép toàn bộ source code
COPY . .

# Build production bundle
RUN npm run build

# Thiết lập biến môi trường
ENV PORT=5000
ENV NODE_ENV=production

# Mở port
EXPOSE $PORT

# Khởi động ứng dụng
CMD [ "npm", "start" ]
