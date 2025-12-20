---
title: "Service Communication Patterns"
description: "Synchronous vs asynchronous communication, REST APIs, gRPC, message queues with RabbitMQ and Kafka, and Protocol Buffers"
---

# Service Communication Patterns

Communication between microservices is fundamental to distributed system design. Services must exchange data and coordinate actions across network boundaries, introducing challenges of latency, partial failures, and complexity. This chapter explores the primary communication patterns—synchronous request-response and asynchronous messaging—along with specific protocols like REST, gRPC, and message queues using RabbitMQ and Kafka.

## Synchronous vs Asynchronous Communication

The choice between synchronous and asynchronous communication has profound implications for system design.

### Synchronous Communication

In synchronous communication, the caller waits for a response before proceeding.

```javascript
class SynchronousOrderService {
  constructor() {
    this.inventoryClient = new HTTPClient('http://inventory-service');
    this.paymentClient = new HTTPClient('http://payment-service');
    this.shippingClient = new HTTPClient('http://shipping-service');
  }

  async createOrder(order) {
    console.log('Creating order synchronously...');

    try {
      // Caller blocks waiting for each response
      console.log('Checking inventory...');
      const inventoryResponse = await this.inventoryClient.post('/check', {
        items: order.items
      });

      if (!inventoryResponse.available) {
        throw new Error('Items not available');
      }

      console.log('Processing payment...');
      const paymentResponse = await this.paymentClient.post('/charge', {
        amount: order.total,
        customerId: order.customerId
      });

      if (!paymentResponse.success) {
        throw new Error('Payment failed');
      }

      console.log('Scheduling shipping...');
      const shippingResponse = await this.shippingClient.post('/schedule', {
        orderId: order.id,
        address: order.shippingAddress
      });

      return {
        orderId: order.id,
        status: 'CONFIRMED',
        trackingNumber: shippingResponse.trackingNumber
      };

    } catch (error) {
      console.error('Order creation failed:', error);
      // Must handle compensation manually
      await this.compensate(order);
      throw error;
    }
  }
}
```

**Advantages:**
- Simple to understand and implement
- Immediate error feedback
- Natural request-response flow

**Disadvantages:**
- Caller blocked during processing
- Tight coupling between services
- Cascading failures
- Higher latency (sum of all service calls)

### Asynchronous Communication

In asynchronous communication, the caller doesn't wait for a response.

```javascript
class AsynchronousOrderService {
  constructor() {
    this.eventBus = new EventBus('kafka');
  }

  async createOrder(order) {
    console.log('Creating order asynchronously...');

    // Save order as pending
    const orderRecord = await this.database.orders.create({
      ...order,
      status: 'PENDING',
      createdAt: Date.now()
    });

    // Publish event - don't wait for processing
    await this.eventBus.publish('OrderCreated', {
      orderId: orderRecord.id,
      items: order.items,
      customerId: order.customerId,
      total: order.total,
      timestamp: Date.now()
    });

    // Return immediately
    return {
      orderId: orderRecord.id,
      status: 'PENDING',
      message: 'Order is being processed'
    };
  }

  // Event handlers in other services
  async onOrderCreated(event) {
    // Inventory Service handler
    await this.checkAndReserve(event.items);
    await this.eventBus.publish('InventoryReserved', {
      orderId: event.orderId,
      items: event.items
    });
  }

  async onInventoryReserved(event) {
    // Payment Service handler
    await this.processPayment(event.orderId);
    await this.eventBus.publish('PaymentCompleted', {
      orderId: event.orderId
    });
  }

  async onPaymentCompleted(event) {
    // Shipping Service handler
    await this.scheduleShipment(event.orderId);
    await this.eventBus.publish('ShipmentScheduled', {
      orderId: event.orderId,
      trackingNumber: 'TRACK123'
    });
  }
}
```

**Advantages:**
- Non-blocking, higher throughput
- Loose coupling between services
- Better fault tolerance
- Natural for event-driven systems

**Disadvantages:**
- More complex to understand
- Delayed error feedback
- Need event ordering and deduplication
- Harder to debug

## REST APIs

REST (Representational State Transfer) is the most common protocol for synchronous service communication.

### REST Service Implementation

