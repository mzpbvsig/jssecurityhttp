/* EncryptUtils by zhangkai */
var EncryptUtils = {
    k: ['0', '1', '2', '3', '4', '5', '6', '7', '8',
                       '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
                       'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y',
                       'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
                       'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y',
                       'Z', '*', '!'],
    encode: function(str){
        var b64Str = Base64.encode(str);
        var len = b64Str.length;
        var result = "";
        for(var i = 0; i < len; i ++){
             result += b64Str.charAt(i).charCodeAt(0) + this.k[(i % this.k.length)].charCodeAt(0);
             if(i != len - 1){
                result += "_";
             }
        }
        result = "x" + result + "y";

        return result;
    },
    decode: function(str){
        var result = "";
        if(str.charAt(0) == 'x' && str.charAt(str.length - 1) == 'y'){
             var str = str.substr(1, str.length - 2);
             var strs = str.split('_');
             var len = strs.length;
             for(var i = 0; i < len ; i++){
                  result += String.fromCharCode(parseInt(strs[i]) - this.k[(i % this.k.length)].charCodeAt(0));
             }
        }
        return Base64.decode(result);
    },
    rsa: function(str, publickey){
        var strs = this.sectionStr(str);
        var crypt = new JSEncrypt();
        crypt.setPublicKey(publickey);
        var result = "";
        if(strs.length == 0){
             result = crypt.encrypt(str);
        }else{
           for(var i = 0; i < strs.length ; i++){
             result += crypt.encrypt(strs[i]);
             console.log(crypt.encrypt(strs[i]).length);
           }
        }
        console.log(result);
        return result;
    },
    sectionStr: function(str){
        var strs = [];
        var length = str.length;
        var size = 256;
        if (length > size) {
             var len = parseInt(length / size) + (length % size > 0 ? 1 : 0);
             for (var i = 0, j = 0; i < length; i += 1) {
                   var start = i * size;

                   if (size + start >= length) {
                      size = length - start;
                   }
                   if (j >= len) {
                       break;
                   }
                   j++;
                   strs.push(str.substr(start, size));
              }
       }
       return strs;
    },
    decodeResponse: function(arrayBuffer){
           var byteArray = new Uint8Array(arrayBuffer);
           var inflate = new pako.Inflate({ level: -1});
           inflate.push(byteArray, true);
           if (inflate.err) {
               throw new Error(inflate.err);
           }
           var string = new TextDecoder("utf-8").decode(inflate.result);
           var result = EncryptUtils.decode(string);
           if(Object.prototype.toString.call( result ) === '[object Array]'){
                  var i, str = '';
                  for (i = 0; i < result.length; i++) {
                        str += '%' + ('0' + result[i].toString(16)).slice(-2);
                  }
                  result = decodeURIComponent(str);
           }
           return result;
    },
    compress: function(msg, pubkey){
        return pako.gzip(this.rsa(msg, pubkey));
    }
};
