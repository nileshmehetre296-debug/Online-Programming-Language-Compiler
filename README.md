# Online Compiler

A web-based code compiler that supports multiple programming languages including JavaScript, Python, C++, and Java. Users can write, compile, and execute code directly in their browser and see the output or errors in real-time.

## Description

Online Compiler is a modern web application that provides a seamless coding experience through a browser. Built with TypeScript and React, it offers a robust platform for writing and executing code in multiple programming languages. The application features a clean interface, real-time compilation, and detailed error reporting.

### Table of Contents

- [Features](#features)
- [Tech Stack & Services](#tech-stack--services)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [How It Works](#how-it-works)
- [Future Enhancements](#future-enhancements)
- [License](#license)

## Features

- Multi-Language Support
  - JavaScript execution
  - Python compilation and execution
  - C++ compilation and execution
  - Java compilation and execution

- Code Editor
  - Syntax highlighting
  - Error highlighting
  - Auto-completion
  - Line numbers

- Execution Environment
  - Secure code execution
  - Real-time output display
  - Detailed error reporting
  - Execution time limits

## Tech Stack & Services

- Frontend
  - React.js with TypeScript
  - Tailwind CSS for styling
  - HTML5

- Backend
  - Node.js
  - Swagger for API documentation

- Cloud Services
  - AWS for infrastructure

- DevOps
  - Docker
  - Docker Compose for containerization
  - Environment-based configuration

###### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/online-compiler.git
   cd online-compiler
   ```

2. Install dependencies:
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. Set up environment variables (see Environment Variables section)

4. Start the development environment:
   ```bash
   # Start all services using Docker Compose
   docker-compose up --build
   ```

5. Access the application:
   ```
   Frontend: http://localhost
   Backend: http://localhost:3000
   ```

## Environment Variables

Create `.env` files in both frontend and backend directories:

```env
# Frontend (.env)
VITE_API_URL="http://localhost:3000/api/v1"

# Backend (.env)
# Server configuration
PORT=3000
HOST="localhost"

# AWS configuration
AWS_REGION="your-aws-region"
AWS_ACCESS_KEY_ID="your-aws-access-key-id"
AWS_SECRET_ACCESS_KEY="your-aws-secret-access-key"
AWS_LOG_GROUP_NAME="your-log-group-name"
```

## How It Works

1. Code Submission
   - User selects programming language
   - Writes code in the editor
   - Submits for execution

2. Code Processing
   - Code is sent to backend
   - Appropriate compiler/interpreter is selected
   - Code is executed in isolated container

3. Result Generation
   - Output is captured
   - Errors are caught and formatted
   - Results are sent back to frontend
   - User sees output or error messages

## Future Enhancements

1. User Interface Improvements
   - Enhanced code editor features
   - More language support
   - Custom themes
   - Keyboard shortcuts

2. Performance Optimization
   - Caching frequently used containers
   - Optimizing compilation time
   - Load balancing for multiple requests

3. Additional Features
   - Code sharing functionality
   - Save code snippets
   - Multiple file support
   - Custom input support
