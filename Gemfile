source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.7.1'

gem 'rails', '~> 6.0.3'
gem 'bcrypt', '~> 3.1.13'
gem 'puma', '~> 4.3'
gem 'sass-rails', '~> 6'
gem 'webpacker', '~> 5.1.1'
gem 'turbolinks', '~> 5'
gem 'jbuilder', '~> 2.7'
gem 'bootsnap', '>= 1.4.2', require: false

gem 'react-rails', '~> 2.6.1'

gem 'will_paginate', '~> 3.3.0'
gem 'will_paginate-bootstrap4', '~> 0.2.2'

group :development, :test do
  gem 'byebug',  '~> 11.0.1', platforms: [:mri, :mingw, :x64_mingw]
  gem 'faker', '~> 2.11.0'
  gem 'sqlite3', '~> 1.4.1'
end

group :development do
  gem 'web-console',           '~> 4.0.1'
  gem 'listen', '~> 3.2'
  gem 'spring',                '~> 2.1.0'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

group :test do
  gem 'capybara',                 '~> 3.28.0'
  gem 'selenium-webdriver',       '~> 3.142.4'
  gem 'webdrivers',               '~> 4.1.2'
  gem 'rails-controller-testing', '~> 1.0.4'
  gem 'minitest',                 '~> 5.11.3'
  gem 'minitest-reporters',       '~> 1.3.8'
  gem 'guard',                    '~> 2.16.2'
  gem 'guard-minitest',           '~> 2.4.6'
end

group :production do
  gem 'pg', '1.1.4'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
# Uncomment the following line if you're running Rails
# on a native Windows system:
# gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
