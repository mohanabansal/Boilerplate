const app = require("./server");
const { db } = require("./server");

const port = process.env.PORT || 3000;

//TODO-can sync db here
db.sync().then(function() {
  app.listen(port, function() {
    console.log(`server in now listening to http://localhost:${port}`);
  });
});
