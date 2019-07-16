$(document).ready(function() {
    // Getting a reference to the input field where user adds a new burger
    var $newItemInput = $("input.new-item");
    // Our new burgers will go inside the burgerContainer
    var $burgerContainer = $(".burger-container");
    // Adding event listeners for deleting, editing, and adding burgerss
    $(document).on("click", "button.delete", deleteBurger);
    $(document).on("click", "button.complete", toggleComplete);
    $(document).on("submit", "#burger-form", insertBurger);
  
    // Our initial burgers array
    var burgArr = [];
  
    // Getting burgers from database when page loads
    getBurger();
  
    // This function resets the burgers displayed with new burgers from the database
    function initializeRows() {
      $burgerContainer.empty();
      var rowsToAdd = [];
      for (var i = 0; i < burgArr.length; i++) {
        rowsToAdd.push(createNewRow(burgArr[i]));
      }
      $burgerContainer.prepend(rowsToAdd);
    }
  
    // This function grabs burgers from the database and updates the view
    function getBurger() {
      $.get("/api/burgers", function(data) {
        burgArr = data;
        initializeRows();
      });
    }
    //this function deletes burgers when the user clicks the delete button
    function deleteBurger(event) {
        event.stopPropagation();
        var id = $(this).data("id");
        $.ajax({
            method: "DELETE",
            url: "/api/burgers/" + id
        }).then(getBurger);
    }

    // Toggles complete status
    function toggleComplete(event) {
        event.stopPropagation();
        var burger = $(this).parent().data("burger");
        burger.devoured = !burger.devoured;
        updateBurger(burger);
    }

    // This function updates a burger in the database
  function updateBurger(burger) {
    $.ajax({
      method: "PUT",
      url: "/api/burgers",
      data: burger
    }).then(getBurger);
  }

  // This function creates a burger-item row
  function createNewRow(burger) {
    var $newInputRow = $(
      [
        "<li class='list-group-item burger-item'>",
        "<span>",
        burger.burger_name,
        "</span>",
        "<input type='burger_name' class='edit' style='display: none;'>",
        // "<button class='delete btn btn-danger'>x</button>",
        "<button class='complete btn btn-primary'>Devour It</button>",
        "</li>"
      ].join("")
    );
    $newInputRow.find("button.delete").data("id", burger.id);
    $newInputRow.find("input.edit").css("display", "none");
    $newInputRow.data("burger", burger);
    //here is where I need to push devoured onto right side of page.
    if (burger.devoured) {
      $newInputRow.find("span").css("text-decoration", "line-through");
    }
    return $newInputRow;
  }
  // This function inserts a new burger into our database and then updates the view
  function insertBurger(event) {
    event.preventDefault();
    var burger = {
      burger_name: $newItemInput.val().trim(),
      devoured: false
    };

    $.post("/api/burgers", burger, getBurger);
    $newItemInput.val("");
  }
})