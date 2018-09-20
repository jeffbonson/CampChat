class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.text :content
      t.integer :from
      t.integer :to
      t.string :uuid
      t.timestamps
    end
  end
end


