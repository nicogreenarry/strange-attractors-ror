Rails.application.routes.draw do
  root 'homepage#index'

  # Registration and auth
  resources :users
  get '/signup', to: 'users#new'
  post '/signup', to: 'users#create'
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  # Attractors
  get '/attractors/featured/random', to: 'attractors#random_featured'
  post '/attractors', to: 'attractors#create'
  # Admin-only routes
  get '/attractors/featured', to: 'attractors#featured'
  get '/attractors/resize', to: 'attractors#resize', as: 'resize_attractor'

  # Static pages
  get '/about', to: 'static_pages#about'
  get '/what-are-strange-attractors', to: 'static_pages#what_are_strange_attractors'
end
