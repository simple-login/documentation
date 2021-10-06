# Code Flow - the raw way

If you don't use (or don't want to use a library that supports OAuth/OpenID Connect), you totally can! The protocol is actually quite simple from the app's point of view. (the spec is hundreds pages for provider though ...)

This section will explain how to implement the `Code Flow` in your back-end along with some info to watch out for.

To implement the `Code Flow` please make sure you have:

- read through the [Introduction](../intro) to have a rough idea on what is the `Code Flow` and
- followed the [App](../app) to have the SimpleLogin AppId and AppSecret.

As recommended in the [The Twelve Factors](https://12factor.net), let's export these values into env variables:

```bash
export CLIENT_ID={your_app_id}
export CLIENT_SECRET={your_app_secret}
```

The way to read these env variables in the code differs from language to language, a quick google `read env var {your language}` should return some results.

To implement the `Code Flow`, you would need 2 endpoints:

1. Login endpoint: that redirects user to SimpleLogin authorization page
2. Callback endpoint: user is redirected back to this page along with a `code` that allows you to exchange for an `access token` which in turn can be used to obtain `user info`.

Let's jump into each endpoint.

## Login endpoint

This endpoint handles user clicking on **Sign in with SimpleLogin** button (e.g. `<a href="https://your-app/login">Sign in with SimpleLogin</a>`) and redirects user to a **formatted** SimpleLogin url. This url has the following format. Line breaks are added for visibility, please remove them in your code.

```text
https://app.simplelogin.io/oauth2/authorize
    ?response_type=code
    &client_id=CLIENT_ID
    &redirect_uri=REDIRECT_URI
    &scope=profile
    &state=STATE
```

Let's split this long url down to components:

- `response_type=code`: indicates the flow. Its value is `code` for `code flow` and `token` for `implicit flow`. In our case, it's always `code`.
- `client_id=CLIENT_ID`: `CLIENT_ID` is your SimpleLogin AppID. In OAuth terminology, `client` is actually your app.
- `redirect_uri=REDIRECT_URI`: upon user approval, user will be redirected to this url. This should be the url of your callback endpoint that we are going to create in the next step. If your app is https://my-app.com on production and http://localhost:8000 locally, this url would probably be https://my-app.com/callback when you deploy your app on production. Please make sure to add this redirect url on your SimpleLogin Developer page. (see [App](../app))
- `scope=profile`: the user information you want. SimpleLogin supports only `profile` scope which contains user email, name and avatar.
- `state=STATE`: this `STATE` value should be generated **randomly** to avoid CSRF attack. This value will be checked in the callback endpoint and one standard way is to save this value into the cookie that you can retrieve later in the callback endpoint.

## Callback endpoint

Upon user approval, they will be redirected to this below url. Line breaks are also added here for visibility only, please remove them in your code.

```text
REDIRECT_URI
    ?code=CODE
    &state=STATE
```

Let's break the components down:

- `REDIRECT_URI` the same `REDIRECT_URI` in the login endpoint
- `STATE`: the state generated in the login endpoint. It's your app's responsibility to compare this `STATE` to the one generated in previous step, typically by retrieving it from the cookie.
- `CODE`: used to exchange for the `access token` in a POST request to SimpleLogin:

```bash
curl -X POST https://app.simplelogin.io/oauth2/token \
    -F 'grant_type=authorization_code' \
    -F 'code=CODE' \
    -F 'redirect_uri=REDIRECT_URI' \
    -F 'client_id=CLIENT_ID' \
    -F 'client_secret=CLIENT_SECRET'
```

`REDIRECT_URI` is sent once again. The `CLIENT_ID` and `CLIENT_SECRET` are retrieved from env variable.


SimpleLogin will return this response if everything is correct:

```json
{
    "access_token": "LONG_STRING",
    "expires_in": 3600,
    "scope": "profile",
    "token_type": "Bearer",
    "user": {
        "avatar_url": "https://avatar.png",
        "client": "YOUR_APP_NAME",
        "email": "EMAIL@simplelogin.co",
        "email_verified": true,
        "id": 36,
        "name": "FIRST LAST",
        "sub": "36"
    }
}
```

With this user info, you should now either be logged in or have access to some reserved information.

Congratulations, you just implemented a OAuth client!


