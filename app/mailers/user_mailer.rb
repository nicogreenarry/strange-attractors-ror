class UserMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.password_reset.subject
  #
  def password_reset(user)
    subject = "Password reset for Chaos Attractors" # TODO maybe make a constant for the site title?
    @user = user
    @greeting = "Hi, #{user.name}"

    mail to: user.email, subject: subject
  end
end
