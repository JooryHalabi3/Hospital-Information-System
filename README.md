# Hospital Backend

Backend API for a hospital information system that supports patients, staff, and administrators. Built with Node.js, Express, and MySQL.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL (via `mysql2`)
- **Session Management:** `express-session`
- **Email Service:** Nodemailer (Gmail)
- **Environment Variables:** `dotenv`
- **CORS:** `cors`

## Features

- **Authentication**
  - Login and signup for patients, staff, and admins
  - Session-based authentication
  - Password recovery via email verification code
- **Patient Portal**
  - View and update patient profile
  - Check session for patient-only pages
- **Staff Portal**
  - View and update employee profile
- **Admin Dashboard**
  - Add policies and services
  - View contact messages
- **Public Pages**
  - View hospital policies
  - Role-based services list
- **Communication**
  - Submit contact messages
  - Admin inbox for messages
- **Evaluation Form**
  - Submit staff evaluation/assessment forms

## Project Structure

```
hospital_backend/
├── .env                          # Environment variables
├── .gitignore                    # Git ignore rules
├── db.js                         # MySQL connection setup
├── index.js                      # Main Express server entry point
├── server.js                     # Alternative Express server entry point
├── package.json                  # Dependencies and scripts
├── public/                       # Static frontend files
│   ├── Employees/                # Employee profile page
│   ├── Evaluation form/          # Evaluation form page
│   ├── Login/                    # Login page
│   ├── Patients/                 # Patient profile page
│   ├── admin/                    # Admin dashboard
│   ├── admin-messages/           # Admin messages page
│   ├── admin-profile/            # Admin profile page
│   ├── communication/            # Contact/communication page
│   ├── forgot-password/          # Forgot password page
│   ├── home/                     # Home page
│   ├── home2/                    # Home page variant 2
│   ├── home3/                    # Home page variant 3
│   ├── page1/                    # Landing page 1
│   ├── page2/                    # Landing page 2
│   ├── page3/                    # Landing page 3
│   ├── page4/                    # Landing page 4
│   ├── policies/                 # Policies page
│   ├── reset-password/           # Reset password page
│   └── signup/                   # Signup page
├── routes/                       # API route handlers
│   ├── admin.js                  # Admin-only routes
│   ├── auth.js                   # Login, signup, password recovery
│   ├── checkSession.js           # Check active session
│   ├── communication.js          # Contact messages
│   ├── employeeProfile.js        # Employee profile CRUD
│   ├── evaluation.js             # Evaluation form submission
│   ├── patientHome.js            # Patient session check
│   ├── policies.js               # Policies CRUD
│   ├── profile.js                # Patient profile CRUD
│   ├── publicData.js             # Public policies and services
│   └── userInfo.js               # Get current user info
└── utils/
    └── emailService.js           # Email sending helper
```

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_db_password
DB_NAME=hospital_websites
PORT=3000
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

> **Note:** For Gmail, use an **App Password** instead of your regular account password.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Alkabkabi1/hospital_backend.git
cd hospital_backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a MySQL database and import the required schema.

4. Create a `.env` file and update the database credentials.

5. Start the server:

```bash
npm start
```

The server will run on `http://localhost:3000` by default.

## Entry Points

This project contains two Express server entry points:

- **`index.js`** — Main entry point configured with `cors`, `body-parser`, and `process.env.PORT`. Uses `npm start` by default.
- **`server.js`** — Alternative entry point that listens on port `8080` and has a slightly different route configuration. Use it if needed for a different environment or port.

To run `server.js` directly:

```bash
node server.js
```

## Database Schema

The system expects the following tables (at minimum):

- `users` — `id`, `name`, `email`, `password`, `phone`, `role`
- `patients` — `id`, `user_id`, `name`, `email`, `phone`, `birth_date`, `blood_type`, `address`, `mrn`, `national_id`, `marital_status`, `created_at`
- `employees` — `id`, `user_id`, `name`, `email`, `position`, `department`, `photo_url`, `join_date`, `employee_number`
- `policies` — `id`, `title`, `content`, `description`, `category`, `icon`, `pdf_link`, `qr_link`, `effective_date`, `created_at`
- `staff_services` — `id`, `title`, `description`, `link`, `created_at`
- `patient_services` — `id`, `title`, `description`, `link`, `created_at`
- `contact_messages` — `id`, `name`, `email`, `message`, `created_at`
- `evaluation_form` — `id`, `stress_level`, `mental_health_impact`, `stress_comment`, `policy_confidentiality`, `policy_no_personal_use`, `policy_official_use`, `policy_respect`, `policy_report`, `created_at`

## API Endpoints

### Authentication — `/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/login` | Login with email and password |
| POST | `/api/signup` | Register a new user (patient or employee) |
| POST | `/api/send-recovery` | Send password recovery code via email |
| POST | `/api/verify-code` | Verify recovery code |
| POST | `/api/reset-password` | Reset user password |
| GET | `/api/check-session` | Check if a user session is active |

### Patient Profile — `/api/profile`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/profile` | Get current patient profile |
| POST | `/api/profile` | Update current patient profile |

### Employee Profile — `/api/employeeProfile`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employeeProfile` | Get current employee profile |
| PUT | `/api/employeeProfile` | Update current employee profile |

### User Info — `/api/user-info` or `/api/session`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user-info` | Return current logged-in user info |

### Patient Home — `/api/patient-home`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/patient-home/check-session` | Verify patient role session |

### Public Data — `/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/policies` | Get all public policies |
| GET | `/api/services` | Get services based on user role |

### Admin — `/api/admin`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/policies` | Add a new policy (admin only) |
| POST | `/api/admin/services?type=staff` | Add a staff service (admin only) |
| POST | `/api/admin/services?type=visitor` | Add a patient service (admin only) |
| GET | `/api/admin/messages` | Get all contact messages (admin only) |

### Communication — `/api/communication`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/communication/send-message` | Submit a contact message |
| GET | `/api/communication/messages` | Get all messages (admin only) |

### Evaluation — `/api/evaluation`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/evaluation` | Submit an evaluation form |

## User Roles

The system supports the following roles stored in the `users` table:

- `admin` — System administrator
- `staff` / `employee` — Hospital staff
- `visitor` / `patient` — Patient or visitor

## Notes

- The `employeeHome` route is imported in `index.js` but its file is currently missing from the `routes/` folder. You may need to create it if employee-home features are required.
- Passwords are stored in plain text in the current implementation. It is recommended to hash passwords using `bcrypt` for production use.
- Session secrets are hardcoded in `index.js` and `server.js`. Move them to environment variables for production.
- The recovery code is stored in memory (`global.recoveryCodes`), which will be lost on server restart. Consider using Redis or a database table for production.

## License

This project is for educational/demo purposes and is not licensed for production use without proper security enhancements.
