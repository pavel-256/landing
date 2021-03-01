$('#contact-form').on('submit', function (e) {
  e.preventDefault(); // when user submit
  // dont refresh the page when submit
  $('p.text-danger').text('');
  // after 2 types the text disapiar
  var $name = $('#name'), // the data from contact form
    $email = $('#email'), // the fields
    $phone = $('#phone'),
    $type = $('#type'),
    $btn = $('#submit-btn'),
    formValid = true;
  emailRegExp = /^(?!.*\.\.)[\w.\-#!$%&'*+\/=?^_`{}|~]{1,35}@[\w.\-]+\.[a-zA-Z]{2,15}$/; // email reg
  phoneRegExp = /^0[2-9]\d{7,8}$/; // phone reg

  var userData = {
    name: $name.val().trim(),
    email: $email.val().trim(),
    phone: $name.val().trim(),
    type: $type.val().trim()
  }; // the input trim
  // disabled the submit button
  $btn.attr('disabled', true);
  $btn.find('span.btn-text').hide(); // hide contact us and show rhe spinner
  $btn.find('div.loader').css('display', 'inline-block');

  // to dasabled the submit button after click
  if (userData.name.length < 2 || userData.name.length > 70) {
    // next mean the next element
    formValid = display_error($name, '*Name is required');
  } // name validation

  if (userData.email.length < 6 || !emailRegExp.test(userData.email)) {
    formValid = display_error($email, '* A valid email is required');
  } // email validation

  if (!phoneRegExp.test(userData.phone)) {
    formValid = display_error($phone, '* A valid phone is required');

  } // phone validation

  if (userData.type == '') {
    formValid = display_error($type, '* Please select type');

  } //  must type select

  if (formValid) {

    $.ajax({

      type: 'POST',
      url: 'save-user-data.php',
      userData: 'html',
      data: userData,
      success: function (res) {

        if (res) {
          window.location = 'tnx.html';
        }

      }
    });

  } else {
    setTimeout(function () {
      $btn.find('span.btn-text').show();
      $btn.find('div.loader').css('display', 'none');
      $btn.attr('disabled', false);
    }, 1000);
  }
});

function display_error(element, message) {

  setTimeout(function () {
    element.next().text(message);
  }, 1000);
  return false;
} // function to validation and prevent double code