```javascript
class ProductService {
  constructor() {
    this.app = express();
    this.database = new Database('products');
    this.setupRoutes();
  }

  setupRoutes() {
    // GET /products - List products
    this.app.get('/products', async (req, res) => {
      const { page = 1, limit = 20, category } = req.query;

      const products = await this.database.products.find({
        ...(category && { category }),
        skip: (page - 1) * limit,
        limit: parseInt(limit)
      });

      res.json({
        data: products,
        page: parseInt(page),
        total: await this.database.products.count({ category })
      });
    });

    // GET /products/:id - Get single product
    this.app.get('/products/:id', async (req, res) => {
      const product = await this.database.products.findById(req.params.id);

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.json(product);
    });

    // POST /products - Create product
    this.app.post('/products', async (req, res) => {
      const { name, price, category, description } = req.body;

      // Validation
      if (!name || !price) {
        return res.status(400).json({ error: 'Name and price required' });
      }

      const product = await this.database.products.create({
        name,
        price,
        category,
        description,
        createdAt: Date.now()
      });

      res.status(201).json(product);
    });

    // PUT /products/:id - Update product
    this.app.put('/products/:id', async (req, res) => {
      const product = await this.database.products.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.json(product);
    });

    // DELETE /products/:id - Delete product
    this.app.delete('/products/:id', async (req, res) => {
      await this.database.products.findByIdAndDelete(req.params.id);
      res.status(204).send();
    });
  }

  start(port) {
    this.app.listen(port, () => {
      console.log(`Product Service running on port ${port}`);
    });
  }
}
```

### REST Client with Resilience

```javascript
class ResilientRESTClient {
  constructor(baseURL, options = {}) {
    this.baseURL = baseURL;
    this.timeout = options.timeout || 5000;
    this.retries = options.retries || 3;
    this.circuitBreaker = new CircuitBreaker(options.circuitBreaker);
  }

  async get(path, params = {}) {
    const url = `${this.baseURL}${path}?${this.buildQueryString(params)}`;

    return await this.executeWithResilience(async () => {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Request-ID': this.generateRequestId()
        },
        timeout: this.timeout
      });

      if (!response.ok) {
        throw new HTTPError(response.status, await response.text());
      }

      return await response.json();
    });
  }

  async post(path, data) {
    const url = `${this.baseURL}${path}`;

    return await this.executeWithResilience(async () => {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        timeout: this.timeout
      });

      if (!response.ok) {
        throw new HTTPError(response.status, await response.text());
      }

      return await response.json();
    });
  }

  async executeWithResilience(operation) {
    // Circuit breaker check
    if (this.circuitBreaker.isOpen()) {
      throw new Error('Circuit breaker is OPEN');
    }

    // Retry logic
    for (let attempt = 1; attempt <= this.retries; attempt++) {
      try {
        const result = await operation();
        this.circuitBreaker.recordSuccess();
        return result;

      } catch (error) {
        console.error(`Attempt ${attempt} failed:`, error);

        if (attempt === this.retries) {
          this.circuitBreaker.recordFailure();
          throw error;
        }

        // Exponential backoff
        const delay = Math.min(1000 * Math.pow(2, attempt), 10000);
        await this.sleep(delay);
      }
    }
  }

  buildQueryString(params) {
    return Object.entries(params)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');
  }

  generateRequestId() {
    return `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

## gRPC

gRPC is a high-performance RPC framework using HTTP/2 and Protocol Buffers.

### Protocol Buffers Definition

```protobuf
// order.proto
syntax = "proto3";

package orders;

service OrderService {
  rpc CreateOrder (CreateOrderRequest) returns (CreateOrderResponse);
  rpc GetOrder (GetOrderRequest) returns (Order);
  rpc ListOrders (ListOrdersRequest) returns (ListOrdersResponse);
  rpc StreamOrderUpdates (StreamOrdersRequest) returns (stream OrderUpdate);
}

message CreateOrderRequest {
  string customer_id = 1;
  repeated OrderItem items = 2;
  Address shipping_address = 3;
}

message CreateOrderResponse {
  string order_id = 1;
  OrderStatus status = 2;
  double total = 3;
}

message Order {
  string order_id = 1;
  string customer_id = 2;
  repeated OrderItem items = 3;
  Address shipping_address = 4;
  OrderStatus status = 5;
  int64 created_at = 6;
}

message OrderItem {
  string product_id = 1;
  int32 quantity = 2;
  double price = 3;
}

message Address {
  string street = 1;
  string city = 2;
  string state = 3;
  string zip = 4;
  string country = 5;
}

enum OrderStatus {
  PENDING = 0;
  CONFIRMED = 1;
  SHIPPED = 2;
  DELIVERED = 3;
  CANCELLED = 4;
}

message GetOrderRequest {
  string order_id = 1;
}

message ListOrdersRequest {
  string customer_id = 1;
  int32 page = 2;
  int32 page_size = 3;
}

message ListOrdersResponse {
  repeated Order orders = 1;
  int32 total = 2;
}

message StreamOrdersRequest {
  string customer_id = 1;
}

message OrderUpdate {
  string order_id = 1;
  OrderStatus status = 2;
  string message = 3;
  int64 timestamp = 4;
}
```

### gRPC Server Implementation

