const indexR = require("./index");
const usersR = require("./users");
const projectsR = require("./projects");
const missionsR = require("./missions");

exports.routesInit = (app) => {
  // Mount the indexR middleware at the root ("/") path
  app.use("/", indexR);

  // Mount the usersR middleware at the "/users" path
  app.use("/users", usersR);

  // Mount the projectsR middleware at the "/projects" path
  app.use("/projects", projectsR);

  // Mount the missionsR middleware at the "/missions" path
  app.use("/missions", missionsR);
}
