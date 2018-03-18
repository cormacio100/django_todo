/*
    FUNCTION USED TO REQUEST DATA IN JSON FORMAT FROM THE REST API
*/
var requestForJsonData = function(callingFunction,status,user_id,page){
    var host = window.location.hostname;

    //  Check if running on localhost
    //  If yes, port 8000 needs to be included in the URL
    if('127.0.0.1'==host){
        var url = 'http://'+host+':8000/todos/api/?';
    }else{
        var url = 'https://'+host+'/todos/api/?';
    }
    console.log('url is '+url);
    var getData = {
        status:status,
        user_id:user_id,
        page:page
    };
    console.log('status is '+status);
    console.log('user_id is '+user_id);
    console.log('page is '+page);

    $.getJSON(url,getData,function(){
        console.log('Requesting...')
    }).done(function(json){
        apiResponse = json;
        console.log('json is ');
        console.log(json);
        console.log('apiResponse is ');
        console.log(apiResponse);
        console.log('JSON length is '+apiResponse.length)

    }).fail(function(jqxhr,textStatus,error){
        var err = textStatus+", "+error;
        console.log("Request Failed:"+err);
    });
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