```javascript
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

class GRPCOrderService {
  constructor() {
    this.database = new Database('orders');
    this.loadProto();
  }

  loadProto() {
    const packageDefinition = protoLoader.loadSync('order.proto', {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    });

    this.proto = grpc.loadPackageDefinition(packageDefinition).orders;
  }

  // Implement RPC methods
  async createOrder(call, callback) {
    const request = call.request;

    try {
      const order = await this.database.orders.create({
        customerId: request.customer_id,
        items: request.items,
        shippingAddress: request.shipping_address,
        status: 'PENDING',
        createdAt: Date.now()
      });

      callback(null, {
        order_id: order.id,
        status: order.status,
        total: this.calculateTotal(order.items)
      });

    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error.message
      });
    }
  }

  async getOrder(call, callback) {
    const orderId = call.request.order_id;

    try {
      const order = await this.database.orders.findById(orderId);

      if (!order) {
        return callback({
          code: grpc.status.NOT_FOUND,
          message: 'Order not found'
        });
      }

      callback(null, order);

    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error.message
      });
    }
  }

  async listOrders(call, callback) {
    const { customer_id, page, page_size } = call.request;

    try {
      const orders = await this.database.orders.find({
        customerId: customer_id,
        skip: (page - 1) * page_size,
        limit: page_size
      });

      const total = await this.database.orders.count({
        customerId: customer_id
      });

      callback(null, { orders, total });

    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error.message
      });
    }
  }

  // Server-side streaming
  streamOrderUpdates(call) {
    const customerId = call.request.customer_id;

    // Send updates as they occur
    const subscription = this.subscribeToOrderUpdates(customerId, (update) => {
      call.write({
        order_id: update.orderId,
        status: update.status,
        message: update.message,
        timestamp: Date.now()
      });
    });

    // Handle client disconnect
    call.on('cancelled', () => {
      subscription.unsubscribe();
    });
  }

  start(port) {
    const server = new grpc.Server();

    server.addService(this.proto.OrderService.service, {
      CreateOrder: this.createOrder.bind(this),
      GetOrder: this.getOrder.bind(this),
      ListOrders: this.listOrders.bind(this),
      StreamOrderUpdates: this.streamOrderUpdates.bind(this)
    });

    server.bindAsync(
      `0.0.0.0:${port}`,
      grpc.ServerCredentials.createInsecure(),
      () => {
        console.log(`gRPC Order Service running on port ${port}`);
        server.start();
      }
    );
  }

  calculateTotal(items) {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
}
```

### gRPC Client

```javascript
class GRPCOrderClient {
  constructor(serverAddress) {
    const packageDefinition = protoLoader.loadSync('order.proto');
    const proto = grpc.loadPackageDefinition(packageDefinition).orders;

    this.client = new proto.OrderService(
      serverAddress,
      grpc.credentials.createInsecure()
    );
  }

  async createOrder(order) {
    return new Promise((resolve, reject) => {
      this.client.CreateOrder(order, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  async getOrder(orderId) {
    return new Promise((resolve, reject) => {
      this.client.GetOrder({ order_id: orderId }, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  streamOrderUpdates(customerId, onUpdate) {
    const call = this.client.StreamOrderUpdates({ customer_id: customerId });

    call.on('data', (update) => {
      onUpdate(update);
    });

    call.on('end', () => {
      console.log('Stream ended');
    });

    call.on('error', (error) => {
      console.error('Stream error:', error);
    });

    return {
      cancel: () => call.cancel()
    };
  }
}

// Usage
const client = new GRPCOrderClient('localhost:50051');

const order = await client.createOrder({
  customer_id: 'cust123',
  items: [
    { product_id: 'prod1', quantity: 2, price: 29.99 },
    { product_id: 'prod2', quantity: 1, price: 49.99 }
  ],
  shipping_address: {
    street: '123 Main St',
    city: 'San Francisco',
    state: 'CA',
    zip: '94102',
    country: 'USA'
  }
});

console.log('Order created:', order.order_id);
```

## Message Queues with RabbitMQ

RabbitMQ enables asynchronous, reliable message passing between services.

### RabbitMQ Publisher

