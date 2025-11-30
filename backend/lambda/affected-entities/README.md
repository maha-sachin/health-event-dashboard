# Affected Entities Lambda Function

This Lambda function handles fetching AWS resources affected by health events.

## Purpose

- Retrieve affected entities (EC2 instances, RDS databases, etc.)
- Map events to specific AWS resources
- Provide resource-level impact information for FinOps analysis

## API Endpoint

`GET /api/affected-entities/{eventArn}`

## Path Parameters

- `eventArn`: The ARN of the health event

## Implementation

- **Runtime**: Python 3.9+
- **Dependencies**: boto3, json, logging
- **IAM Permissions**: health:DescribeAffectedEntities
- **Timeout**: 15 seconds
- **Memory**: 256 MB

## Files to create:

- `lambda_function.py` - Main handler
- `requirements.txt` - Python dependencies
- `test_events.json` - Test event payloads
