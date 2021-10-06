# Node.js - Passport

For Node.js application, we recommend [passport](https://github.com/jaredhanson/passport), an authentication middleware for Node.js. Passport supports a comprehensive set of **strategies** including username/password login and social login (Facebook, Twitter, etc).

For SimpleLogin, you can use either [OAuth strategy](https://github.com/jaredhanson/passport-oauth) or [OpenId Connect strategy](https://github.com/jaredhanson/passport-openidconnect). In this guide, we will use the **OpenId Connect Strategy**. The code along with a step-by-step guide is also available on https://github.com/simple-login/passportjs-example

## Preparation

First please install `passport`, `passport-openidconnect`, `express-session` (passport uses session to store its data)

```bash
npm install passport passport-openidconnect express-session --save
```

Then please store your SimpleLogin **AppID** and **AppSecret** somewhere, preferably in `env` variable as recommended in the [The Twelve Factors](https://12factor.net).

```bash
export CLIENT_ID={your_app_id}
export CLIENT_SECRET={your_app_secret}
```

Bootstrap the app:

```js
var express = require('express');

// For Passport
var session = require('express-session');
var passport = require('passport');
var OidcStrategy = require('passport-openidconnect').Strategy;

var app = express();

// passportjs use session to store user info
app.use(session({
  secret: 'my-super-secret',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, next) => {
  next(null, user);
});

passport.deserializeUser((obj, next) => {
  next(null, obj);
});
```

## Config SimpleLogin OIDC Provider

Let's tell passport SimpleLogin OIDC (OpenID Connect) setting:

```js
// config SimpleLogin OIDC (OpenID Connect) provider
passport.use('SimpleLogin', new OidcStrategy({
  // SimpleLogin OIDC Settings
  issuer: 'https://app.simplelogin.io',
  authorizationURL: 'https://app.simplelogin.io/oauth2/authorize',
  tokenURL: 'https://app.simplelogin.io/oauth2/token',
  userInfoURL: 'https://app.simplelogin.io/oauth2/userinfo',
  // SimpleLogin App Credential from env
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  // you might need to change the callbackURL when deploying on production
  callbackURL: 'http://localhost:3000/callback',
  // openid needs to be in scope
  scope: 'openid'
}, (issuer, sub, profile, accessToken, refreshToken, done) => {
  return done(null, profile);
}));
```

## Login endpoint

When user clicks on **Sign in with SimpleLogin**, user gets redirected to the SimpleLogin authorization page. This is done using the `/login` endpoint. The nice thing about passport and its OpenID Connect strategy is it also takes care of generating a random `state` in the redirection URL. The `state` is necessary to defend against [CSRF attack](https://www.shellvoide.com/hacks/cross-site-request-forgery-attack-on-oauth2-protocol/).

```js
// redirect user to authorization page
app.use('/login', passport.authenticate('SimpleLogin'));
```

## Callback endpoint

When user approves sharing data with your app, they get redirected back to the `redirect_uri` in the previous step. This route is handled by an endpoint that receives the `code` and exchanges for `access token`. The `access token` is then used to exchange for user info. Passport once again handles all these details nicely:

```js
// user is redirected back
app.use('/callback',
  passport.authenticate('SimpleLogin', {
    failureRedirect: '/error'
  }),
  (req, res) => {
    var user= req.user._json
    res.send(`
      Welcome ${user.name}! <br>
      Your email: ${user.email} <br>
      Avatar: <img src="${user.avatar_url}">
      `)
  }
);
```

## Run the App and enjoy!

let's finish by adding this to the end:

```js
app.listen(3000, () => console.log(`App listening`))
```

And run the app

```bash
node app.js
```

Now you should be able to sign in with SimpleLogin at http://localhost:3000/login



