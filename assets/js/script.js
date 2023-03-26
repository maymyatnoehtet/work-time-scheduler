$(function () {
  var timeBlockTemp = "";
  for (let i = 9; i < 18; i++) {
    if (i > 12) {
      var time = i - 12;
      timeBlockTemp += `     
      <div id="hour-${i}" class="row time-block">
        <div class="col-2 col-md-1 hour text-center py-3">${time}:00 PM</div>
        <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
        <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      </div>
      ` 
    }
    else if (i == 12) {
      timeBlockTemp += `     
      <div id="hour-${i}" class="row time-block">
        <div class="col-2 col-md-1 hour text-center py-3">${i}:00 PM</div>
        <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
        <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      </div>
      `  
    }
    else {
      timeBlockTemp += `     
      <div id="hour-${i}" class="row time-block">
        <div class="col-2 col-md-1 hour text-center py-3">${i}:00 AM</div>
        <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
        <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      </div>
      `  
    }
  
  };

  $("#schedule-block").html(timeBlockTemp);

  // Add a listener for click events on the save button.
  $('.saveBtn').on('click', function() {
    // Get the id of the containing time block.
    var timeBlockId = $(this).parent().attr('id');
    // Get the user input from the textarea.
    var userInput = $(this).siblings('.description').val();
    // Save the user input in local storage with the time block id as the key.
    localStorage.setItem(timeBlockId, userInput);
  });

  // Apply the past, present, or future class to each time block.
  var currentHour = dayjs().hour();
  $('.time-block').each(function() {
    var timeBlockHour = parseInt($(this).attr('id').split('-')[1]);
    // console.log(timeBlockHour);
    if (timeBlockHour < currentHour) {
      $(this).addClass('past');
    } else if (timeBlockHour === currentHour) {
      $(this).addClass('present');
      // console.log(this);
    } else {
      $(this).addClass('future');
    }
  });

  // Get any user input that was saved in localStorage and set the values of the corresponding textarea elements.
  $('.time-block').each(function() {
    var timeBlockId = $(this).attr('id');
    var savedUserInput = localStorage.getItem(timeBlockId);
    if (savedUserInput) {
      $(this).find('.description').val(savedUserInput);
    }
  });

  // Display the current date in the header of the page.
  var currentDate = dayjs().format('dddd, MMMM D');
  $('#currentDay').text(currentDate);
});

