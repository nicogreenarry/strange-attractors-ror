class User < ApplicationRecord
  before_save { email.downcase! }
  validates :email,
            presence: true,
            length: { maximum: 255 },
            format: { with: /.+@.+/ },
            uniqueness: true
  validates :name, presence: true, length: { maximum: 255 }
end
