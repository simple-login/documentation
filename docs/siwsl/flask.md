# Flask

For Flask applications, we recommend [Requests-OAuthlib](https://github.com/requests/requests-oauthlib), a library to integrate OAuth providers. This library is also used by [social-app-django](https://github.com/python-social-auth/social-app-django) to add social login buttons to Django apps

The code example is on https://github.com/simple-login/flask-example.

## Preparation
First please install `Requests-OAuthlib`:

```bash
pip3 install requests_oauthlib
```

Then please store your SimpleLogin **AppID** and **AppSecret** somewhere, preferably in `env` variable as recommended in the [The Twelve Factors](https://12factor.net).

```bash
export CLIENT_ID={your_app_id}
export CLIENT_SECRET={your_app_secret}
```

Bootstrap the app

```python
import requests_oauthlib, os, flask

# Get SimpleLogin AppID, AppSecret from env vars
CLIENT_ID = os.environ.get("CLIENT_ID")
CLIENT_SECRET = os.environ.get("CLIENT_SECRET")

app = flask.Flask("my-app")
app.secret_key = "my-super-secret"  # for flask.session

# This allows us to test the app using HTTP.
# Please make sure to disable it in production
os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"
```

## Login endpoint

When user clicks on **Sign in with SimpleLogin**, user gets redirected to the SimpleLogin authorization page. This is done using the `/login` endpoint. The `state` is necessary to defend against [CSRF attack](https://www.shellvoide.com/hacks/cross-site-request-forgery-attack-on-oauth2-protocol/).

```python
import requests_oauthlib, os, flask

@app.route("/login")
def login():
    sl = requests_oauthlib.OAuth2Session(
        CLIENT_ID,
        # this supposes you are running your app on the default port 5000
        redirect_uri="http://localhost:5000/callback",
    )

    redirect_url, state = sl.authorization_url(
        "https://app.simplelogin.io/oauth2/authorize"
    )

    # State is used to prevent CSRF, keep this for later.
    flask.session["oauth_state"] = state

    return flask.redirect(redirect_url)
```

## Callback endpoint

When user approves sharing data with your app, they get redirected back to the `redirect_uri` in the previous step. This route is handled by an endpoint that receives the `code` and exchanges for `access token`. The `access token` is then used to exchange for user info:

```python
@app.route("/callback")
def callback():
    sl = requests_oauthlib.OAuth2Session(
        CLIENT_ID, state=flask.session.get("oauth_state")
    )
    # Get the "access token"
    sl.fetch_token(
        "https://app.simplelogin.io/oauth2/token",
        client_secret=CLIENT_SECRET,
        authorization_response=flask.request.url,
    )

    user_info = sl.get("https://app.simplelogin.io/oauth2/userinfo").json()

    # This is where you log user in,
    # for ex via flask-login extension: login_user(user)
    return f"""
    Welcome {user_info["name"]} <br>
    Your email is {user_info["email"]} <br>
    And your avatar: <img src="{user_info['avatar_url']}">
    """
```

## Run the App and enjoy!

Let's run the app

```bash
flask run
```

Now you should be able to SLWSL at http://localhost:5000/login

