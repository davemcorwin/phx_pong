defmodule PhxPong.ChangesetHelpers do
  import Ecto.Changeset
  
  def put_map_change(changeset, model_field, map_field, fun) do
    map = Map.update!(get_field(changeset, model_field), map_field, fun)
    put_change(changeset, model_field, map)
  end
end
