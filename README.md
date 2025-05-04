# Report System

## Project Description

A simple time reporting system for employees.  
Employees can submit daily clock-in and clock-out hours.  
Managers can view and approve reports after both clock-in and clock-out times are provided.

There is a clear hierarchy between managers and their direct employees.

## Technologies Used

- **Client**: Nuxt 3, TypeScript, Vuetify
- **Server**: Node.js, Express, TypeScript
- **Database**: MongoDB Atlas

---

## Getting Started

### Requirements

- Node.js v18 or higher

### Setup Instructions

1. Clone the repository.
2. Open a terminal and navigate to each folder:
   - `client`
   - `server`
3. In each folder run:

```bash
npm install
npm run dev
```

4. Set up environment variables in the `server/.env` file:

```env
PORT=3001
MONGO_CONNECTION_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=node_env
```

---

## Users Structure

There are 10 users in the system.  
3 of them are **managers**, and 7 are **regular employees**.  
All users have the same password: `12345678`

### User Hierarchy

#### ron@gmail.com — Manager (top-level)
- No manager above him
- Direct employees:
  - david@gmail.com
  - shir@gmail.com

#### david@gmail.com — Manager
- Reports to: ron@gmail.com
- Direct employees:
  - oren@gmail.com
  - nadav@gmail.com
  - shimon@gmail.com
  - sara@gmail.com

#### shir@gmail.com — Manager
- Reports to: ron@gmail.com
- Direct employees:
  - dvir@gmail.com
  - eva@gmail.com
  - ronit@gmail.com

---

## Assumptions

- Registration is not implemented. Users are predefined or manually managed in the database.
- If an employee has not submitted a report for a given date, they can first submit a clock-in time and later a clock-out time.
- If a report already exists, both times can be updated until the manager approves it.
- Managers only see complete reports (both clock-in and clock-out submitted).

---

Feel free to use and modify this project.