# API Design

## Introduction

API (Application Programming Interface) design is about defining how your frontend communicates with your backend, how external services integrate with your application, and how different parts of your system interact. A well-designed API is intuitive, consistent, secure, and performant. Poor API design creates friction for developers (including future you), leads to bugs, and makes systems hard to maintain and extend.

For capstone projects, API design is critical because your frontend and backend are separate concerns. The API is the contract between them. Time spent designing a clean, thoughtful API makes frontend development smoother and creates a professional portfolio piece.

## Learning Objectives

By the end of this lesson, you will be able to:

- Design RESTful APIs following best practices
- Structure API endpoints logically
- Handle authentication and authorization in APIs
- Implement proper error handling and status codes
- Version APIs for future compatibility
- Document APIs effectively
- Apply rate limiting and security measures
- Choose between REST, GraphQL, and other API styles

## REST API Principles

### REST Constraints

**1. Client-Server Separation**
Frontend and backend are independent, communicate via HTTP.

**2. Stateless**
Each request contains all information needed; server doesn't store client state.

**3. Cacheable**
Responses indicate if they can be cached.

**4. Uniform Interface**
Consistent patterns for all endpoints.

**5. Layered System**
Client doesn't know if connected directly to server or through intermediaries.

### HTTP Methods

**GET:** Retrieve resources (idempotent, safe)
```
GET /api/activities
GET /api/activities/123
```

**POST:** Create new resources
```
POST /api/activities
Body: { "category": "transportation", "quantity": 10 }
```

**PUT:** Update entire resource (idempotent)
```
PUT /api/activities/123
Body: { "category": "transportation", "quantity": 15, ... }
```

**PATCH:** Update part of resource
```
PATCH /api/activities/123
Body: { "quantity": 15 }
```

**DELETE:** Remove resource (idempotent)
```
DELETE /api/activities/123
```

## Endpoint Design

### Resource-Based URLs

**Good (noun-based):**
```
GET    /api/users
POST   /api/users
GET    /api/users/123
PATCH  /api/users/123
DELETE /api/users/123

GET    /api/users/123/activities
POST   /api/users/123/activities
```

**Bad (verb-based):**
```
/api/getUsers
/api/createUser
/api/updateUser
/api/deleteUser
```

### Nesting Resources

**Shallow nesting (recommended):**
```
GET /api/activities?user_id=123
POST /api/activities
```

**Deep nesting (avoid beyond 2 levels):**
```
GET /api/users/123/activities/456/comments  # Too deep
```

### Query Parameters

**Filtering:**
```
GET /api/activities?category=transportation
GET /api/activities?user_id=123&category=food
```

**Sorting:**
```
GET /api/activities?sort_by=activity_date&order=desc
```

**Pagination:**
```
GET /api/activities?page=2&limit=20
GET /api/activities?offset=20&limit=20
```

**Field Selection:**
```
GET /api/activities?fields=id,category,carbon_kg
```

## Request and Response Format

### Request Structure

**POST /api/activities**
```json
{
  "category": "transportation",
  "activity_type": "car",
  "quantity": 25.5,
  "unit": "miles",
  "activity_date": "2024-01-15",
  "notes": "Commute to work"
}
```

### Response Structure

**Success Response:**
```json
{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "category": "transportation",
    "activity_type": "car",
    "quantity": 25.5,
    "unit": "miles",
    "carbon_kg": 10.3,
    "activity_date": "2024-01-15",
    "notes": "Commute to work",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

**List Response with Pagination:**
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 147,
    "total_pages": 8
  }
}
```

### Status Codes

**Success:**
- `200 OK` - Successful GET, PUT, PATCH, DELETE
- `201 Created` - Successful POST
- `204 No Content` - Successful DELETE with no response body

**Client Errors:**
- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Authenticated but not authorized
- `404 Not Found` - Resource doesn't exist
- `422 Unprocessable Entity` - Validation errors

**Server Errors:**
- `500 Internal Server Error` - Unexpected server error
- `503 Service Unavailable` - Temporary unavailability

