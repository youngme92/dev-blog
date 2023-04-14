const express = require('express');
const next = require('next');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const axios = require('axios');

app.prepare().then(() => {
    const server = express();
  
    server.get('/api/getSingleUser', async (req , res) => {
      // return app.render(req, res, '/custom', req.query);
      const id= Number(req.query.id);
      if (isNaN(id)) {
        throw new Error("id값이 number가 아닙니다.");
      }

      const listOfUsers = (
        await axios.get("https://jsonplaceholder.typicode.com/users")
      ).data;
      const singleUser = listOfUsers.filter((item) => item.id == id);

      return res.json(singleUser[0]);
    });
  
    server.get('*', (req, res) => {
      return handle(req, res);
    });
  
    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  });