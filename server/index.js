import authRoutes from './routes/auth.routes.js';
import foodDonationRoutes from './routes/fooddonation.routes.js';
import allFoodRoutes from './routes/allfood.routes.js';
import userRoutes from './routes/user.routes.js';
import particularUserData from './routes/particularuserdata.routes.js'
import deletefooditem from './routes/deletefood.routes.js'
import applyFoodRoute from "./routes/applyfood.routes.js";
import bodyParser from 'body-parser';
import connectDB from './config/mongo.js';
import cors from 'cors';

import express from 'express';
const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/', authRoutes);
app.use('/', foodDonationRoutes);
app.use('/', allFoodRoutes);
app.use('/', userRoutes);
app.use('/',particularUserData);
app.use('/',deletefooditem);
app.use("/", applyFoodRoute);
connectDB();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});