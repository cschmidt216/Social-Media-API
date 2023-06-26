const router = require("express").Router();
const usersRoutes = require("./users_routes");
const thoughtsRoutes = require("./thoughts_routes");

router.use("/users", usersRoutes);
router.use("/thoughts", thoughtsRoutes);

router.use((req, res) => {
    return res.send("Wrong route!");
  });  

module.exports = router;