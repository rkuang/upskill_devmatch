class ContactMailer < ActionMailer::Base
    default to: 'rkuang26@gmail.com'
    def contact_email(name, email, body)
        @name = name
        @email = email
        @body = body
        
        mail(from: email, subject: 'DevMatch Contact Form Message')
    end
end