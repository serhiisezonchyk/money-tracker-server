import dotenv from 'dotenv';
import express, { urlencoded } from 'express';
import cors from 'cors';
import router from './routes/index.js';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use('/api', router);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server was started on port ${PORT}`);
});
