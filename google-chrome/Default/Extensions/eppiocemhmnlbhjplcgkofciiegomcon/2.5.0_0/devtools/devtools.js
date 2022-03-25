if (!chrome.devtools.inspectedWindow.tabId) {
  chrome.devtools.panels.create(
    'Mario',
    '/devtools/panel/images/icon.png',
    '/devtools/panel/panel.html',
    null,
  );
}
