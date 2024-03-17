# Paggo.AI - Invoice App

## Introduction

Invoice App is the development of a platform designed to enable users to upload invoice images and have the data processed for easier reading and report generation.

## Links

Test application: http://ec2-204-236-194-169.compute-1.amazonaws.com:3000

## Overview

This guide will walk you through setting up and running a web application that integrates a Next.js frontend with a NestJS backend, using AWS services for functionalities such as image upload, OCR processing, and real-time updates. The project architecture involves S3 for storing images, Lambda with Textract for OCR processing, SQS for messaging, and RDS (PostgreSQL) for data persistence.

## Prerequisites

- Node.js installed on your local machine.
- An AWS account with access to S3, Lambda, SQS, and RDS services.
- PostgreSQL installed locally or hosted.
- Basic knowledge of Next.js, NestJS, and AWS services.

## Step 1: Setup the Backend (NestJS)

1. Clone the repository to your local machine.
2. Navigate to the backend directory: `cd paggo-api`.
3. Install dependencies: `npm install`.
4. Configure environment variables:
   - Copy the `.env.example` file to `.env`.
   - Fill in the AWS Credentials, JWT Secret and Postgres connection data.
   - Fill the PORT for API (suggestion: `3001`).
5. Run the NestJS application: `npm run start`.

## Step 2: Setup the Frontend (Next.js)

1. Navigate to the frontend directory from the root of the project: `cd paggo-app`.
2. Install dependencies: `npm install`.
3. Configure the backend API URL in `.env`.
4. Run the Next.js application: `npm run dev`.
5. Open your browser and navigate to `http://localhost:3000` to access the application.

## Step 3: AWS Configuration

### S3 Bucket Setup

1. Log in to your AWS Console.
2. Navigate to S3 and create a new bucket for storing uploaded images.
3. Ensure the bucket has public read access disabled and CORS configured to accept requests from your frontend domain.

### Lambda Function for OCR Processing

1. Create a new Lambda function for OCR processing.
2. Assign it the appropriate IAM role with permissions for S3 and SQS access.
3. Set the trigger as the S3 bucket event for new image uploads.
4. The lambda config files are in the root of this repository (lambda folder).

### SQS Queue Setup

1. Create a new SQS queue to hold OCR processing messages.
2. Configure the queue to trigger another Lambda function or your backend service for result processing.
3. The lambda config files are in the root of this repository (lambda folder).

### RDS (PostgreSQL) Database Setup

1. Create a new PostgreSQL instance in RDS.
2. Ensure it's accessible from your backend service.
3. Use the connection string in your backend's `.env` file.

## Step 4: Running the Application

With the backend and frontend running, and AWS services configured, you can start using the application:

- **Upload Images**: Register, log in and upload invoice images through the frontend interface.
- **View OCR Results**: After upload, OCR results will be processed and displayed in real time using Websockets.

## Troubleshooting

- Ensure all AWS services are correctly configured and have the necessary permissions.
- Check the backend and frontend `.env` files for correct configuration values.
- For real-time updates, ensure WebSockets are properly configured and working between the frontend and backend.

## Conclusion

You've now set up a full-stack application with Next.js and NestJS, integrated with AWS services for image storage, OCR processing, and data storage. This setup provides a robust foundation for further development and scaling.