### Error Response Format

**Consistent error structure:**
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "quantity",
        "message": "Must be greater than 0"
      },
      {
        "field": "activity_date",
        "message": "Cannot be in the future"
      }
    ]
  }
}
```

## Authentication & Authorization

### JWT Token Authentication

**Login endpoint:**
```
POST /api/auth/login
Body: { "email": "user@example.com", "password": "..." }

Response:
{
  "data": {
    "user": { "id": "...", "email": "...", "name": "..." },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Authenticated requests:**
```
GET /api/activities
Headers:
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Authorization Patterns

**Resource ownership:**
```typescript
// User can only access their own activities
app.get('/api/activities/:id', authenticate, async (req, res) => {
  const activity = await Activity.findById(req.params.id);
  
  if (!activity) {
    return res.status(404).json({ error: { message: 'Activity not found' }});
  }
  
  if (activity.user_id !== req.user.id) {
    return res.status(403).json({ error: { message: 'Access denied' }});
  }
  
  res.json({ data: activity });
});
```

**Role-based:**
```typescript
// Admin-only endpoint
app.delete('/api/users/:id', authenticate, requireRole('admin'), async (req, res) => {
  // ...
});
```

## Input Validation

### Request Validation

**Using validation library (Zod example):**
```typescript
import { z } from 'zod';

const createActivitySchema = z.object({
  category: z.enum(['transportation', 'energy', 'food', 'waste', 'purchases']),
  activity_type: z.string().min(1).max(100),
  quantity: z.number().positive(),
  unit: z.string().min(1).max(20),
  activity_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  notes: z.string().max(500).optional()
});

app.post('/api/activities', authenticate, async (req, res) => {
  try {
    const validated = createActivitySchema.parse(req.body);
    
    const activity = await activityService.create({
      ...validated,
      user_id: req.user.id
    });
    
    res.status(201).json({ data: activity });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(422).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input',
          details: error.errors
        }
      });
    }
    throw error;
  }
});
```

## API Versioning

### Version in URL

```
/api/v1/activities
/api/v2/activities
```

**When to version:**
- Breaking changes to response format
- Removing fields
- Changing behavior significantly

**Don't version for:**
- Adding optional fields
- Bug fixes
- Performance improvements

## Rate Limiting

### Implementation

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requests per window
  message: {
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests, please try again later'
    }
  }
});

app.use('/api/', limiter);
```

### Per-User Rate Limiting

```typescript
const createActivityLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Max 10 activity creations per minute
  keyGenerator: (req) => req.user.id
});

app.post('/api/activities', authenticate, createActivityLimiter, createActivity);
```

## API Documentation

### OpenAPI/Swagger

```yaml
openapi: 3.0.0
info:
  title: EcoTracker API
  version: 1.0.0
  description: API for tracking carbon footprint

paths:
  /api/activities:
    get:
      summary: List activities
      tags: [Activities]
      security:
        - bearerAuth: []
      parameters:
        - in: query
          name: category
          schema:
            type: string
            enum: [transportation, energy, food, waste, purchases]
        - in: query
          name: page
          schema:
            type: integer
            default: 1
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/Activity'
    
    post:
      summary: Create activity
      tags: [Activities]
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateActivityRequest'
      responses:
        '201':
          description: Created
        '422':
          description: Validation error

components:
  schemas:
    Activity:
      type: object
      properties:
        id:
          type: string
          format: uuid
        category:
          type: string
          enum: [transportation, energy, food, waste, purchases]
        quantity:
          type: number
        carbon_kg:
          type: number
```

## Complete API Example

