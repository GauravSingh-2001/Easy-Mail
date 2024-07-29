import express from 'express';
import connectToMongo from './db.js';
import cors from 'cors' 
import mailRoutes from './Routes/Sendmail.js';
import emailRoutes from './Routes/EmailRoutes.js';
import savedEmailRoutes from './Routes/SavingEmail.js';

const app = express();
const port = 5000; 
connectToMongo();

app.use(cors());
app.use(express.json());

app.use('/api',mailRoutes);
app.use('/api',emailRoutes);
app.use('/api',savedEmailRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
