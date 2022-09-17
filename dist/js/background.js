(() => {
  // node_modules/crx-hotreload/hot-reload.js
  var filesInDirectory = (dir) => new Promise(
    (resolve) => dir.createReader().readEntries(
      (entries) => Promise.all(entries.filter((e) => e.name[0] !== ".").map(
        (e) => e.isDirectory ? filesInDirectory(e) : new Promise((resolve2) => e.file(resolve2))
      )).then((files) => [].concat(...files)).then(resolve)
    )
  );
  var timestampForFilesInDirectory = (dir) => filesInDirectory(dir).then((files) => files.map((f) => f.name + f.lastModifiedDate).join());
  var watchChanges = (dir, lastTimestamp) => {
    timestampForFilesInDirectory(dir).then((timestamp) => {
      if (!lastTimestamp || lastTimestamp === timestamp) {
        setTimeout(() => watchChanges(dir, timestamp), 1e3);
      } else {
        chrome.runtime.reload();
      }
    });
  };
  chrome.management.getSelf((self) => {
    if (self.installType === "development") {
      chrome.runtime.getPackageDirectoryEntry((dir) => watchChanges(dir));
      chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        if (tabs[0]) {
          chrome.tabs.reload(tabs[0].id);
        }
      });
    }
  });

  // src/js/background.js
  chrome.action.onClicked.addListener(function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { greeting: "hello" }, function(response) {
      });
    });
  });
})();
