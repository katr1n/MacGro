class CreateFeedbacks < ActiveRecord::Migration
  def change
    create_table :feedbacks do |t|
      t.string :name
      t.string :email
      t.string :phone
      t.string :ip, null: false, default: ''
      t.timestamps
    end
  end
end
