import path from "path";
import { Database } from "sqlite3";
import sqlite3 from 'sqlite3';
const sqlite = sqlite3.verbose();

const dbPath = path.resolve(__dirname, '../../database/app.db')
const  db = new sqlite3.Database(dbPath, (err) => {
    if(err){
        console.error('Database connection failed:', err.message);
    }
    else{
        console.log('Connected to SGLite database');
    }
});
export default db;