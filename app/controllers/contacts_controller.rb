class ContactsController < ApplicationController
    
    # GET request to /contact-us
    # Show new contact form
    def new
        @contact = Contact.new
    end
    
    # POST request to /contacts
    def create
        # Mass assignment of form fields into Contact object
        @contact = Contact.new(contact_params)
        
        # Save object to db
        if @contact.save
            
            # Store form fields via parameters, into varibles
            name = params[:contact][:name]
            email = params[:contact][:email]
            body = params[:contact][:body]
            
            # Plug variables into Contact Mailer email method and send email
            ContactMailer.contact_email(name, email, body).deliver
            
            # Store success message in flash hash and redirect to new
            flash[:success] = "Message sent!"
            redirect_to new_contact_path
        else
            
            # Contact object fails to save
            # Store error message in flash hash and redirect to new
            flash[:danger] = @contact.errors.full_messages.join(", ")
            redirect_to new_contact_path
        end
    end
    
    private
    
        # To collect data from forms, we need to use 'strong parameters'
        # and whitelist formfields
        def contact_params
            params.require(:contact).permit(:name, :email, :comments) 
        end
end