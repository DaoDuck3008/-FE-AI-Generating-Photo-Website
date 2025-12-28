# Frontend for ID Photo Processing System

## Overview

This frontend application provides a user interface for an ID photo processing system.  
Users can preview photos, adjust background color and image parameters, submit processing requests, and download print-ready results.

The frontend is designed to work with a **job-based backend API**, displaying loading states and final results without page reloads.

---

## Tech Stack

- **Framework**: Next.js (App Router)
- **UI**: React, Tailwind CSS, Shadcn Studio
- **HTTP Client**: Axios
- **Image Rendering**: next-cloudinary
- **Notifications**: react-toastify
- **File Upload**: react-dropzone
- **Language**: TypeScript

---

## Key Features

- Image preview before processing
- Background color selection
- Image adjustment controls (brightness, contrast, saturation)
- Job-based request submission
- Loading modal during processing
- Result modal with download functionality
- Direct asset delivery from cloud storage

---

## Application Flow

```txt
User selects image
 ↓
Frontend sends processing request
 ↓
Backend returns jobId
 ↓
Frontend polls job status
 ↓
Result URL is returned
 ↓
User downloads final image

```

---

## Environment Variables

Create a .env.local file:

```bash
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

How to Run

```bash
npm install
npm run dev
```

The application will be available at:

http://localhost:3000

---

## Design Notes

The frontend does not directly handle image processing logic

All heavy processing is delegated to the backend

Images are downloaded directly from cloud storage for better performance

UI components are kept reusable and stateless where possible
