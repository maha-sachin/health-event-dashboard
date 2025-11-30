# Lambda Layer: Boto3 Dependencies

This layer contains common Python dependencies for all Lambda functions.

## Purpose

- Share boto3 and AWS SDK dependencies across functions
- Reduce individual Lambda package sizes
- Centralize dependency management

## Contents

- boto3 (latest version)
- botocore
- requests
- python-dateutil
- urllib3

## Usage

Reference this layer in Lambda function configurations to avoid bundling common dependencies.

## Files to create:

- `requirements.txt` - Python dependencies
- `build.sh` - Script to build the layer
- `layer.zip` - Packaged layer (generated)
