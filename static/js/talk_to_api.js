/*
    FUNCTION USED TO REQUEST DATA IN JSON FORMAT FROM THE REST API
*/
var apiRequests = function(callingFunction,action,id,status,user_id,page){
    var url = retrieveAPIUrl();
    console.log('in apiRequests');
    console.log('action is '+action);
    if('GET'==action){
        var data = {
            status:status,
            user_id:user_id,
            page:page
        };
        console.log('id is '+id);
        console.log('status is '+status);
        console.log('user_id is '+user_id);
        console.log('page is '+page);
        console.log('url is '+url);

        if('editClickEvent'== callingFunction){

            data.id = id;
            console.log('EDIT CLICK EVENT');
            url = url+id+'/'
            console.log('url is '+url);

            $.getJSON(url,function(){
                console.log('Requesting for individual record...')
            }).done(function(json){
                apiResponseArr = json;
                console.log('apiResponse is ');
                console.log(apiResponseArr);
                console.log('title is '+apiResponseArr.title);
                console.log('load to modal form');
                populateModal();
            }).fail(function(jqxhr,textStatus,error){
                var err = textStatus+", "+error;
                console.log("Request Failed:"+err);
            });
        }else{
            console.log('LISTING EVENT');
            console.log('url is '+url);
            $.getJSON(url,data,function(){
                console.log('Requesting...')
            }).done(function(json){
                apiResponseArr = json;
                console.log('apiResponse is ');
                console.log(apiResponseArr);
                console.log('JSON length is '+apiResponseArr.length)

                populateTemplate();

            }).fail(function(jqxhr,textStatus,error){
                var err = textStatus+", "+error;
                console.log("Request Failed:"+err);
            });
        }
    }else if('DELETE'==action){
        console.log('DELETE is the action');
        /*$.ajax({
            url: url,
            data: {id:id},
            type: 'DELETE',
            dataType: 'json',
            contentType: 'json',
            success: function(result) {
            // Do something with the result
                console.log('got a result');
            }
        });*/
        var data = {
            'id':id,
            //'action': 'delete',
            //'status':status,
            //'user_id':user_id,
            //'page':page
        }

        $.ajax({
            //url: url+'delete/',
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


/*
    $.ajax({
        type: 'POST',
        url: url,
        data: postedData,
        dataType: 'json',
        //success: callback
        success: function(result) {
            // handle success
            console.log('API REQUEST SUCCESS');
        },
        error: function(request,msg,error) {
            // handle failure
            console.log('API REQUEST FAIL')
        }
    });

    $.ajax({
        url: url,
        method: 'GET',
	    dataType: 'json',
	    data: data,
        contentType: 'application/json',
        success: function(result) {
            // handle success
            console.log('API REQUEST SUCCESS');
        },
        error: function(request,msg,error) {
            // handle failure
            console.log('API REQUEST FAIL')
        }
    });*/

}

//var delete