Rails.application.routes.draw do
  resources :feedbacks, only: :create
end
