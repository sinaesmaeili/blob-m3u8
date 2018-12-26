let urlObjects = [];
chrome.storage.local.set({ "urlObjects": [] }, () => { });

chrome.webRequest.onHeadersReceived.addListener((details) => {
    createUrlObjects(details);
    chrome.storage.local.get("urlObjects", (result) => {
        chrome.storage.local.set({ "urlObjects": urlObjects }, () => { });
    });
}, 
{ urls: ["<all_urls>"] }, ["responseHeaders"]);

function createUrlObjects(details) {
    if (details.url.endsWith("m3u8") || details.url.includes("playlist.m3u8")) {
        let tempUrlObj = { "url": details.url };
        urlObjects.unshift(tempUrlObj);
        
        if (urlObjects.length > 5) urlObjects.pop();
    }
}
