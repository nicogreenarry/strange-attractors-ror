Rails.application.routes.draw do
  get 'static_pages/about'
  get 'static_pages/what_are_strange_attractors'
  root 'homepage#index'
end
