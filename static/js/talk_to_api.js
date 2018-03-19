/*
    FUNCTION USED TO REQUEST DATA IN JSON FORMAT FROM THE REST API
*/
var apiRequests = function(callingFunction,action,id,status,user_id,page){
    var url = retrieveAPIUrl();

    console.log('id is '+url);
    console.log('url is '+url);
    console.log('action is '+action);


    if('GET'==action){
        var data = {
            id:id,
            status:status,
            user_id:user_id,
            page:page
        };
        console.log('status is '+status);
        console.log('user_id is '+user_id);
        console.log('page is '+page);

        $.getJSON(url,data,function(){
            console.log('Requesting...')
        }).done(function(json){
            apiResponseArr = json;
            console.log('apiResponse is ');
            console.log(apiResponseArr);
            console.log('JSON length is '+apiResponseArr.length)

            //  pass the data to the template
            populateTemplate();

        }).fail(function(jqxhr,textStatus,error){
            var err = textStatus+", "+error;
            console.log("Request Failed:"+err);
        });
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
            url: url,
            type: "DELETE", // <- Change here
            contentType: "application/json",
            dataType: 'json',
            data:data,
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