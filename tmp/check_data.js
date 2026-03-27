import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../backend/.env') });

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('MONGO_URI not found in .env');
    process.exit(1);
}

// Models (Copied minimal versions)
const Staff = mongoose.model('Staff', new mongoose.Schema({}, { strict: false }));
const Attendance = mongoose.model('Attendance', new mongoose.Schema({}, { strict: false }));

async function check() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('--- Connected to MongoDB ---');

        const staff = await Staff.find({});
        console.log('\n--- Staff List ---');
        staff.forEach(s => {
            console.log(`ID: ${s.id}, Name: ${s.name}, Salary: ${s.salary}`);
        });

        const attendance = await Attendance.find({});
        console.log('\n--- Attendance Records (Recent 5) ---');
        attendance.slice(-5).forEach(a => {
            console.log(`Date: ${a.id}, Record count: ${Object.keys(a.records || {}).length}`);
            // console.log(JSON.stringify(a.records, null, 2));
        });

        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
}

check();
