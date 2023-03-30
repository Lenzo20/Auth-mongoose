import "express-async-errors";
import app from "./app";
import { errorMiddleware } from './middlewares/erros';


app.use(errorMiddleware)

const port = process.env.PORT || 3000;

app.listen(8080, () => {
  console.log("Server in linstenin in port ", port);
})
