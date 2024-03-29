searchISBN = function(select){
    fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${select.selectionText}`)
        .then(response => response.text())
        .then(data => data.substring(18,data.length-1))
        .then(trimdata => JSON.parse(trimdata))
        .then(function(jsondata){
            for(let k in jsondata){
                chrome.tabs.create({"url": `${jsondata[k].info_url}`});
            }
        })
        .catch(err => console.log(err));
}
chrome.contextMenus.create({
    title: "Search ISBN",
    contexts:["selection"],
    onclick: searchISBN
});