```javascript
class RabbitMQPublisher {
  constructor() {
    this.connection = null;
    this.channel = null;
  }

  async connect() {
    this.connection = await amqp.connect('amqp://localhost');
    this.channel = await this.connection.createChannel();

    // Declare exchange
    await this.channel.assertExchange('orders', 'topic', { durable: true });

    console.log('Connected to RabbitMQ');
  }

  async publishOrderEvent(event, routingKey) {
    const message = Buffer.from(JSON.stringify({
      ...event,
      timestamp: Date.now(),
      messageId: this.generateMessageId()
    }));

    this.channel.publish(
      'orders',          // exchange
      routingKey,        // routing key (e.g., 'order.created')
      message,
      {
        persistent: true,
        contentType: 'application/json',
        messageId: this.generateMessageId(),
        timestamp: Date.now()
      }
    );

    console.log(`Published event: ${routingKey}`);
  }

  async publishOrderCreated(order) {
    await this.publishOrderEvent({
      type: 'OrderCreated',
      orderId: order.id,
      customerId: order.customerId,
      items: order.items,
      total: order.total
    }, 'order.created');
  }

  async publishOrderShipped(orderId, trackingNumber) {
    await this.publishOrderEvent({
      type: 'OrderShipped',
      orderId,
      trackingNumber
    }, 'order.shipped');
  }

  generateMessageId() {
    return `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  async close() {
    await this.channel.close();
    await this.connection.close();
  }
}
```

### RabbitMQ Consumer

```javascript
class RabbitMQConsumer {
  constructor(queueName, handlers) {
    this.queueName = queueName;
    this.handlers = handlers;
  }

  async connect() {
    this.connection = await amqp.connect('amqp://localhost');
    this.channel = await this.connection.createChannel();

    // Declare queue
    await this.channel.assertQueue(this.queueName, { durable: true });

    // Bind to exchange
    await this.channel.bindQueue(this.queueName, 'orders', 'order.*');

    // Set prefetch to process one message at a time
    await this.channel.prefetch(1);

    console.log(`Consumer ready for queue: ${this.queueName}`);
  }

  async startConsuming() {
    this.channel.consume(this.queueName, async (msg) => {
      if (!msg) return;

      try {
        const event = JSON.parse(msg.content.toString());

        console.log(`Processing event: ${event.type}`);

        // Find handler for event type
        const handler = this.handlers[event.type];

        if (handler) {
          await handler(event);

          // Acknowledge message
          this.channel.ack(msg);
        } else {
          console.warn(`No handler for event type: ${event.type}`);
          // Reject without requeue
          this.channel.nack(msg, false, false);
        }

      } catch (error) {
        console.error('Error processing message:', error);

        // Requeue message for retry
        this.channel.nack(msg, false, true);
      }
    });
  }
}

// Inventory Service consumes order events
const inventoryConsumer = new RabbitMQConsumer('inventory-queue', {
  'OrderCreated': async (event) => {
    await inventoryService.reserveItems(event.orderId, event.items);
  },
  'OrderCancelled': async (event) => {
    await inventoryService.releaseItems(event.orderId);
  }
});

await inventoryConsumer.connect();
await inventoryConsumer.startConsuming();
```

## Apache Kafka for Event Streaming

Kafka provides distributed, fault-tolerant event streaming.

```javascript
class KafkaProducer {
  constructor() {
    this.kafka = new Kafka({
      clientId: 'order-service',
      brokers: ['localhost:9092']
    });

    this.producer = this.kafka.producer();
  }

  async connect() {
    await this.producer.connect();
    console.log('Connected to Kafka');
  }

  async publishEvent(topic, event) {
    await this.producer.send({
      topic,
      messages: [
        {
          key: event.orderId,  // Partition by order ID
          value: JSON.stringify(event),
          headers: {
            'event-type': event.type,
            'timestamp': Date.now().toString()
          }
        }
      ]
    });

    console.log(`Published to ${topic}:`, event.type);
  }

  async publishOrderEvent(event) {
    await this.publishEvent('orders', event);
  }
}

class KafkaConsumer {
  constructor(groupId, topics, handlers) {
    this.kafka = new Kafka({
      clientId: 'order-consumer',
      brokers: ['localhost:9092']
    });

    this.consumer = this.kafka.consumer({ groupId });
    this.topics = topics;
    this.handlers = handlers;
  }

  async connect() {
    await this.consumer.connect();
    await this.consumer.subscribe({ topics: this.topics, fromBeginning: true });
    console.log(`Subscribed to topics: ${this.topics.join(', ')}`);
  }

  async startConsuming() {
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const event = JSON.parse(message.value.toString());
        const eventType = message.headers['event-type'].toString();

        console.log(`Received ${eventType} from ${topic}:${partition}`);

        const handler = this.handlers[eventType];

        if (handler) {
          await handler(event);
        } else {
          console.warn(`No handler for event type: ${eventType}`);
        }
      }
    });
  }
}

// Usage
const producer = new KafkaProducer();
await producer.connect();

await producer.publishOrderEvent({
  type: 'OrderCreated',
  orderId: 'order123',
  customerId: 'cust456',
  total: 129.98
});
```

Service communication is the backbone of microservices architecture. REST provides familiar, standard HTTP-based APIs; gRPC offers high-performance, strongly-typed RPC; and message queues with RabbitMQ or Kafka enable asynchronous, decoupled communication. The choice depends on latency requirements, coupling tolerance, and consistency needs.
