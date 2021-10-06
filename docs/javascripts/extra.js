// Analytics

(function () {
    // only enable on prod
    let host = window.location.host;
    const sl_hosts = ["simplelogin.io", "www.simplelogin.io", "simplelogin.fr",
      "www.simplelogin.fr", "simplelogin.co", "www.simplelogin.co"];
  
    if (!sl_hosts.includes(host)) {
      console.log("Analytics is only be enabled in prod");
      return;
    }
  
    if (store.get('analytics-ignore') === 't') {
      console.log("Analytics is disabled");
      return;
    }
  
    console.log("init Analytics");
  
    // Plausible
    // <script async defer data-domain="simplelogin.io" src="https://plausible.simplelogin.io/js/index.js"></script>
    var plausibleScript = document.createElement('script');
    plausibleScript.defer = 1;
    plausibleScript.async = 1;
    plausibleScript.dataset.domain = "simplelogin.io";
    plausibleScript.src = 'https://plausible.simplelogin.io/js/index.js';
  
    var ins = document.getElementsByTagName('script')[0];
    ins.parentNode.insertBefore(plausibleScript, ins)
  
  
  })();
  
  // END Analytics
  