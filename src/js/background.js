import "crx-hotreload";

chrome.action.onClicked.addListener(function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { greeting: "hello" }, function(response) {
      // console.log(response.farewell);
    });
  });
});

// chrome.action.onClicked.addListener((tab) => {
//   chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       files: ['js/content.js']
//   });
// });