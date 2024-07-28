## BACKEND OF BRAINFORGE WEBSITE: BrainForge

### Schema Structure

![Schema Structure](./assets/Schema.png)

### Razor Pay Process

![Razor Pay Process](./assets/Razor-Pay%20Diagram-2.png)
![Razor Pay Process](./assets/Razor-Pay%20Diagram.png)

## Installation

1. Navigate to the `backend` directory.
2. `cd ./backend`
3. Create a `.env` file by copying the contents of `env.example` and filling in your information.
4. Install dependencies: `npm install`
5. Start the express server: `npm run dev`

> App will be available at port:4000

> Admin Account creation is restricted to lift go to auth controller and remove it.

### Back-end Features

- **User Authentication and Authorization:** Students and instructors can sign up and log in to the platform using their email addresses and passwords. The platform also supports OTP (One-Time Password) verification and forgot password functionality for added security.
- **Course Management:** Instructors can create, read, update, and delete courses, as well as manage course content and media. Students can view and rate courses.
- **Payment Integration:** Students will purchase and enroll in courses by completing the checkout flow, followed by Razorpay integration for payment handling.
- **Cloud-based Media Management:** BrainForge uses Cloudinary, a cloud-based media management service, to store and manage all media content, including images, videos, and documents.
- **Markdown Formatting:** Course content in document format is stored in Markdown format, allowing for easier display and rendering on the front-end.

### Back-end Frameworks, Libraries, and Tools

The back-end of BrainForge uses various frameworks, libraries, and tools to ensure its functionality and performance, including:

- **Node.js:** Used as the primary framework for the back-end.
- **Express.js:** Used as a web application framework, providing a range of features and tools for building web applications.
- **MongoDB:** Used as the primary database, providing a flexible and scalable data storage solution.
- **JWT (JSON Web Tokens):** Used for authentication and authorization, providing a secure and reliable way to manage user credentials.
- **Bcrypt:** Used for password hashing, adding an extra layer of security to user data.
- **Mongoose:** Used as an Object Data Modeling (ODM) library, providing a way to interact with MongoDB using JavaScript.
