FROM node
WORKDIR /ecom
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 7000
CMD ["npm", "start"]
