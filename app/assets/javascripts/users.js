/* global $, Stripe */
// Document ready
$(document).on('turbolinks:load',function(){
  var the_form = $('#pro_form'),
      the_button = $('#form-submit-btn');
  
  // Set Stripe public key
  Stripe.setPublishableKey( $('meta["stripe-key"]').attr('content') );
  
  // When user clicks form submit button, prevent default submission behavior
  the_button.click(function(){
    event.preventDefault();
    
    // Collect credit card fields
    var card_number = $('#card_number').val(),
        card_code = $('#card_code').val(),
        card_month = $('#card_month').val(),
        card_year = $('#card_year').val();
        
    // Send card info to Stripe
    Stripe.createToken({number: card_number,
                        cvc: card_code,
                        exp_month: card_month,
                        exp_year: card_year},
                        stripeResponseHandler)
  });
  
  // Stripe will return card token
  // Inject card token as hidden field into form
  // Submit form to Rails app
});