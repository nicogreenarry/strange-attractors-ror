class User < ApplicationRecord
  attr_accessor :remember_token, :password_reset_token

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

  has_many :attractors, dependent: :destroy

  def self.digest(str)
    # The password digest is created using bcrypt (via has_secure_password), so we’ll need to use
    # the same method for creating digests manually. The secure password source code uses:
    # `BCrypt::Password.create(string, cost: cost)` where string is the string to be hashed and cost
    # is the cost parameter that determines the computational cost to calculate the hash. Using a
    # high cost makes it computationally intractable to use the hash to determine the original
    # password, which is an important security precaution in a production environment, but in tests
    # we want the digest method to be as fast as possible. The secure password source code has a
    # line for this as well, which we'll use (below).
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST : BCrypt::Engine.cost
    BCrypt::Password.create(str, cost: cost)
  end

  def self.new_token
    SecureRandom.urlsafe_base64
  end

  def authenticated?(attribute, token)
    digest = send("#{attribute}_digest")
    return false unless digest.present?
    BCrypt::Password.new(digest).is_password?(token)
  end

  def remember
    self.remember_token = User.new_token
    update_attribute(:remember_digest, User.digest(remember_token))
  end

  # Forgets a user's persistent session
  def forget
    update_attribute(:remember_digest, nil)
  end

  def create_password_reset_digest
    self.password_reset_token = User.new_token
    update_columns(
      password_reset_digest: User.digest(password_reset_token),
      password_reset_sent_at: Time.zone.now,
    )
  end

  def send_password_reset_email
    UserMailer.password_reset(self).deliver_now
  end

  def password_reset_expired?
    password_reset_sent_at < 2.hours.ago
  end
end
