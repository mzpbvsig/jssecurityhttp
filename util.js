function send(url, msg, pubkey) {
    var oReq = new XMLHttpRequest();
    oReq.open("POST", url, true);
    oReq.responseType = "arraybuffer";
    oReq.setRequestHeader('Content-Type', 'application/json');

    oReq.onload = function(oEvent) {
            var arrayBuffer = oReq.response;
            var result = EncryptUtils.decodeResponse(arrayBuffer);
            try{
                jsonObj = JSON.parse(result);
            }catch(e){
                
            }
            console.log(result);
    };
    var params = EncryptUtils.compress(msg, pubkey);
    oReq.send(params);
}

