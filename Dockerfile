FROM envoyproxy/envoy:v1.30-latest

WORKDIR /app

COPY . .

RUN apt-get update && apt-get install -y nodejs npm

RUN npm install
RUN npm run build

RUN chmod +x start.sh

EXPOSE 8080

CMD ["./start.sh"]