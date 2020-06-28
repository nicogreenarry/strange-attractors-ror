class PasswordResetsController < ApplicationController
  before_action :get_user, only: [:edit, :update]
  before_action :valid_user, only: [:edit, :update]
  before_action :check_expiration, only: [:edit, :update]

  def new
  end

  def create
    @user = User.find_by(email: params[:password_reset][:email].downcase)
    if @user
      @user.create_password_reset_digest
      @user.send_password_reset_email
      flash[:info] = "Email sent with password reset instructions"
      redirect_to root_url
    else
      flash.now[:danger] = "Email address not found"
      render 'new'
    end
  end

  def edit
  end

  def update
    if params[:user][:password].empty?
      # One advantage of using errors.add(:password, :blank) is that the resulting message is automatically rendered in
      # the correct language when using the rails-i18n gem.
      @user.errors.add(:password, :blank)
      render 'edit'
    elsif @user.update(user_params)
      # One likely scenario for users unfortunate enough to have sessions stolen would be to
      # immediately reset their passwords. As a result, it would be especially nice if password
      # reset automatically expired any such hijacked sessions.
      @user.forget
      reset_session
      log_in @user
      @user.update_columns(password_reset_digest: nil, password_reset_sent_at: nil)
      flash[:success] = "Password has been reset."
      redirect_to @user
    else
      render 'edit'
    end
  end

  private def user_params
    params.require(:user).permit(:password)
  end

  # Before filters
  private def get_user
    @user = User.find_by(email: params[:email])
  end

  private def valid_user
    unless @user&.authenticated?(:password_reset, params[:id])
      flash[:danger] = "Invalid password reset link"
      redirect_to root_url
    end
  end

  private def check_expiration
    if @user.password_reset_expired?
      flash[:danger] = "Password reset has expired."
      redirect_to request_reset_password_url
    end
  end
end
