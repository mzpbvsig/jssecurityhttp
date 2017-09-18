$(function() {
    getValueByArray(["msg", "url", "pubkey"],
        function(result) {
            if (result.msg != undefined) {
                $(".msg").val(result.msg);
            }

            if (result.url != undefined) {
                $(".url").val(result.url);
            }

            if (result.pubkey != undefined) {
                $(".pubkey").val(result.pubkey);
            }
        });

   $(".send").click(function(){
        $(".message").val("");
        $(".detail").html("");
        var msg = $(".msg").val();
        var url = $(".url").val();

        var pubkey = $(".pubkey").val();
        send(url, msg, pubkey);

        saveObject({
                    "msg": msg,
                    "url": url,
                    "pubkey": pubkey
                },
                function() {

                });
   });

   document.addEventListener('copy', function(e) {
               e.clipboardData.setData('text/plain', $(".message").val());
               e.preventDefault();
   });

   $(".open").click(function(e){
         document.execCommand('copy')
         var newURL = "http://www.bejson.com/";
         chrome.tabs.create({ url: newURL });
   });
});
