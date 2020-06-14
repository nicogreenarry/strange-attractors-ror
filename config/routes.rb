Rails.application.routes.draw do
  root 'homepage#index'

  # Registration and auth
  resources :users
  get '/signup', to: 'users#new'
  post '/signup', to: 'users#create'

  # Static pages
  get '/about', to: 'static_pages#about'
  get '/what-are-strange-attractors', to: 'static_pages#what_are_strange_attractors'
end
