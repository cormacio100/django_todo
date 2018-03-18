$(document).ready(function(){
    $('#REST-data').html('<p id="spinner"><i class="fa fa-spinner fa-spin fa-3x orange-spin"></i></p>');

    //  initially load ALL todo items.
    //  Display the 1st page of 8 records
    //  for specified user_id
    //  talk_to_api.js
    requestForJsonData('initial','All',$('#user_id').html(),1);

    //  If the user Sorts by Status
    $('#choose_status').on('change',function(){
        requestForJsonData('initialLoad',$('#choose_status').val(),$('#user_id').html(),1);
    })

});