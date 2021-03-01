$('#contact-form').on('submit', function (e) {
  e.preventDefault();
  // dont refresh the page when submit
  $('p.text-danger').text('');

  //  the text disapiar when ok
  var $name = $('#name'),
    // the data from contact form
    $email = $('#email'),
    // the fields inputs
    $phone = $('#phone'),
    $type = $('#type'),
    $btn = $('#submit-btn'),
    formValid = true,
    emailRegExp = /^(?!.*\.\.)[\w.\-#!$%&'*+\/=?^_`{}|~]{1,35}@[\w.\-]+\.[a-zA-Z]{2,15}$/,
    //  email regular exprassion
    phoneRegExp = /^0[2-9]\d{7,8}$/;
  // phone regular exprassion

  var userData = {
    // to trim what user type on the inputs
    name: $name.val().trim(),
    email: $email.val().trim(),
    phone: $phone.val().trim(),
    type: $type.val().trim()
  }; // the input trim
  $btn.attr('disabled', true);
  // disabled the submit button
  $btn.find('span.btn-text').hide();
  // hide the conact us
  $btn.find('div.loader').css('display', 'inline-block');
  // use the css file to show the spinner

  if (userData.name.length < 2 || userData.name.length > 70) {

    formValid = display_error($name, '*Name is required');
  } // name valid - the function returns false when not valid

  if (userData.email.length < 6 || !emailRegExp.test(userData.email)) {
    formValid = display_error($email, '* A valid email is required');
  } // email valid - the function returns false when not valid

  if (!phoneRegExp.test(userData.phone)) {
    formValid = display_error($phone, '* A valid phone is required');
    // phone valid - the function returns false when not valid
  }

  if (userData.type == '') {
    formValid = display_error($type, '* Please select type');
    // select type - the function returns false when not valid
  }

  if (formValid) {

    $.ajax({
      // the ajax request

      type: 'POST',
      // the method we use 
      url: 'save-user-data.php',
      // the destinaton file
      dataType: 'html',
      // in wich format the data comes (index.html)
      data: userData,
      // var user data from inputs
      success: function (res) {

        if (res) {
          // send to thank page
          window.location = 'tnx.html';
        }

      }
    });

  } else { // if user not validate
    setTimeout(function () {
      $btn.find('span.btn-text').show();
      // show contact
      $btn.find('div.loader').css('display', 'none');
      // hide spinner
      $btn.attr('disabled', false);
      // enable the submit button
    }, 1000);

  }

});

function display_error(element, message) {

  setTimeout(function () {
    element.next().text(message);
  }, 1000);
  return false;
} // the function to short and not duoble code