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

---

## Google Sign-In Setup

To enable Google OAuth authentication, follow these steps:

### 1. Create Google OAuth Credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client ID**
5. Select **Web application** as the application type
6. Configure the following:
   - **Name**: Kuharica (or any name you prefer)
   - **Authorized JavaScript origins**: 
     - `http://localhost:4200`
   - **Authorized redirect URIs**:
     - `http://localhost:4200` 
7. Click **Create** and copy the **Client ID** and **Client Secret**

### 2. Backend Configuration

Create a `.env` file in the `backend/` directory with your Google credentials:

```env
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
JWT_SECRET=your-jwt-secret-key
```

> **Note**: Never commit your `.env` file to version control. It's already included in `.gitignore`.

### 3. Frontend Configuration

Update the environment file at `frontend/src/environments/environment.ts`:

```typescript
export const environment = {
  googleClientId: 'your-google-client-id.apps.googleusercontent.com'
};
```

### 4. Database Migration

Run the following SQL to add Google authentication support to your database:

```sql
ALTER TABLE `korisnik`
    ADD COLUMN `google_id` VARCHAR(255) DEFAULT NULL,
    ADD UNIQUE KEY `google_id` (`google_id`);
```

---
