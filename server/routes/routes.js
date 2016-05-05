import renderIndex from './requestHandler';

//REQUIRE CONTROLLERS
//=================================
import userController from '../controllers/userController';
import moodController from '../controllers/moodController';
import quoteController from '../controllers/quoteController';
import wiki from '../API/wikiquotes';

//MODULE EXPORT
//=================================
export default (app, express, passport) => {

  //LOCAL ROUTES
  //=================================
  app.get('/', renderIndex);

  app.get('/signup', (req, res) => {
    res.render('signup', { message: req.flash('loginMessage') });
  });
  
  app.post('/signup', userController.saveOne);

  //DATABASE ROUTES
  //=================================
  app.post('/api/moods/saved', moodController.saveUserMood);
  app.get('/api/moods/saved', moodController.getAll);

  app.post('/api/quotes/saved', quoteController.saveUserQuote);
  app.get('/api/quotes/saved', quoteController.getAll);

  app.get('/login', (req, res) => {
    res.render('login', { message: req.flash('loginMessage') });
  });

  app.post('/login', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true //OPTIONAL
  }));


  // app.post('/signup', passport.authenticate('local-signup', {
  //   successRedirect: '/profile',
  //   failureRedirect: '/signup',
  //   failureFlash: true //OPTIONAL
  // }));


  // app.get('/profile', isLoggedIn, (req, res) => {
  //   res.render('profile', { user: req.user });
  // });

  app.get('/logout', (req, res) => {
    //LOG USER OUT AND DESTROY SESSION
    req.session.destroy((err) => {
      //REDIRECT USER TO HOME PAGE
      res.redirect('/');
    });
  });

  //CHECK IF LOGGED IN
  var isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    //REDIRECT
    res.redirect('/');
  };

  //FACEBOOK ROUTES
  //=================================
  app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

  app.get('/auth/facebook/callback', passport.authenticate('facebook', { 
      successRedirect: '/profile',
      failureRedirect: '/'
  }));

  //GOOGLE ROUTES
  //=================================
  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email' ] }));

  app.get('/auth/google/callback', passport.authenticate('google', { 
      successRedirect: '/profile',
      failureRedirect: '/'
  }));

  //WIKI ROUTES
  //=================================
    
  app.get('/wikiInfo', wiki.frontEndCall);
  
};
