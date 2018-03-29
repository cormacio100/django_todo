/**
 *  Create Click events for the Edit and Delete Buttons
 */
var createClickEvents = function(){
    //  WHEN THE EDIT BUTTON IS CLICKED
    $('.edit-link').on('click',function(){
        //  retrieve the ID for the Todo Item
        var id = parseInt($(this).attr("id").replace('edit-todo-',''));
        /**
         *  Make call to API to retrieve the single item
         *  See talk_to_api.js
         */
         apiRequests('editClickEvent','GET',id,$('#choose_status').val(),$('#user_id').html(),1);
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
 *  Populate the Edit modal with contents of the individual Todo Items for editing
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
 *  Function GENERATES the Pager Links
 */
var createPagerLinks = function(page_count,count){
    //  Clear the record count and page_links DIV before appending to it
    $('#record_count').html('');
    $('#page_links').html('');
    $('#record_count').html('('+count+' items)');

    var link = '';
    for(j=0;j<page_count;j++){
        link = $('<a href="#" class="listing-pager">'+(j+1)+'</a>');
        $('#page_links').append(link);

        /*  Add divider between links */
        if((j+1)<page_count){
            $('#page_links').append(' | ');
        }
    }
    //  Create click action for the pager links
    $('.listing-pager').click(function(){
        var page = $(this).text();
        //  Call the API to retrieve items for selected page
        apiRequests('pagerLoad','GET',null,$('#choose_status').val(),$('#user_id').html(),page);
    });
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
    var tableHeading = $('<thead><tr><td class="centered"><strong>Title</strong></td><td class="centered"><strong>Description</strong></td><td class="centered"><strong>Status</strong></td><td class="centered"><strong>Actions</strong></td></tr></thead>');
    table.append(tableHeading);
    restDataDiv.append(table);
    var tableBody = $('<tbody></tbody>');

    //  Loop through the data returned from the API and add rows to the table
    for(i=0; i<apiResponseArr.length;i++){
        var tableRow = $('<tr></tr>');
        var tableCellsArr = [];
        tableCellsArr.push($('<td class="cell-title centered">'+apiResponseArr[i].title+'</td>'));
        tableCellsArr.push($('<td class="cell-description centered">'+apiResponseArr[i].description+'</td>'));
        tableCellsArr.push($('<td class="cell-status centered">'+apiResponseArr[i].status+'</td>'));
        tableCellsArr.push($('<td class="cell-action centered" id="cell-action-'+apiResponseArr[i].id+'"><a id="edit-todo-'+apiResponseArr[i].id+'" class="edit-link" data-toggle="modal" data-target="#todo-modal""><i class="far fa-edit"></i></a></td>'));

        //  append the table cells to the table Row
        for(j=0; j<tableCellsArr.length;j++){
            tableRow.append(tableCellsArr[j]);
        }
        //  append the table row to the table body
        tableBody.append(tableRow);
        //  append the table body to the table
        table.append(tableBody);
        //  Create a click event for the action button
        createClickEvents();

        //  GENERATE THE PAGE LINKS
        //  Since each apiResponseArr object contains the same page_count and record_count
        //  we only need to retrieve the value from the first record
        if(0==i){
            page_count = apiResponseArr[i].page_count
            count = apiResponseArr[i].count

            //  generate pager links
            createPagerLinks(page_count,count);
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
    //  Display the 1st page of 5 records
    //  for specified user_id
    //  talk_to_api.js
    apiRequests('initialLoad','GET',null,'All',$('#user_id').html(),1);

    //  If the user Sorts by Status
    $('#choose_status').on('change',function(){
        apiRequests('initialLoad','GET',null,$('#choose_status').val(),$('#user_id').html(),1);
    });

});