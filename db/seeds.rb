# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

# Create a main sample user.
User.create!(
  name: "Example User",
  email: "example@fakeurl12345678987654.org",
  password: "foobarbaz",
  password_confirmation: "foobarbaz"
)

# Generate a bunch of additional users.
99.times do |n|
  name  = Faker::Name.name
  email = "example-#{n+1}@fakeurl12345678987654.org"
  password = "password"
  User.create!(
    name: name,
    email: email,
    password: password,
    password_confirmation: password
  )
end
