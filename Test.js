const express=require('express');
const app =express();
const port =process.env.port||45000;
app.listen(port);
let connection=sql.createConnection({
    user:'root',
      password:'',
      database:'Test',
      server:'localhost'
  });
  connection.connect((err)=>{
    if(err) throw err;
    else console.log('db is connected.....');
  })