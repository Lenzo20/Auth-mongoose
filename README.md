# Api de Login

- Uma pequena api de login com validação e token, validação para conseguir usar

### Use para iniciar o servidor

- yarn start

### Here we use the following languages and framework

- Typescript
- Nodejs
- Express
- Mongoose (Mongodb)
- JasonWebToken

### Router

router.get("/users", userControllers.find); <!-- view all registered users -->
router.post("/users", userControllers.find); <!-- register user -->
router.patch("/users", userControllers.find); <!-- uptade user -->
router.delete("/users", userControllers.find); <!-- delete user -->
router.post("/auth/users", userControllers.find); <!-- login user -->

router.get("/auth/users", userControllers.find);

- router to authenticate token, here you need to pass token as headers good format "Bearer token"

<!-- ex: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjFlM2RhYTdlMjE0NGViNWE4NjdiMSIsIm5hbWUiOiJMZW56byIsImlhdCI6MTY3OTk0MjYzNSwiZXhwIjoxNjc5OTcxNDM1fQ.WH5DOiH5wCSrOBPWYtQYrZuffGu9LdSMHyv4" -->
