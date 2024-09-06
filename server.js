/*
Inside server.js, create the Express server:

it should listen on the port set by the environment variable PORT or by default 5000
it should load all routes from the file routes/index.js
*/

import express from 'express';
import routes from './routes';

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(routes);

app.listen(port, () => console.log(`Server running on ${port}`));

export default app;