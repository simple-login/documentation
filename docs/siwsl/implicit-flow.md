# Implicit Flow - the raw way

If you don't use (or don't want to use a library that supports OAuth/OpenID Connect), it's OK! The protocol is actually quite simple as you will see shortly below.

This section will explain how to implement the `Implicit Flow` in your front-end using Vanilla JS.

Please make sure you have:

- read through the [Introduction](../intro) to have a rough idea on what is the `Implicit Flow` and
- followed the [App](../app) to have the SimpleLogin `AppId`. You don't need the `AppSecret` in this flow.

To implement the `Implicit Flow`, you would need 2 parts in your app:

1. Login part: that redirects user to SimpleLogin authorization page
2. Callback part: user is redirected back to your app along with an `access token` which can be used to obtain `user info`.

Let's jump into each part.

## Login part

This part handles user clicking on **Sign in with SimpleLogin** button (e.g. `<button>Login with SimpleLogin</button>`) and redirects user to a **formatted** SimpleLogin url. This url has the following format. Line breaks are added for visibility, please remove them in your code.

```text
https://app.simplelogin.io/oauth2/authorize
    ?response_type=token
    &client_id=CLIENT_ID
    &redirect_uri=REDIRECT_URI
    &scope=profile
    &state=STATE
```

Let's take a closer look at this long url:

- `response_type=token`: indicates the flow. Its value is `token` for `implicit flow` and `code` for `code flow`. In our case, it's always `token`.
- `client_id=CLIENT_ID`: `CLIENT_ID` is your SimpleLogin AppID. In OAuth terminology, `client` is actually your app.
- `redirect_uri=REDIRECT_URI`: upon user approval, user will be redirected to this url. This is usually the same as your app url. By default SimpleLogin whitelists `localhost` so you don't need to do anything for local development. Please see [App](../app) for more information.
- `scope=profile`: SimpleLogin supports only `profile` scope which contains user email, name and avatar.
- `state=STATE`: this `STATE` value should be generated **randomly** to avoid CSRF attack. This value will be checked in the callback endpoint and one standard way is to save this value into the `sessionStorage` that you can retrieve later in the callback endpoint.

## Callback part

Upon user approval, they will be redirected to this url below. Line breaks are also added here for visibility only, please remove them in your code.

```text
REDIRECT_URI
    #state=STATE
    &scope=profile
    &access_token=ACCESS_TOKEN
```

Let's break the components down:

- `REDIRECT_URI` the same `REDIRECT_URI` in the previous step
- `STATE`: the state generated in the previous step. It's your app's responsibility to compare this `STATE` to the one generated in previous step, typically by retrieving it from the `sessionStorage`.
- `ACCESS_TOKEN`: used to get user info in a POST request to SimpleLogin. You might also notice that `#` is used instead of `?`; this is to avoid the `access token` hitting your back-end (if there's any) in the `implicit flow`.

Here's the code snippet using `fetch` to get user info with the obtained `access token`:

```js
fetch("https://app.simplelogin.io/oauth2/user_info", {
    method: 'GET',
    headers: {
        'AUTHORIZATION': `Bearer ${ACCESS_TOKEN}`
    }
}).then(response => response.json()).then(userInfo => {
    console.log(userInfo);
    alert(`Welcome ${userInfo.name}`);
})

```

SimpleLogin will return this response if everything is correct:

```json
{
    "avatar_url": "https://avatar.png",
    "client": "{Your App Name}",
    "email": "EMAIL@simplelogin.co",
    "email_verified": true,
    "id": 36,
    "name": "FIRST LAST",
    "sub": "36"
}
```

With this user info, you should now either be logged in or have access to some reserved information.

Congratulations, you just implemented the OAuth Implicit Flow!

## Code example

Please find below a full code example for this section. Please make sure to replace `YOUR_APP_ID` by your SimpleLogin AppID and serve the code on port 8000 (or just replace `http://localhost:8000` by your local url). This can be done by saving this code into a `index.html` file and serve the file with Python `http` module:

> python3 -m http.server

or by NodeJS `static-server` tool, can be installed via `npm -g install static-server`

> static-server -p 8000

```html
<button onclick="simpleLogin()">Sign in with SimpleLogin</button>

<script>
    function simpleLogin() {
        let appId = "YOUR_APP_ID";
        let state  = randomString();

        // save state into sessionStorage to check later in the callback
        sessionStorage.setItem("state", state);

        let url = "https://app.simplelogin.io/oauth2/authorize" +
            "?response_type=token" +
            `&client_id=${appId}` +
            "&redirect_uri=http://localhost:8000" +
            "&scope=profile" +
            `&state=${state}`

        // redirect user to SimpleLogin
        location.href = url;
    }

    // if accessToken is found, then it's the callback
    let accessToken = getQueryParam("access_token");

    if (accessToken) {
        // Check if state has changed
        state = getQueryParam("state");

        if (state != sessionStorage.getItem("state")){
            // CSRF attack
            alert("nice try! Or you need to enable sessionStorage ...");
        }

        // get user info
        fetch("https://app.simplelogin.io/oauth2/user_info", {
            method: 'GET',
            headers: {
                'AUTHORIZATION': `Bearer ${accessToken}`
            }
        }).then(response => response.json()).then(userInfo => {
            console.log(userInfo);
            alert(`Welcome ${userInfo.name}`);
        })
    }

    // utility function to get query value from url
    function getQueryParam(key) {
        var half = location.href.split(key + '=')[1];
        return half !== undefined ? decodeURIComponent(half.split('&')[0]) : null;
    }

    // generate a 15-char string
    function randomString(){
        return Math.random().toString(36).slice(-15);
    }

</script>
```

## Popup or not popup

You might notice that when clicking on **Login with Facebook/Google** button, a new (small) window is opened instead of user leaving your app. This has the advantage of user still staying on your app and therefore you don't need to worry about saving user data before redirecting them to another page.

This can be done quite easily using SimpleLogin SDK JS (see [Frontend-JS](../frontend-js)) or using libraries such as [hello.js](https://github.com/MrSwitch/hello.js) or [oidc-client](https://github.com/IdentityModel/oidc-client-js). You can also implement this mechanism yourself using the [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) method. How to implement this is out of scope of this page as it requires some advanced technics but basically that's how it works:

- When user clicks on **Sign in with SimpleLogin**, you open a new window using the [window.open](https://developer.mozilla.org/en-US/docs/Web/API/Window/open) method. You can use the current page as target but usually people use an empty page, let's say `redirect.html` to speed up the load time:

```js
const authWindow = window.open(
        "/redirect.html",'SimpleLoginPopup',
        {}
);
```

On this `redirect.html`, we have the 2 steps login and callback implemented like in the previous section. The only thing that changes is `access token` or `user information` will be sent to the `opener` page, which is your app via `window.opener.postMessage`:

```js
window.opener.postMessage(
  { auth: { token: access_token } },
  window.opener.location
);
```

On your app, you need to setup a event listener that handle this message

```js
window.addEventListener('onmessage', e => {
    if (e.data.auth) {
        // Get user info with the access_token
    }
})
```

Please take a look at this [gist](https://gist.github.com/gauravtiwari/2ae9f44aee281c759fe5a66d5c2721a2) that contains some snippets that can be used to handle data exchange between your app (the main window) and the popup.
