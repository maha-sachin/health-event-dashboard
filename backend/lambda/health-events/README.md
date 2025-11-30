# Health Events Lambda Function

This Lambda function handles fetching AWS Health events using boto3.

## Purpose

- Retrieve AWS Health events with filtering capabilities
- Support pagination for large result sets
- Filter by regions, services, event types, status codes
- Return structured JSON response for the frontend

## API Endpoint

`GET /api/health-events`

## Query Parameters

- `regions`: Comma-separated list of AWS regions
- `services`: Comma-separated list of AWS services
- `event_types`: Comma-separated list of event type categories
- `status`: Event status (open, upcoming, closed)
- `limit`: Maximum number of results (default: 100)
- `next_token`: Pagination token

## Implementation

- **Runtime**: Python 3.9+
- **Dependencies**: boto3, json, logging
- **IAM Permissions**: health:Describe*, organizations:List*
- **Timeout**: 30 seconds
- **Memory**: 256 MB

## Files to create:

- `lambda_function.py` - Main handler
- `requirements.txt` - Python dependencies
- `test_events.json` - Test event payloads
