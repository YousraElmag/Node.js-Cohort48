import express from 'express';
// TODO Use below import statement for importing middlewares from users.js for your routes
// TODO import { ....... } from "./users.js";
import bodyParser from 'body-parser';
let app = express();
app.use(bodyParser.json());
app.use(express.json());
// TODO: Create routes here, e.g. app.post("/register", .......)
import { login, profile, register ,logout} from './users.js';
// Serve the front-end application from the `client` folder
app.use(express.static('client'));
app.post('/register', register)
app.post('/login',login)
app.get('/profile',profile)
app.post('/logout',logout)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
});
