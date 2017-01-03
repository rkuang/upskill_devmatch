/* global $, Stripe */
// Document ready
$(document).on('turbolinks:load',function(){
  var the_form = $('#pro_form'),
      the_button = $('#form-submit-btn');
  
  // Set Stripe public key
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
  
  // When user clicks form submit button, prevent default submission behavior
  the_button.click(function(){
    event.preventDefault();
    the_button.val("Processing").prop('disabled', true);
    
    // Collect credit card fields
    var card_number = $('#card_number').val(),
        card_code = $('#card_code').val(),
        card_month = $('#card_month').val(),
        card_year = $('#card_year').val();
        
    // Use Stripe js library to validate fields
    var error = false;
    if (!Stripe.card.validateCardNumber(card_number) ||
        !Stripe.card.validateCVC(card_code) ||
        !Stripe.card.validateExpiry(card_month, card_year)){
          error = true;
          alert('There was an error validating your credit card information');
    }
    
    if(error){
      // If there are card errors, do not send card info to Stripe
      the_button.val("Sign Up").prop('disabled', false);
    } else {
      // Send card info to Stripe
      Stripe.card.createToken({number: card_number,
                          cvc: card_code,
                          exp_month: card_month,
                          exp_year: card_year},
                          stripeResponseHandler);
  
    }
    return false;
  });
  
  // Stripe will return card token
  // Inject card token as hidden field into form
  // Submit form to Rails app
  function stripeResponseHandler(status, response){
    var card_token = response.id;
    the_form.append( $('<input type="hidden" name="user[stripe_card_token]">').val(card_token) );
    the_form.get(0).submit();
  }
});