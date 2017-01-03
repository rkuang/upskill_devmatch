class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  
  belongs_to :plan
  
  # If user passes validation, tell Stripe to charge card and set user up with
  # pro subscription. Stripe responds with customer data (customer_token) for
  # Rails to save in our db
  attr_accessor :stripe_card_token
  def pro_save
    if valid?
      customer_token = Stripe::Customer.create(description: email, plan: plan_id, source: stripe_card_token)
      self.stripe_customer_token = customer_token.id
      save!
    end
  end
end
