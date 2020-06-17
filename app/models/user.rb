class User < ApplicationRecord
  attr_accessor :remember_token

  before_save { email.downcase! }
  validates :email,
            presence: true,
            length: { maximum: 255 },
            format: { with: /.+@.+/ },
            uniqueness: true
  validates :name, presence: true, length: { maximum: 255 }
  # Maximum password length is enforced by has_secure_password, so we don't need to specify it.
  validates :password, presence: true, length: { minimum: 8 }, allow_nil: true

  has_secure_password

  def self.digest(str)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST : BCrypt::Engine.cost
    BCrypt::Password.create(str, cost: cost)
  end

  def authenticated?(token)
    return false if remember_digest.nil?
    BCrypt::Password.new(remember_digest).is_password?(token)
  end

  def remember
    self.remember_token = SecureRandom.urlsafe_base64
    update_attribute(:remember_digest, User.digest(remember_token))
  end

  # Forgets a user's persistent session
  def forget
    update_attribute(:remember_digest, nil)
  end
end
