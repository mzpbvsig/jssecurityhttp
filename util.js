function send(url, msg, pubkey) {
    var oReq = new XMLHttpRequest();
    oReq.open("POST", url, true);
    oReq.responseType = "arraybuffer";
    oReq.setRequestHeader('Content-Type', 'application/json');

    oReq.onload = function(oEvent) {
            var arrayBuffer = oReq.response;
            var result = EncryptUtils.decodeResponse(arrayBuffer);
            $(".message").val(result);
            try{
                jsonObj = JSON.parse(result);
                $(".detail").html("OK" + jsonObj);
            }catch(e){
                $(".detail").html("不是一个正确的json->" + e);
            }
            console.log(result);
    };
    var params = EncryptUtils.compress(msg, pubkey);
    oReq.send(params);
}



function saveObject(obj, callback) {
    chrome.storage.local.set(obj, callback);
}

function getValue(key, callback) {
    chrome.storage.local.get(key, callback);
}

function getValueByArray(array, callback) {
    chrome.storage.local.get(array, callback);
}