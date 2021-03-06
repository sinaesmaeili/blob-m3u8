const tippy = require("tippy.js");

const background = chrome.extension.getBackgroundPage();
const ul = document.getElementById("content-list");
const clear = document.getElementById("clear-icon");

function searchHAR() {
    chrome.storage.local.get("urlObjects", (result) => {
        if (result.urlObjects.length != 0) {
            document.getElementById("content-list").style.display = "block";
            
            for (x in result.urlObjects) {
                let li = document.createElement("li");
                li.classList.add("link");
                tippy('#content-list', { target: ".link", content: "Click to copy" });
                let sample = result.urlObjects[x].url;
                li.appendChild(document.createTextNode(sample));
                li.onclick = copyStringToClipboard(sample);
                ul.appendChild(li);
            }
        } else {
            document.getElementById("nolinks").style.display = "block";
            document.getElementById("content-list").style.display = "none";
        }
    });

}

function clearStorage() {
    chrome.storage.local.clear((obj) => {
        let error = chrome.runtime.lastError;
        if (error) background.console.log(error);
        ul.innerHTML = '';
        document.getElementById("nolinks").style.display = "block";
        document.getElementById("content-list").style.display = "none";
        chrome.storage.local.set({ "urlObjects": [] }, () => { });
        background.urlObjects = [];
    });
}

function copyStringToClipboard(str) {
    return function() {
        var el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style = { position: 'absolute', left: '-9999px' };
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }
}

async function asyncCall() {
    await searchHAR();
    clear.onclick = await clearStorage;
}

asyncCall();