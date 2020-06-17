module SessionsHelper
  def current_user
    user_id = session[:user_id]
    if user_id
      @current_user ||= User.find_by(id: user_id)
      return @current_user
    end

    user_id = cookies.encrypted[:user_id]
    if user_id
      user = User.find_by(id: user_id)
      if user&.authenticated?(cookies[:remember_token])
        log_in user
        @current_user = user
      end
    end
  end

  def current_user?(user)
    user && user == current_user
  end

  def log_in(user)
    session[:user_id] = user.id
  end

  def logged_in?
    !!current_user
  end

  def log_out
    forget(current_user)
    reset_session
    @current_user = nil
  end

  # Remembers a user in a persistent session.
  def remember(user)
    user.remember
    cookies.permanent.encrypted[:user_id] = user.id
    cookies.permanent[:remember_token] = user.remember_token
  end

  # Forgets a persistent session.
  def forget(user)
    user.forget
    cookies.delete(:user_id)
    cookies.delete(:remember_token)
  end

  # Stores the URL trying to be accessed.
  def store_location
    session[:forwarding_url] = request.original_url if request.get?
  end
end
