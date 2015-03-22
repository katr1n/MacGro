set :stage, :production
set :branch, 'master'
set :deploy_to, '/work/www/macgro.ru'
server '46.36.218.178', roles: [:web, :app, :db], user: 'd4mk0', primary: true