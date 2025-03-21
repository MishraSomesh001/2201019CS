# 2201019CS
This repository contains two separate Node.js applications:

1. **Average Calculator** - A calculator utility application for numerical operations
2. **Social Media Analytics** - A data analysis platform for social media metrics

## Project Structure

```
2201019CS/
├── README.md
├── calculator/
│   ├── package.json
│   ├── server.js (main entry point)
│   ├── controllers/
│   │   └── number.js
│   ├── services/
│   │   ├── auth.js
│   │   └── numservice.js
│   └── utils/
│       └── util.js
└── Social_Media/
    ├── package.json
    ├── server.js (main entry point)
    ├── controllers/
    │   ├── user.js
    │   └── post.js
    ├── services/
    │   ├── auth.js
    │   ├── userService.js
    │   └── postService.js
    └── utils/
        └── apiHelper.js
```

## Average Calculator

The Average Calculator is a utility application that provides numerical calculation functionality with a clean, user-friendly interface.

### Features

- Basic and advanced mathematical operations
- Calculation history tracking
- User authentication for saved calculations
- Responsive window management

### Technologies Used

- Node.js
- Express.js
- Authentication modules
- Custom calculation services

## Social Media Analytics

The Social Media Analytics platform connects to a test server API to retrieve and analyze social media data, providing valuable insights about user engagement and content performance.

### Features

- User data retrieval and analysis
- Post content analysis with topic extraction
- Comment sentiment analysis
- Efficient data caching and API optimization
- Performance-focused with responsive design

### Technologies Used

- Node.js
- Express.js
- REST API integration
- Data analysis algorithms
- Memory caching

## Installation and Setup

Each application can be installed and run independently:

### Average Calculator

```bash
# Navigate to the average calculator directory
cd average-calculator

# Install dependencies
npm install

# Start the application
npm start
```

### Social Media Analytics

```bash
# Navigate to the social media analytics directory
cd social-media-analytics

# Install dependencies
npm install

# Start the application
npm start
```

## API Documentation

### Average Calculator

- `GET /api/calculate` - Calculate average of provided numbers
- `POST /api/history` - Save calculation to history (requires authentication)
- `GET /api/history` - Retrieve calculation history (requires authentication)

### Social Media Analytics

- `GET /api/users` - Get all users
- `GET /api/users/:userId` - Get user by ID
- `GET /api/users/:userId/posts` - Get posts by user ID
- `GET /api/posts/:postId` - Get post by ID
- `GET /api/posts/:postId/comments` - Get comments for a post
- `GET /api/users/:userId/analytics` - Get analytics for a user's content

## Requirements

- Node.js v14 or higher
- npm v6 or higher
- Internet connection for Social Media Analytics to access the test server
