class AttractorsController < ApplicationController
  before_action :logged_in_user, only: [:create, :resize, :delete]
  before_action :admin_user, only: [:resize, :all_featured]

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

  # Admin-only routes
  def resize
  end

  # Gets all featured attractors (paginated)
  def featured
    attractors = Attractor.featured.paginate(page: params[:page], per_page: 12)
    render json: attractors.map { |a| a.slice('id', 'details') }
  end

  # Deletes a saved attractor
  def delete
    attractor = Attractor.find_by(id: params[:id])
    return render json: { success: true } unless attractor
    # TODO: This check would probably be better as a Before Filter
    unless attractor.user_id == current_user.id
      return render json: { success: false, message: "You can only delete attractors that belong to you"}
    end
    attractor.destroy
    render json: { success: true }
  end

  private def attractor_params
    params.require(:attractor).permit(coefficients: [], startXy: [])
  end
end
