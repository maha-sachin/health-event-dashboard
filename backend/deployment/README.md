# Deployment Scripts and Configuration

This directory contains scripts and configurations for deploying the serverless backend.

## Purpose

- Automate Lambda function deployments
- Configure API Gateway and IAM roles
- Manage environment-specific configurations
- Provide CI/CD pipeline configurations

## Files to create:

- `deploy.sh` - Main deployment script
- `build-functions.sh` - Build and package Lambda functions
- `create-layer.sh` - Create and deploy Lambda layers
- `env-configs/` - Environment-specific variables
  - `dev.env`
  - `staging.env`
  - `prod.env`
- `github-actions/` - CI/CD workflows
- `makefile` - Build automation

## Usage

```bash
# Deploy to development
./deploy.sh dev

# Deploy to production
./deploy.sh prod

# Build Lambda layer
./create-layer.sh
```
