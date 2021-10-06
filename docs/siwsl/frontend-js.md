# Frontend JS

For Frontend JS (as opposed to Backend Node.js) you can use the **Implicit Flow** to log user in.

We recommend using [SimpleLogin JS SDK](https://github.com/simple-login/sdk.js), which is actually a thin layer over [hello.js](https://github.com/MrSwitch/hello.js). For this reason, you can also use `hello.js` if you app already uses this library.

For the web, there are 2 ways to use SimpleLogin in terms of user experience:

- With popup: when clicking on **Sign in with SimpleLogin** a new window popup is opened and closed once user approves.

{{< figure src="./images/popup.png" caption="With Popup" >}}

- Without popup: in the same window/tab user is redirected to SimpleLogin authorization page and returns back to your app once they approves.

We recommend the **with popup** way so you don't have to deal with state saving when browser reloads in **without popup**.

By default, the **SimpleLogin JS SDK** uses the **with popup** way.

Please find below different ways to add SimpleLogin into your webapp:

- [SimpleLogin JS SDK](https://github.com/simple-login/sdk.js)
- [oidc-client](https://github.com/IdentityModel/oidc-client-js)

## SimpleLogin JS SDK

First include it in your html:

```html
<script src="https://simplelogin.io/sdk/sdk.js"></script>
```

In your `js`, you need to init the SDK with your SimpleLogin AppID:

```js
SL.init("{your SimpleLogin AppID}");
```

To open the login popup, use `SL.login()` which takes a callback as parameter: the callback will receive user info when they approves on SimpleLogin authorization page.

```js
SL.login(function(user) {
    console.log("got user from SL SDK", user);
})
```

The `SL.login` is typically called inside a function onclick:

```js
document.getElementById("btn-simplelogin").onclick = function(e) {
  SL.login(function(user) {
      console.log(user)
  })
}
```


## OIDC Client

[oidc-client](https://github.com/IdentityModel/oidc-client-js) adds OpenID Connect (OIDC) and OAuth2 protocol support for browser-based JavaScript applications.

This library is behind [redux-oidc](https://github.com/maxmantz/redux-oidc) for ReactJS / Redux, [vuejsoidcclient](https://github.com/joaojosefilho/vuejsOidcClient) for Vue.js, [Angular2OidcClient](https://github.com/jmurphzyo/Angular2OidcClient) for Angular, so if you use these web libraries, adding SimpleLogin should be a matter of changing `authority` setting to https://app.simplelogin.io/.

`oidc-client` is quite a _low-level_ library and offers a lot of flexibility. It separates the login step and the callback step.

Let's start by creating a `index.html`:

```html
<button onclick="startSignin()">start signin</button>
<button onclick="endSignin()">end signin</button>

<script src="https://cdn.jsdelivr.net/gh/IdentityModel/oidc-client-js@1.8/dist/oidc-client.min.js"></script>
```

And add the `js` code, make sure to replace `{your SimpleLogin AppId}` by your AppID.

```js
var settings = {
    // oidc-client will discover all OIDC settings automatically,
    // via https://app.simplelogin.io/.well-known/openid-configuration
    authority: "https://app.simplelogin.io/",
    client_id: "{your SimpleLogin AppId}",
    response_type: 'id_token token',
    // openid in scope to indicate this is OpenID Connect
    scope: 'openid',
    // You need to update this redirect_uri when deploying to production
    redirect_uri: "http://localhost:8000",
}
var mgr = new Oidc.UserManager(settings);

function startSignin() {
    mgr.signinRedirect({state:"some data"}).then(function() {
        console.log("signinRedirect done");
    });
}

function endSignin() {
    mgr.signinRedirectCallback().then(function(user) {
        console.log("signed in", user);
    });
}
```

Now if you run the a local web server (using `python3 -m http.server` for example), you should be able to sign in with SimpleLogin when you open http://localhost:8000















