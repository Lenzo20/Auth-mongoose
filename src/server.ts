import app from "./app";

const port = process.env.PORT || 3000;

app.listen(8080, () => {
  console.log("Server in linstenin in port ", port);
})
