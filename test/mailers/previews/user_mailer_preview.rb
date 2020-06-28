# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview
  # Preview this email at http://localhost:3000/rails/mailers/user_mailer/password_reset
  def password_reset
    user = User.first
    user.password_reset_token = User.new_token
    user.update_attribute(:password_reset_digest, User.digest(user.password_reset_token))
    UserMailer.password_reset(user)
  end
end
