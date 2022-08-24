exports.loggedIn = (req, res, next) => {
    const user_id = req.session.user_id;
    console.log("REQ PATH");
    console.log(req.path);
  
    const route_destination = req.path;
  
    switch (route_destination) {
      case '/register':
        if (user_id) {
          return res.render('/homepage');
          // res.render('lobby', { layout: 'game_center.hbs' });
        }
        break;
      case '/login':
        if (!user_id) {
          return res.render('/homepage');
        }
        break;
      case '/dashboard':
        if (!user_id) {
          return res.render('/homepage');
        }
  
        break;
      case '/sign_out':
        if (!user_id) {
            return res.render('/homepage');
        }
        break;
     
    }
    next();
  }