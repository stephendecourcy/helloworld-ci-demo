var page = require('webpage').create();

page.onConsoleMessage = function (msg) { console.log(msg); };

page.open('http://127.0.0.1:8000/', function (s) {
  if (s !== 'success') return fatal("Failed to load page!");

  // Click our 'Execute cloud action call'
  page.evaluate(function(){
    var btn = document.getElementById('run_button');      
    btn.click();
    return btn;
  });

  // Give the request a chance to complete..
  setTimeout(function(){

    // Get our 'cloudConfig' div which should now have the server resposne
    var cloudCfg = page.evaluate(function(){
      var cfg = document.getElementById('cloudConfig');
      return cfg.innerText;
    });

    // Simple test.. 
    if (cloudCfg.indexOf("Our Initial value") === -1) return fatal("Unexpected value for cloudConfig: " + cloudCfg);

    console.log("Test complete..");
    phantom.exit();
  }, 1000); 
    
});

function fatal(msg) {
  console.error(msg);
  phantom.exit();
}
