# Game Spaces Server

The **Game Spaces** allows users to book sports facilities with ease and provides admins the ability to manage these facilities and bookings.

---

### [Live Server](https://game-spaces-server.vercel.app)

```console
https://game-spaces-server.vercel.app
```

## Used Technologies:

- TypeScript
- Node.js
- Express.js
- Mongoose
- JWT
- Zod

## Features:

- **User Authentication and Authorization:**
  Users can sign up and log in using their email and password. Admins have additional powers for managing facilities and bookings.

- **Facility Management:**
  Admins can create, update, and delete facilities. Each facility has details like name, description, price per hour, and location.

- **Booking System:**
  Users can book facilities by specifying the date, start time, and end time. The system calculates the payable amount based on the duration of the booking.

- **Availability Checking:**
  Users can check the availability of facilities for a specific date.

- **View Bookings:**
  Admins can view all bookings, while users can view only their own bookings. This helps in managing and tracking reservations efficiently.

- **Booking Cancellation:**
  Users have the ability to cancel their bookings.

- **Error Handling:**
  Comprehensive error handling ensures proper responses and messages for validation errors, duplicate entries, and not found routes.

- **Authentication Middleware:**
  Middleware is implemented to protect routes, ensuring that only authenticated users and admins can access their respective routes.

- **Security:**
  JWT based authentication is implemented to protect routes and ensure that only authorized users and admins can access their respective routes.

## How to setup in local computer:

### Clone the Repository:

```plain
git clone https://github.com/Rahad-Ullah/Game-Spaces-server.git
```

### Install Dependencies:

```markdown
npm install
```

### Environment Variables:

- Create a `.env` file in the root directory.
- Add the following environment variables:

```markdown
PORT=5000
DATABASE_URL=your_database_url
BCRYPT_SALT_ROUNDS=any_integer_number
JWT_ACCESS_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_secret
JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=365d
SSLCZ_STORE_ID=your_sslcommerz_id
SSLCZ_STORE_PASSWORD=your_sslcommerz_password
```

### Run the Application:

```markdown
npm run start:dev
```

## How to use the application:

### 1. User Registration

- Endpoint: `POST /api/auth/signup`
- Request Body:

```json
{
  "name": "Rahad Ullah",
  "email": "rahadullah@gmail.com",
  "password": "password123",
  "phone": "1234567890",
  "role": "user",
  "address": "123 Savar, Dhaka"
}
```

### 2. User Login

- Endpoint: `POST /api/auth/login`
- Request Body:

```json
{
  "email": "rahadullah@email.com",
  "password": "password123"
}
```

### 3. Create a Facility (Admin Only)

- Endpoint: `POST /api/facility`
- Headers:

```markdown
Authorization: Bearer YOUR_JWT_TOKEN
```

- Request Body:

```json
{
  "name": "Football Gallery",
  "description": "Outdoor football gallery with synthetic surface.",
  "pricePerHour": 100,
  "location": "53 National Stadium"
}
```

### 4. Update a Facility (Admin Only)

- Endpoint: `PUT /api/facility/:id`
- Headers:

```markdown
Authorization: Bearer YOUR_JWT_TOKEN
```

- Request Body:

```json
{
  "name": "Update Football Gallery",
  "description": "Outdoor football gallery with synthetic surface.",
  "pricePerHour": 120,
  "location": "53 National Stadium"
}
```

### 5. Delete a Facility (Admin Only)

- Endpoint: `DELETE /api/facility/:id`
- Headers:

```markdown
Authorization: Bearer YOUR_JWT_TOKEN
```

### 6. Get All Facilities

- Endpoint: `GET /api/facility`

### 7. Check Time Slot Availability

- Endpoint: `GET /api/check-availability`
- Query Parameters:

```markdown
date=2024-07-09
```

### 8. Create a Booking (User Only)

- Endpoint: `POST /api/bookings`
- Headers:

```markdown
Authorization: Bearer YOUR_JWT_TOKEN
```

- Request Body:

```json
{
  "facility": "60d9c4e4f3b4b544b8b8d1c5",
  "date": "2024-07-09",
  "startTime": "12:00",
  "endTime": "15:00"
}
```

**Note:** The startTime and endTime should be in `HH:MM` with 24 hours format and date should be in `YYYY-MM-DD` format.

### 9. View All Bookings (Admin Only)

- Endpoint: `GET /api/bookings`
- Headers:

```markdown
Authorization: Bearer YOUR_JWT_TOKEN
```

### 10. View Bookings by User (User Only)

- Endpoint: `GET /api/bookings/user`
- Headers:

```markdown
Authorization: Bearer YOUR_JWT_TOKEN
```

### 11. Cancel a Booking (User Only)

- Endpoint: `DELETE /api/bookings/:id`
- Headers:

```markdown
Authorization: Bearer YOUR_JWT_TOKEN
```

### Error Handling

The application handles errors such as validation errors, duplicate entries, and not found routes with appropriate error messages and status codes.

### Security

JWT based authentication is implemented to protect routes and ensure that only authorized users and admins can access their respective routes.
By following these steps and using the endpoints provided, you can efficiently manage users, facilities, and bookings in the sports facility booking platform.

## Happy Coding 😎
