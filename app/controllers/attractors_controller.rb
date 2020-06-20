class AttractorsController < ApplicationController
  before_action :logged_in_user, only: [:create]

  def random_featured
    query = if Rails.env.development? # dev uses sqlite
              <<~SQL
                SELECT * FROM attractors
                WHERE featured_at IS NOT NULL
                LIMIT 1
                OFFSET cast(
                  (random() / 18446744073709551614.0 + 0.5)
                    * (SELECT COUNT(*) FROM attractors WHERE featured_at IS NOT NULL) AS INTEGER
                )
              SQL
            else
              <<~SQL
                SELECT * FROM attractors
                WHERE featured_at IS NOT NULL
                LIMIT 1
                OFFSET floor(
                  random() * (SELECT COUNT(*) FROM attractors WHERE featured_at IS NOT NULL)
                )
              SQL
            end

    attractor = ActiveRecord::Base.connection.execute(query).first

    # TODO: Eventually it would be nice to record an error if attractor is nil, since it's likely a
    # bug (or it means we're using a dev/staging server without any featured sets in the db).
    response = attractor&.slice('id', 'details')
    response[:savedByMe] = attractor["user_id"] == current_user&.id
    render json: response
  end

  def create
    attractor = Attractor.new(
      user_id: current_user.id,
      details: attractor_params
    )
    saved = attractor.save
    if saved
      render json: {id: attractor.id}
    else
      # TODO handle this on the frontend
      render json: {error: "Failed to save attractor"}
    end
  end

  private def attractor_params
    params.require(:attractor).permit(coefficients: [], startXy: [])
  end

  # Before filters
  # TODO: Should this be a session helper, instead of duplicating it here and in the users controller?
  private def logged_in_user
    unless logged_in?
      store_location
      flash[:danger] = "Please log in."
      request.xhr? ? render(json: {location: login_path}, status: 403) : redirect_to(login_url)
    end
  end
end
