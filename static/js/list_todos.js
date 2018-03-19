/**
 *  Create Click events for the Edit and Delete
 */
var createClickEvents = function(){
    console.log('creating click events');
    $('.edit-link').on('click',function(){console.log('id is: '+$(this).attr("id"));});
    $('.delete-link').on('click', function(){
        //  retrieve the ID for the todo ITEM
        var id = parseInt($(this).attr("id").replace('delete-todo-',''));
        console.log('new id is '+id);

        /**
         *  Make call to API to delete the item
         *  See talk_to_api.js
         */
         apiRequests('deleteClickEvent','DELETE',id,$('#choose_status').val(),$('#user_id').html(),1);
    });
};

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
        tableCellsArr.push($('<td class="cell-action"><a id="edit-todo-'+apiResponseArr[i].id+'" class="edit-link" data-toggle="modal" data-target="#todo-modal""><i class="far fa-edit"></i></a>&nbsp;<a id="delete-todo-'+apiResponseArr[i].id+'" class="delete-link" ><i class="far fa-trash-alt"></i></a></td>'));
         /*
         <a id="todo-{{todo.id}}" class="edit-link" data-toggle="modal" data-target="#todo-modal" onClick="document.getElementById('');">
                                        <i class="far fa-edit"></i>
                                    </a>
                                    <a onClick="document.getElementById('delete{{ todo.id }}').submit();"><i class="far fa-trash-alt"></i></a>
                                    <form id="edit{{ todo.id }}" method="POST" action="{% url 'todos:edit_todo' todo.id %}">
                                        {% csrf_token %}
                                        <input type="hidden">
                                    </form>
                                    <form id="delete{{ todo.id }}" method="POST" action="{% url 'todos:delete_todo' todo.id %}">
                                        {% csrf_token %}
                                        <input type="hidden">
                                    </form>*.*/



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