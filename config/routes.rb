Rails.application.routes.draw do
  root 'homepage#index'
  get 'signup', to: 'users#new'
  get '/about', to: 'static_pages#about'
  get '/what-are-strange-attractors', to: 'static_pages#what_are_strange_attractors'
end
