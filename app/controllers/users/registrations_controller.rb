class Users::RegistrationsController < Devise::RegistrationsController
    # Extend Devise behavior so that user signing up with the pro account
    # (plan_id=2) save with a special Stripe subscription function (pro_save)
    # Otherwise, save as usual
    def create
        super do |resource|
            if params[:plan]
                resource.plan_id = params[:plan]
                if resource.plan_id == 2
                    resource.pro_save
                else
                    resource.save
                end
            end
        end
    end 
end