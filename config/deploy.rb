# config valid only for current version of Capistrano
lock '3.3.5'

set :application, 'MacGro'
set :repo_url, 'git@github.com:katr1n/MacGro.git'

set :shared_path, "#{deploy_to}/shared"
set :unicorn_pid, "#{shared_path}/pids/unicorn.pid"
set :rails_env, "production"

set :linked_files, %w{ config/database.yml config/secrets.yml config/unicorn.rb }
set :linked_dirs, %w{ bin log tmp/pids tmp/cache tmp/sockets vendor/bundle }

namespace :deploy do
  after :publishing, :restart
  before :restart, :stop

  desc 'Start application'
  task :start do
    on roles(:app) do
      execute "cd #{current_path} && MAGICK_THREAD_LIMIT=1 RAILS_ENV=production ~/.rvm/bin/rvm default do bundle exec unicorn -Dc #{shared_path}/config/unicorn.rb -E production"
    end
  end

  desc 'Stop application'
  task :stop do
    on roles(:app) do
      execute "[ -f #{current_path}/tmp/pids/unicorn.pid ] && kill -QUIT `cat #{current_path}/tmp/pids/unicorn.pid`"
    end
  end

  desc 'Restart Application'
  task :restart do
    on roles(:app) do
    end
  end

  after :restart, :start
end
