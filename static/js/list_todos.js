/**
 *  Create Click events for the Edit and Delete
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
        console.log('id is '+id);

        /**
         *  Make call to API to delete the item
         *  See talk_to_api.js
         */
         apiRequests('deleteClickEvent','DELETE',id,$('#choose_status').val(),$('#user_id').html(),1);
    });
};

/**
 *  Populate the pop up modal with contents of the Retrieved record
 */
var populateModal = function(){
    //  Populate the modal with record
    $('#edit_title').val(apiResponseArr.title);
    $('#edit_description').val(apiResponseArr.description);
    $('#edit_status').val(apiResponseArr.status);
    $('#edit_todo_id').val(apiResponseArr.id);
    $('#submit-btn').html('Update');
    //$("#todoForm").attr('id','editTodoForm');

    /*
    $("#editTodoForm").submit(function(e){
        e.preventDefault();
		console.log('clickevent');
		/*
		$('#todo-modal').modal('toggle');
		$("#editTodoForm").attr('id','todoForm');
		$('#id_title').val('');
        $('#id_description').val('');
        $('#id_status').val('');
		$('#submit-btn').html('Create');
    });*/
}

/**
 *  Build the table for Todo List
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
        tableCellsArr.push($('<td class="cell-action"><a id="edit-todo-'+apiResponseArr[i].id+'" class="edit-link" data-toggle="modal" data-target="#edit-todo-modal""><i class="far fa-edit"></i></a>&nbsp;<a id="delete-todo-'+apiResponseArr[i].id+'" class="delete-link" ><i class="far fa-trash-alt"></i></a></td>'));

        //  append the table cells to the table Row
        for(j=0; j<tableCellsArr.length;j++){
            tableRow.append(tableCellsArr[j]);
        }
        tableBody.append(tableRow);
        table.append(tableBody);
    }
    createClickEvents();
};

/**
 *  When the page loads
 */
$(document).ready(function(){
    $('#REST-data').html('<p id="spinner"><i class="fa fa-spinner fa-spin fa-3x orange-spin"></i></p>');

    //  initially load ALL todo items.
    //  Display the 1st page of 8 records
    //  for specified user_id
    //  talk_to_api.js
    apiRequests('initialLoad','GET',null,'All',$('#user_id').html(),1);

    //  If the user Sorts by Status
    $('#choose_status').on('change',function(){
        apiRequests('initialLoad','GET',null,$('#choose_status').val(),$('#user_id').html(),1);
    })

});