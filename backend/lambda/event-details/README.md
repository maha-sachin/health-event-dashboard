# Event Details Lambda Function

This Lambda function handles fetching detailed information for specific AWS Health events.

## Purpose

- Retrieve detailed descriptions for one or more events
- Get event timeline and status updates
- Provide rich context for events displayed in the dashboard

## API Endpoint

`POST /api/event-details`

## Request Body

```json
{
  "eventArns": ["arn:aws:health:region::event/service/eventTypeCode/eventName"]
}
```

## Implementation

- **Runtime**: Python 3.9+
- **Dependencies**: boto3, json, logging
- **IAM Permissions**: health:DescribeEventDetails
- **Timeout**: 15 seconds
- **Memory**: 256 MB

## Files to create:

- `lambda_function.py` - Main handler
- `requirements.txt` - Python dependencies
- `test_events.json` - Test event payloads
