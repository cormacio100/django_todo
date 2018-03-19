//  Global array for transferring JSON into from API
//  It will contain an ARRAY OF 0BJECTS
var apiResponseArr = [];

//  Retrieve the correct URL for the API
var retrieveAPIUrl = function(){
    var host = window.location.hostname;

    //  Check if running on localhost
    //  If yes, port 8000 needs to be included in the URL
    if('127.0.0.1'==host){
        var url = 'http://'+host+':8000/todos/api/?';
    }else{
        var url = 'https://'+host+'/todos/api/?';
    }
    return url;
}
