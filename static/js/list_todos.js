$(document).ready(function(){
    $('#REST-data').html('<p id="spinner"><i class="fa fa-spinner fa-spin fa-3x orange-spin"></i></p>');

    //  initially load ALL todo items.
    //  Display the 1st page of 8 records
    //  talk_to_api.js
    requestForJsonData('ALL','initLoad',1);
});