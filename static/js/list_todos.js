/**
 *  Create Click events for the Edit and Delete Buttons
 */
var createClickEvents = function(){
    console.log('creating click events');

    //  WHEN THE EDIT BUTTON IS CLICKED
    $('.edit-link').on('click',function(){
        console.log('id is: '+$(this).attr("id"));
        //  retrieve the ID for the Todo Item
        var id = parseInt($(this).attr("id").replace('edit-todo-',''));
        console.log('EDIT ID is '+id);

        /**
         *  Make call to API to retrieve the single item
         *  See talk_to_api.js
         */
         apiRequests('editClickEvent','GET',id,$('#choose_status').val(),$('#user_id').html(),1);
    });

    //  WHEN THE DELETE BUTTON IS CLICKED
    $('.delete-link').on('click', function(){
        //  retrieve the ID for the Todo Item
        var id = parseInt($(this).attr("id").replace('delete-todo-',''));
        console.log('DELETE ID is '+id);
        console.log('#cell-action-'+id);

        //  Will only work if I remove the check for POST
        document.location.href = '/todos/delete_todo/'+id+'/'; //relative to domain

        // declare a HIDDEN input field for the csrf_token
        //var input = document.createElement('input');
        //input.type = 'hidden';
        //input.name = 'csrfmiddlewaretoken';
        //input.value = '{% csrf_token %}';

        // attach field to the form
        //$('#delete-form-'+id).append('<input type="hidden" name="csrfmiddlewaretoken" value="{% csrf_token %}">');

        //$("#delete-form-"+id).serialize();

        /*(
        $('<form method="POST" action="/todos/delete_todo/'+id+'/"><input type="hidden"></form>')
            .appendTo('#cell-action-'+id)
            .submit(function(){
                console.log('form submitted');
            });
        */
        //  Relate the link to the form with the same ID element and submit it
        //$('form#delete-form-'+id)[0].submit(function(){
         //   console.log('form submitted');
        //});

        //  <form id="delete-form-'+apiResponseArr[i].id+'" method="POST" action="/todos/delete_todo/'+apiResponseArr[i].id+'/" %}"><input type="hidden"></form>

        /**
         *  Make call to API to delete the item
         *  See talk_to_api.js
         */
         //apiRequests('deleteClickEvent','DELETE',id,$('#choose_status').val(),$('#user_id').html(),1);
    });
};

/**
 *  Reset the Create modal if it was changed by a user clicking edit button
 */
var resetModal = function(){
    $('#todoForm').attr('action','/todos/create_todo/')
    $('#todo-form-header').html('Todo Item');
    $('#id_title').val('');
    $('#id_description').val('');
    $('#id_status').val('Todo');
    $('#submit-btn').html('Create');
    if($("#id_status option[value='Done-Remove']").length > 0){
        $("#id_status option[value='Done-Remove']").remove();
    }
}

/**
 *  Populate the pop up modal with contents of the individual Todo Items for editing
 */
var populateModal = function(){
    /***
     *  If the Create button is clicked at any time it will reset the following attributes
     *  -  Heading
     *  -  title contents
     *  -  description contents
     *  -  status
     *  -   action
     */
     $('#create-todo-btn').on('click',function(){
        resetModal();
     });

    //  Populate the modal with Todo Item values
    $('#todo-form-header').html('Edit Todo Item');
    $('#id_title').val(apiResponseArr.title);
    $('#id_description').val(apiResponseArr.description);
    $('#id_status').val(apiResponseArr.status);

    //  add an option to the select menu to allow Todo Item to be remove upon submission if desired
    if($("#id_status option[value='Done-Remove']").length == 0){
        $('#id_status').append('<option value="Done-Remove">Done (Remove)</option>');
    }
    //  Change the action on the form to include the id
    $('#todoForm').attr('action','/todos/edit_todo/'+apiResponseArr.id+'/')

    //  Change the wording on the button
    $('#submit-btn').html('Update');
}

/**
 *  Function is called from the talk_to_api.js file upon successful retrieval of the Todo Items
 *  Builds the table for Todo List
 */
