# API Gateway Specifications

This directory contains OpenAPI/Swagger specifications for the Health Events Dashboard API.

## Purpose

- Define API endpoints, request/response schemas
- Generate API Gateway configurations
- Provide API documentation for frontend developers
- Enable API validation and testing

## Files to create:

- `health-events-api.yaml` - OpenAPI 3.0 specification
- `api-gateway-config.json` - API Gateway specific configurations
- `cors-config.json` - CORS policy configuration

## Endpoints

### GET /health-events

- Fetch AWS Health events with filtering
- Query parameters: regions, services, status, limit, next_token

### POST /event-details

- Get detailed information for specific events
- Request body: { eventArns: [...] }

### GET /affected-entities/{eventArn}

- Retrieve entities affected by a health event
- Path parameter: eventArn
