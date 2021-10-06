# Possible error codes

When some errors happen during the authorization flow, SimpleLogin redirects user back to `redirect_uri?error={error_code}` so your app can act accordingly. Some errors are often caught during development but some can come from the user. Please find below the complete list of errors:

- `deny`: probably the most frequent error. This happens when user denies sharing their info with your app. You can maybe in this case offer another sign-in mechanism to user, or if SimpleLogin is the only one, let user know that they need to accept sharing their data in order to use your app.

- `invalid_client_id`: this happens when the provided `client_id` is unknown or empty. It can happen when the `client_id` is not set correctly in the code. As a reminder, the authorization url has the following format:

```text
https://app.simplelogin.io/oauth2/authorize
        ?response_type=[code|token]
        &client_id=CLIENT_ID
        &redirect_uri=REDIRECT_URI
        &scope=profile
        &state=STATE
```

- `http_not_allowed`: by default, `http[s]://localhost:*` is whitelisted to facilitate development. However once the *Sign in with SimpleLogin* code hits the production, a correct `redirect_uri` needs to be set on developer page (cf [App](../app)). For security reason, `http` is not allowed so you must use `https` for the web. For mobile apps, a custom scheme (e.g. `com.my_company.my_app://`) is also allowed.

- `unknown_redirect_uri`: the `redirect_uri`, if other than `http[s]://localhost:*` needs to be set on developer page. Please see [App](../app).

