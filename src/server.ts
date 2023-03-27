import app from "./app";

const port = process.env.PORT || 3000;
const test = process.env.TEST || "Hello here is test error";

app.listen(8080, () => {
    console.log("Server in linstenin in port ", test);
}) 