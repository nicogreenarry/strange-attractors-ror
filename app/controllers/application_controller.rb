class ApplicationController < ActionController::Base
  include SessionsHelper

  # Before filters
  private def logged_in_user
    unless logged_in?
      store_location
      flash[:danger] = "Please log in."
      request.xhr? ? render(json: {location: login_path}, status: 403) : redirect_to(login_url)
    end
  end

  private def admin_user
    redirect_to(root_url) unless admin?
  end
end
