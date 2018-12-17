// chrome.storage.local.set({"urlObjects": [{"test": 123}]}, () => {});
// chrome.storage.local.get("urlObjects", (result) => {
//     let arr = [{"test": 123}, {"mandem": 456}];
//     result.urlObjects.push(arr[1]);

//     chrome.storage.local.set({"urlObjects": result.urlObjects}, () => {
//         chrome.storage.local.get("urlObjects", (result) => {
//             console.log('here');
//             console.log(result.urlObjects);
//         });
//     });
// });





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
        urlObjects.push(tempUrlObj);
    }
}
