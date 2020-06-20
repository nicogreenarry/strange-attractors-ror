class AttractorsController < ApplicationController
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

    render json: attractor.slice('id', 'details')
  end
end