var populateTemplate = function(){
    //  PARENT DIV
    var restDataDiv = $('#REST-data')

    //  Clear the spinner or  previous searches
    restDataDiv.html('');

    //  Build a Table with Table Heading to append to the Div
    var table = $('<table class="table"></table>');
    var tableHeading = $('<thead><tr><td><strong>Title</strong></td><td><strong>Description</strong></td><td><strong>Status</strong></td><td><strong>Actions</strong></td></tr></thead>')

    table.append(tableHeading);

    restDataDiv.append(table);

    console.log('apiResponseArr.length is '+apiResponseArr.length);

    var tableBody = $('<tbody></tbody>');
    //  Loop through the data returned from the API and add rows to the table
    for(i=0; i<apiResponseArr.length;i++){
        var tableRow = $('<tr></tr>');

        var tableCellsArr = [];
        tableCellsArr.push($('<td class="cell-title">'+apiResponseArr[i].title+'</td>'));
        tableCellsArr.push($('<td class="cell-description">'+apiResponseArr[i].description+'</td>'));
        tableCellsArr.push($('<td class="cell-status">'+apiResponseArr[i].status+'</td>'));
        tableCellsArr.push($('<td class="cell-action" id="cell-action-'+apiResponseArr[i].id+'"><a id="edit-todo-'+apiResponseArr[i].id+'" class="edit-link" data-toggle="modal" data-target="#todo-modal""><i class="far fa-edit"></i></a>&nbsp;<a id="delete-todo-'+apiResponseArr[i].id+'" class="delete-link"><i class="far fa-trash-alt"></i></a> <form id="delete-form-'+apiResponseArr[i].id+'" method="POST" action="/todos/delete_todo/'+apiResponseArr[i].id+'/" %}"><input type="hidden"></form></td>'));
       // tableCellsArr.push($('<td class="cell-action" id="cell-action-'+apiResponseArr[i].id+'"><a id="edit-todo-'+apiResponseArr[i].id+'" class="edit-link" data-toggle="modal" data-target="#todo-modal""><i class="far fa-edit"></i></a>&nbsp;<a id="delete-todo-'+apiResponseArr[i].id+'" class="delete-link"><i class="far fa-trash-alt"></i></a></td>'));

        //  append the table cells to the table Row
        for(j=0; j<tableCellsArr.length;j++){
            tableRow.append(tableCellsArr[j]);
        }
        tableBody.append(tableRow);
        table.append(tableBody);
        createClickEvents();

        //  Since each apiResponseArr object contains the same page_count and record_count
        //  we only need to retrieve the value from the first one
        if(0==i){
            page_count = apiResponseArr[i].page_count
            count = apiResponseArr[i].count

            //  Clear the record count and page_links DIV before appending to it
            var link = '';
            $('#record_count').html('');
            $('#record_count').html('('+count+' records)');
            $('#page_links').html('');

            for(j=0;j<page_count;j++){
                link = $('<a href="#" class="listing-pager">'+(j+1)+'</a>');
                $('#page_links').append(link);

                /*  Add divider between links */
                if((j+1)<page_count){
                    $('#page_links').append('|');
                }
            }
            //  Create click action for the pager links
            $('.listing-pager').click(function(){
                var page = $(this).text();
                pagerClick(page)
            });

        }


    }

};

/**
 *  When the page loads this page will build the contents of the Todo List table
 *  by calling on the API to retrieve Todo Items
 */
$(document).ready(function(){
    $('#REST-data').html('<div class="row centered margin-top-3"><div class="col-sm-12"><p id="spinner"><i class="fa fa-spinner fa-spin fa-4x orange-spin"></i></p></div></div>');

    //  initially load ALL todo items.
    //  Display the 1st page of 8 records
    //  for specified user_id
    //  talk_to_api.js
    apiRequests('initialLoad','GET',null,'All',$('#user_id').html(),1);

    //  If the user Sorts by Status
    $('#choose_status').on('change',function(){
        apiRequests('initialLoad','GET',null,$('#choose_status').val(),$('#user_id').html(),1);
    });

});