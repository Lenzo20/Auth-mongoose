import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/list").then(() => {
    console.log("MongoDb conectado")
}).catch((err) => {
    console.log("Erro ao conectar com o BD ", err);
})

export = mongoose;