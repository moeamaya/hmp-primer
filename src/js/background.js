// import "../img/icon-128.png";
// import "../img/icon-34.png";

chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { greeting: "hello" }, function(response) {
      // console.log(response.farewell);
    });
  });
});
