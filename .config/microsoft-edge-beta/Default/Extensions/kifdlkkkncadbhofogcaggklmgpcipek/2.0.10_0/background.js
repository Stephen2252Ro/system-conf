function onInstall(e) {
  // if first install, open options page
  if(e && e.reason == "install") {
    const url = 'options.html?from=install';
    chrome.tabs.create({url});
  }
}
chrome.runtime.onInstalled.addListener(onInstall);