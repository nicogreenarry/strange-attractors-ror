class CreateAttractors < ActiveRecord::Migration[6.0]
  def change
    create_table :attractors do |t|
      t.references :user, null: false, foreign_key: true
      # Dev uses sqlite, which doesn't support jsonb
      Rails.env.development? ? t.json(:details, null: false) : t.jsonb(:details, null: false)
      t.datetime :featured_at

      t.timestamps
    end

    add_index :attractors, [:user_id, :created_at]
  end
end
