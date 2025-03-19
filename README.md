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
