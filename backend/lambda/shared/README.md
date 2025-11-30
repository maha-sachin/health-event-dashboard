# Shared Lambda Utilities

This directory contains shared code and utilities used across multiple Lambda functions.

## Purpose

- Common boto3 client configurations
- Error handling and response formatting utilities
- Logging configuration
- Data transformation helpers

## Files to create:

- `health_client.py` - Boto3 Health client wrapper
- `response_utils.py` - Standard API response formatting
- `logger_config.py` - Centralized logging setup
- `error_handlers.py` - Common error handling patterns
- `data_transformers.py` - Data mapping and transformation utilities

## Usage

Lambda functions can import shared utilities:

```python
from shared.health_client import get_health_client
from shared.response_utils import success_response, error_response
```
