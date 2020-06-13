class User < ApplicationRecord
  before_save { email.downcase! }
  validates :email,
            presence: true,
            length: { maximum: 255 },
            format: { with: /.+@.+/ },
            uniqueness: true
  validates :name, presence: true, length: { maximum: 255 }
  validates :password, presence: true, length: { minimum: 8 } # Maximum length is enforced by has_secure_password

  has_secure_password
end
