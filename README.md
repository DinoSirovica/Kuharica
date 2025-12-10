# Kuharica
Kuharica web app for PIOS &amp; OORP

## Installation

Clone the repository:
```bash
git clone https://github.com/DinoSirovica/Kuharica.git
cd Kuharica
```

## Install server dependencies:
Navigate to the backend directory and install the required packages.

```bash
cd backend
npm install
```

## Install client dependencies:
Navigate to the frontend directory and install the required packages.
```bash
cd ../frontend
npm install
```

## Database Setup

Create a new database in MySQL:

```sql
CREATE DATABASE kuharica;
```

### Import the schema into your MySQL database (WILL BE ADDED LATER):
```bash
mysql -u your_db_user -p kuharica < schema.sql
```

## Project Structure
```php
Kuharica/
├── backend/               # Node.js + Express back-end
│   ├── src/               # Source files
│   ├── package.json       # Server dependencies
│   └── .env               # Environment variables
├── frontend/              # Angular front-end
│   └── package.json       # Client dependencies
├── .gitignore             # Git ignore file
└── README.md              # This README file
```
## Running the Application
### Start MySQL database
```bash
net start MySQL80 # Use "net stop MySQL80" to stop the sql process
```

### Start the Server
Navigate to the backend directory:
```bash
cd backend
```

Go to `config.js` file in the backend directory and add your database configuration. After you do this, it should look like something like this:
```js
module.exports = {
    port: 8081,
    pool: {
      connectionLimit: 100,
      host: 'localhost',
      user: 'your_db_user', //default for mysql: root
      password: 'your_db_password', //default for mysql: root
      database: 'kuharica', 
      debug: false
    },
};
```

Run the server
```bash
npm start
```
### Start the Client

Open a new terminal window and navigate to the frontend directory:

```bash
cd frontend
ng serve
```

Open your browser and navigate to http://localhost:4200. 

### Quick: Enable Google Sign-in (simple)
1. Create OAuth credentials
   - Go to Google Cloud Console → APIs & Services → Credentials.
   - Create an OAuth 2.0 Client ID (Web application).
   - Add Authorized JavaScript origin: http://localhost:4200
   - Copy the Client ID (xxxxx.apps.googleusercontent.com).

2. Frontend
   - Open frontend/src/app/login/login.component.ts and replace the googleClientId value with your Client ID.
   - The Google Identity script is already included in frontend/src/index.html.

3. Backend
   - In backend, create a .env file (or copy backend/.env.example) and set:
     GOOGLE_CLIENT_ID=your-client-id
     GOOGLE_CLIENT_SECRET=your-client-secret
   - backend/server.js already loads dotenv; restart the backend after creating .env.

4. Start and test
   - Start backend (cd backend && npm start) and frontend (cd frontend && ng serve).
   - Open http://localhost:4200 → Login page; the Google button should appear.
