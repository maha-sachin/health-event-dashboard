// Simple mock client for local development (no AWS SDK dependencies)
console.log('🚀 Loading simplified health events client for local development');

// Mock health events data
const MOCK_HEALTH_EVENTS = [
  {
    arn: "arn:aws:health:us-east-1::event/EC2/AWS_EC2_OPERATIONAL_ISSUE/AWS_EC2_OPERATIONAL_ISSUE_USEAST1_EC2_20241130_001",
    service: "EC2",
    eventTypeCode: "AWS_EC2_OPERATIONAL_ISSUE",
    eventTypeCategory: "issue",
    region: "us-east-1",
    startTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    endTime: null,
    lastUpdatedTime: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    statusCode: "open",
    eventScopeCode: "PUBLIC",
    description: "We are investigating connectivity issues affecting some EC2 instances in the US-East-1 region."
  },
  {
    arn: "arn:aws:health:us-west-2::event/RDS/AWS_RDS_MAINTENANCE_SCHEDULED/AWS_RDS_MAINTENANCE_SCHEDULED_USWEST2_20241201",
    service: "RDS",
    eventTypeCode: "AWS_RDS_MAINTENANCE_SCHEDULED", 
    eventTypeCategory: "scheduledChange",
    region: "us-west-2",
    startTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    endTime: new Date(Date.now() + 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000), // Tomorrow + 4 hours
    lastUpdatedTime: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
    statusCode: "upcoming",
    eventScopeCode: "ACCOUNT_SPECIFIC",
    description: "Scheduled maintenance for RDS instances in US-West-2. Some instances may experience brief downtime."
  },
  {
    arn: "arn:aws:health:eu-west-1::event/S3/AWS_S3_OPERATIONAL_NOTIFICATION/AWS_S3_NOTIFICATION_EUWEST1_20241129",
    service: "S3",
    eventTypeCode: "AWS_S3_OPERATIONAL_NOTIFICATION",
    eventTypeCategory: "issue",
    region: "eu-west-1", 
    startTime: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    endTime: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    lastUpdatedTime: new Date(Date.now() - 8 * 60 * 60 * 1000),
    statusCode: "closed",
    eventScopeCode: "PUBLIC",
    description: "Resolved: S3 service degradation in EU-West-1 has been resolved. All services operating normally."
  },
  {
    arn: "arn:aws:health:us-east-1::event/LAMBDA/AWS_LAMBDA_OPERATIONAL_ISSUE/AWS_LAMBDA_ISSUE_USEAST1_20241130",
    service: "LAMBDA",
    eventTypeCode: "AWS_LAMBDA_OPERATIONAL_ISSUE",
    eventTypeCategory: "issue",
    region: "us-east-1",
    startTime: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    endTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    lastUpdatedTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
    statusCode: "closed",
    eventScopeCode: "PUBLIC",
    description: "Resolved: Increased error rates for Lambda functions in US-East-1 have been resolved."
  },
  {
    arn: "arn:aws:health:ap-southeast-1::event/ECS/AWS_ECS_SECURITY_NOTIFICATION/AWS_ECS_SECURITY_20241130",
    service: "ECS",
    eventTypeCode: "AWS_ECS_SECURITY_NOTIFICATION", 
    eventTypeCategory: "accountNotification",
    region: "ap-southeast-1",
    startTime: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    endTime: null,
    lastUpdatedTime: new Date(Date.now() - 1 * 60 * 60 * 1000),
    statusCode: "open",
    eventScopeCode: "ACCOUNT_SPECIFIC",
    description: "Security notification: Please review your ECS task definitions for potential security improvements."
  }
];

// Simplified health events client for local development
export const healthEventsClient = {
  // Get health events
  async getEvents(filters = {}) {
    console.log('🚀 Using mock health events data for local development');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredEvents = [...MOCK_HEALTH_EVENTS];
    
    // Apply basic filtering for demo purposes
    if (filters.eventStatusCodes && filters.eventStatusCodes.length > 0) {
      filteredEvents = filteredEvents.filter(event => 
        filters.eventStatusCodes.includes(event.statusCode)
      );
    }
    
    if (filters.services && filters.services.length > 0) {
      filteredEvents = filteredEvents.filter(event =>
        filters.services.includes(event.service)
      );
    }
    
    if (filters.regions && filters.regions.length > 0) {
      filteredEvents = filteredEvents.filter(event =>
        filters.regions.includes(event.region)
      );
    }
    
    return filteredEvents.slice(0, filters.maxResults || 100);
  },

  // Get event details
  async getEventDetails(eventArns) {
    console.log('🚀 Using mock event details for local development');
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return eventArns.map(arn => {
      const event = MOCK_HEALTH_EVENTS.find(e => e.arn === arn);
      return event ? {
        event,
        eventDescription: {
          latestDescription: event.description
        }
      } : null;
    }).filter(Boolean);
  },

  // Get affected entities
  async getAffectedEntities(eventArn) {
    console.log('🚀 Using mock affected entities for local development');
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Return mock affected entities based on service type
    const event = MOCK_HEALTH_EVENTS.find(e => e.arn === eventArn);
    if (!event) return [];
    
    const mockEntities = {
      'EC2': [
        { entityArn: 'arn:aws:ec2:us-east-1:123456789012:instance/i-1234567890abcdef0', entityValue: 'i-1234567890abcdef0' },
        { entityArn: 'arn:aws:ec2:us-east-1:123456789012:instance/i-0987654321fedcba0', entityValue: 'i-0987654321fedcba0' }
      ],
      'RDS': [
        { entityArn: 'arn:aws:rds:us-west-2:123456789012:db:production-db-1', entityValue: 'production-db-1' }
      ],
      'S3': [
        { entityArn: 'arn:aws:s3:::production-bucket-1', entityValue: 'production-bucket-1' },
        { entityArn: 'arn:aws:s3:::backup-bucket-2', entityValue: 'backup-bucket-2' }
      ]
    };
    
    return mockEntities[event.service] || [];
  },

  // Mock auth for local development
  auth: {
    async me() {
      return {
        id: "user123",
        name: "FinOps User",
        email: "user@company.com",
      };
    },
    logout() {
      console.log("Logout functionality - implement your auth system here");
    },
    redirectToLogin() {
      console.log("Redirect to login - implement your auth system here");
    },
  },

  // Mock entities for backward compatibility
  entities: {
    Incident: {
      async list(sort = "-startTime", limit = 100) {
        const events = await healthEventsClient.getEvents({ maxResults: limit });
        return events.map((event) => ({
          id: event.arn,
          arn: event.arn,
          service: event.service,
          eventTypeCode: event.eventTypeCode,
          eventTypeCategory: event.eventTypeCategory,
          region: event.region,
          startTime: event.startTime,
          endTime: event.endTime,
          lastUpdatedTime: event.lastUpdatedTime,
          statusCode: event.statusCode,
          eventScopeCode: event.eventScopeCode,
          description: event.description || "AWS Health Event",
        }));
      },
    },
  },

  // Mock app logs
  appLogs: {
    logUserInApp: (pageName) => {
      console.log(`User navigated to: ${pageName}`);
      return Promise.resolve();
    },
  },
};