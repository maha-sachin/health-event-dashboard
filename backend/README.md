# Backend Structure for AWS Health Events Dashboard

This directory contains the serverless backend infrastructure for the AWS Health Events Dashboard.

## Folder Structure

```
backend/
├── lambda/                          # Lambda function source code
│   ├── health-events/              # Get health events
│   ├── event-details/              # Get event details
│   ├── affected-entities/          # Get affected entities
│   └── shared/                     # Shared utilities across lambdas
├── infrastructure/                  # Infrastructure as Code
│   ├── cloudformation/             # CloudFormation templates
│   ├── terraform/                  # Terraform configurations (alternative)
│   └── sam/                        # SAM (Serverless Application Model) templates
├── layers/                         # Lambda layers for shared dependencies
│   └── boto3-layer/               # Boto3 and common libraries
├── api-specs/                      # API Gateway specifications
└── deployment/                     # Deployment scripts and configs
```

## Architecture

- **API Gateway**: RESTful API endpoints
- **Lambda Functions**: Serverless compute using Python + Boto3
- **IAM Roles**: Least privilege access to AWS Health API
- **CloudWatch**: Logging and monitoring

## Lambda Functions

1. **health-events**: Fetch AWS Health events with filtering
2. **event-details**: Get detailed information for specific events
3. **affected-entities**: Retrieve affected AWS resources
4. **shared**: Common utilities and boto3 client configurations