```typescript
import express from 'express';
import { z } from 'zod';

const app = express();
app.use(express.json());

// Schemas
const createActivitySchema = z.object({
  category: z.enum(['transportation', 'energy', 'food', 'waste', 'purchases']),
  activity_type: z.string().min(1).max(100),
  quantity: z.number().positive(),
  unit: z.string().min(1).max(20),
  activity_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  notes: z.string().max(500).optional()
});

// List activities
app.get('/api/activities', authenticate, async (req, res, next) => {
  try {
    const { category, page = 1, limit = 20 } = req.query;
    
    const activities = await activityService.findAll({
      user_id: req.user.id,
      category,
      page: Number(page),
      limit: Number(limit)
    });
    
    res.json({
      data: activities.items,
      pagination: {
        page: activities.page,
        limit: activities.limit,
        total: activities.total,
        total_pages: Math.ceil(activities.total / activities.limit)
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get single activity
app.get('/api/activities/:id', authenticate, async (req, res, next) => {
  try {
    const activity = await activityService.findById(req.params.id);
    
    if (!activity) {
      return res.status(404).json({
        error: {
          code: 'NOT_FOUND',
          message: 'Activity not found'
        }
      });
    }
    
    if (activity.user_id !== req.user.id) {
      return res.status(403).json({
        error: {
          code: 'FORBIDDEN',
          message: 'Access denied'
        }
      });
    }
    
    res.json({ data: activity });
  } catch (error) {
    next(error);
  }
});

// Create activity
app.post('/api/activities', authenticate, async (req, res, next) => {
  try {
    const validated = createActivitySchema.parse(req.body);
    
    const activity = await activityService.create({
      ...validated,
      user_id: req.user.id
    });
    
    res.status(201).json({ data: activity });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(422).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input',
          details: error.errors
        }
      });
    }
    next(error);
  }
});

// Update activity
app.patch('/api/activities/:id', authenticate, async (req, res, next) => {
  try {
    const activity = await activityService.findById(req.params.id);
    
    if (!activity || activity.user_id !== req.user.id) {
      return res.status(404).json({
        error: { message: 'Activity not found' }
      });
    }
    
    const updated = await activityService.update(req.params.id, req.body);
    res.json({ data: updated });
  } catch (error) {
    next(error);
  }
});

// Delete activity
app.delete('/api/activities/:id', authenticate, async (req, res, next) => {
  try {
    const activity = await activityService.findById(req.params.id);
    
    if (!activity || activity.user_id !== req.user.id) {
      return res.status(404).json({
        error: { message: 'Activity not found' }
      });
    }
    
    await activityService.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Error handler
app.use((error, req, res, next) => {
  console.error(error);
  
  res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred'
    }
  });
});
```

## API Design Checklist

### Endpoint Design
- [ ] Resource-based URLs (nouns, not verbs)
- [ ] Appropriate HTTP methods (GET, POST, PUT, PATCH, DELETE)
- [ ] Consistent naming conventions (snake_case or camelCase)
- [ ] Logical nesting (max 2 levels)
- [ ] Query parameters for filtering, sorting, pagination

### Request/Response
- [ ] Consistent response structure
- [ ] Appropriate status codes
- [ ] Clear error messages
- [ ] Pagination for list endpoints
- [ ] ISO 8601 dates

### Security
- [ ] Authentication required where needed
- [ ] Authorization checks (users access only their data)
- [ ] Input validation on all endpoints
- [ ] Rate limiting implemented
- [ ] CORS configured properly

### Documentation
- [ ] All endpoints documented
- [ ] Request/response examples provided
- [ ] Authentication requirements clear
- [ ] Error responses documented
- [ ] Interactive API docs (Swagger/Postman)

## Summary

Good API design is about consistency, clarity, and developer experience. Follow REST principles, use appropriate HTTP methods and status codes, validate input, handle errors gracefully, and document thoroughly.

For capstone projects, design your API before building the frontend. This contract-first approach clarifies requirements and prevents frontend-backend mismatches. Document your API well—it's a key deliverable and demonstrates professional engineering practice.

Remember: APIs are interfaces for developers. Make them intuitive, predictable, and well-documented. Your future self (and your project evaluators) will thank you.

## Additional Resources

- "REST API Design Rulebook" by Mark Masse
- "Web API Design" by Apigee
- OpenAPI Specification: swagger.io/specification
- REST API Tutorial: restfulapi.net
- Postman for API testing
- Swagger UI for documentation
- JSON API specification: jsonapi.org
