# AWS Health Events Dashboard - FinOps

Internal dashboard for monitoring and managing AWS service health events, designed specifically for FinOps teams to track service incidents, cost implications, and operational impact.

## 🏗️ Architecture

This project uses a **serverless architecture** with:

- **Frontend**: React + Vite application hosted on static hosting (S3/CloudFront)
- **Backend**: AWS Lambda functions with API Gateway
- **Data Source**: AWS Health API via boto3
- **Infrastructure**: CloudFormation/Terraform/SAM templates

## 📁 Project Structure

```
health-event-dashboard/
├── frontend/                    # React frontend application
│   ├── src/                    # Source code
│   │   ├── components/         # UI components
│   │   ├── pages/              # Page components
│   │   ├── api/                # API client
│   │   └── lib/                # Utilities
│   ├── package.json            # Frontend dependencies
│   └── vite.config.js          # Build configuration
│
├── backend/                     # Serverless backend
│   ├── lambda/                 # Lambda function source code
│   │   ├── health-events/      # Get health events
│   │   ├── event-details/      # Get event details
│   │   ├── affected-entities/  # Get affected entities
│   │   └── shared/             # Shared utilities
│   ├── infrastructure/         # IaC templates
│   │   ├── cloudformation/     # CloudFormation templates
│   │   ├── terraform/          # Terraform configs
│   │   └── sam/                # SAM templates
│   ├── layers/                 # Lambda layers
│   └── deployment/             # Deploy scripts
│
└── README.md                   # This file
```

## 🚀 Quick Start

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

### Backend Deployment

```bash
cd backend
./deployment/deploy.sh dev
```

## 🎯 Features

- **Real-time Health Monitoring**: Live AWS service health events
- **Multi-Account Support**: Monitor health across AWS organization
- **Cost Impact Analysis**: FinOps-focused cost implications
- **Interactive Dashboard**: Filter, search, and drill-down capabilities
- **Responsive Design**: Works on desktop and mobile
- **Serverless Architecture**: Scalable and cost-effective

## 🔧 Technology Stack

### Frontend

- React 18 with Vite
- Tailwind CSS + Radix UI
- React Query for data fetching
- React Router for navigation

### Backend

- AWS Lambda (Python)
- API Gateway
- boto3 for AWS Health API
- CloudWatch for logging

### Infrastructure

- CloudFormation/Terraform/SAM
- S3 + CloudFront for frontend hosting
- IAM roles with least privilege

## 📊 API Endpoints

- `GET /api/health-events` - Fetch health events with filtering
- `POST /api/event-details` - Get detailed event information
- `GET /api/affected-entities/{eventArn}` - Get affected AWS resources

## 🔐 Security & Permissions

- IAM roles with minimal required permissions
- API Gateway with CORS configured
- Environment-based access controls
- No sensitive data stored in frontend

## 📈 Monitoring & Logging

- CloudWatch logs for all Lambda functions
- API Gateway request/response logging
- Error tracking and alerting
- Performance monitoring

## 🌍 Multi-Environment Support

- Development environment for testing
- Staging for pre-production validation
- Production with enhanced monitoring and alerts
