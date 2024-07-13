
import bcrypt from 'bcryptjs' ;
import fs from 'fs'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid';

let users = {};


const dataFilePath = './data.json';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
          return res.status(401).json({ message: 'Unauthorized' });
      }
      req.user = user;
      next();
  });
};
if (fs.existsSync(dataFilePath)) {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    if (data) {
        users = JSON.parse(data);
    }
}
// register
 export const register= async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        
        if (users[username]) {
            return res.status(409).json({ message: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userId = uuidv4();
        users[username] = {
            id: userId,
            username: username,
            password: hashedPassword
        };
        fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2));
        res.status(201).json({ id: userId, username: username });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const SECRET_KEY = '123';
export const login = async (req, res) => {
  try {
      const { username, password } = req.body;

      if (!username || !password) {
          return res.status(400).json({ message: "Username and password are required" });
      }
      const user = users[username];
      if (!user) {
          return res.status(401).json({ message: "Invalid username or password" });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          return res.status(401).json({ message: "Invalid username or password" });
      }
      const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

      res.status(201).json({ token: token });

  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}

export const profile= (req, res) => {
  try {
  
      const user = users[req.user.username];
      if (!user) {
          return res.status(401).json({ message: 'Unauthorized' });
      }

   
      res.status(200).json({ username: user.username });

  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}
export const logout = (req, res) => {
  res.status(204).send();
};
 
      


