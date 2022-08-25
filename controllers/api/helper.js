exports.loggedIn = (req, res, next) => {
  const user_id = req.session.user_id;
  console.log("REQ PATH");
  console.log(req.path);

  const route_destination = req.path;

  switch (route_destination) {
    case "/register":
      if (user_id) {
        return res.render("homepage");
      }
      break;
    case "/login":
      if (!user_id) {
        //if user is not logged in, they should be redirected to the register page
        return res.render("register");
      }
      break;
    case "/dashboard":
      console.log("testing if user is logged in");
      if (!user_id) {
        console.log("passing to register");
        return res.render("homepage");
      }

      break;
    case "/sign_out":
      if (!user_id) {
        return res.render("homepage");
      }
      break;
    case "/homepage":
      break;
  }
  next();
};
