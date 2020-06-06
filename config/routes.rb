Rails.application.routes.draw do
  get 'static_pages/about'
  root 'homepage#index'
end
