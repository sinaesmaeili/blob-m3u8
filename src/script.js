const ul = document.getElementById("content-list");
const syncBtn = document.getElementById("sync");

syncBtn.onclick = searchHAR;

function searchHAR() {
    chrome.storage.local.get("urlObjects", (result) => {
        if (result.urlObjects.length != 0) {

            for (x in result.urlObjects) {
                let li = document.createElement("li");
                let sample = JSON.stringify(result.urlObjects[x].url);
                li.appendChild(document.createTextNode(sample));
                ul.appendChild(li);
            }
        }
    });
    
}