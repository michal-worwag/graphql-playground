const express = require("express");

const app = express();

app.listen(4000, () => {
  console.log("now listenig for requests on port 4000");
});
