Rails.application.routes.draw do
  root 'homepage#index'
  get 'static_pages/about'
  get 'static_pages/what_are_strange_attractors'
end
