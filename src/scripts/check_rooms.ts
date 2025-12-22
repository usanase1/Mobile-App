import db from '../config/database';

db.all('SELECT * FROM rooms', [], (err, rows) => {
    if (err) {
        console.error('Error fetching rooms:', err);
    } else {
        console.log('Rooms in DB:', rows);
    }
});
