let url
let lastCopiedUrl
let currentTabId

browser.tabs.onActivated.addListener((activeInfo) => {
    currentTabId = activeInfo.tabId
});

browser.tabs.onUpdated.addListener((tabId, changeInfo, tabInfo) => {
    if (tabInfo.url.startsWith("http")) {
        browser.pageAction.show(tabId)
        if (tabInfo.url == lastCopiedUrl) {
            setSuccess(tabId)
        } else {
            setDefault(tabId)
        }
    }

    url = tabInfo.url
});

browser.pageAction.onClicked.addListener(() => {
    navigator.clipboard.writeText(url).then(
        function () {
            lastCopiedUrl = url
            setSuccess(currentTabId)
        },
        function (err) {
            setAlert(currentTabId)
        }
    );

});

function setDefault(currentTabId) {
    browser.pageAction.setIcon(
        {
            "tabId": currentTabId,
            "path": {
                24: "assets/images/clipboard-outline-24.png",
                36: "assets/images/clipboard-outline-36.png",
                48: "assets/images/clipboard-outline-48.png"
            }
        }
    )
}

function setAlert(currentTabId) {
    browser.pageAction.setIcon(
        {
            "tabId": currentTabId,
            "path": {
                24: "assets/images/clipboard-alert-outline-24.png",
                36: "assets/images/clipboard-alert-outline-36.png",
                48: "assets/images/clipboard-alert-outline-48.png"
            }
        }
    )
}

function setSuccess(currentTabId) {
    browser.pageAction.setIcon(
        {
            "tabId": currentTabId,
            "path": {
                24: "assets/images/clipboard-check-outline-24.png",
                36: "assets/images/clipboard-check-outline-36.png",
                48: "assets/images/clipboard-check-outline-48.png"
            }
        }
    )
}