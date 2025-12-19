import app from './app';
import { createUserTable } from './models/userModel';
import { createPostTable } from './models/postModel';

createUserTable();
createPostTable();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
