/*
    FUNCTION USED TO REQUEST DATA IN JSON FORMAT FROM THE REST API
*/
var apiRequests = function(callingFunction,action,id,status,user_id,page){
    var url = retrieveAPIUrl();

    if('GET'==action){
        var data = {
            status:status,
            user_id:user_id,
            page:page
        };

        //  check what called the request
        if('editClickEvent'== callingFunction){
            data.id = id;
            url = url+id+'/'

            $.getJSON(url,function(){
                console.log('Requesting for individual record...')
            }).done(function(json){
                apiResponseArr = json;
                populateModal();
            }).fail(function(jqxhr,textStatus,error){
                var err = textStatus+", "+error;
            });
        }else{
            $.getJSON(url,data,function(){
                console.log('url is '+url);
                console.log('Requesting...');
                console.log('calling function is '+callingFunction);
            }).done(function(json){
                apiResponseArr = json;
                populateTemplate();
            }).fail(function(jqxhr,textStatus,error){
                var err = textStatus+", "+error;
            });
        }
    }else if('DELETE'==action){
        var data = {
            'id':id,
            //'action': 'delete',
            //'status':status,
            //'user_id':user_id,
            //'page':page
        }
        $.ajax({
            url: url+id+'/',
            type: "DELETE", // <- Change here
            contentType: "application/json",
            dataType: 'json',
            //data:data,
            success: function (data, textStatus, xhr) {
                console.log(data);
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log('Error in Operation');
            }
        });
    }
}
