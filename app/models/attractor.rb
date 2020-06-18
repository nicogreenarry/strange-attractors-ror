class Attractor < ApplicationRecord
  belongs_to :user
  validates :user_id, presence: true

  validates :details, presence: true
  validate :details_have_valid_parameters

  private def details_have_valid_parameters
    if details&.coefficients&.length != 12
      errors.add(:details, "must have 12 coefficients")
    end

    if details&.start_xy&.length != 2
      errors.add(:details, "must have 2 starting coordinates")
    end
  end
end
