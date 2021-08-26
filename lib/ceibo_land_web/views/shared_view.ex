defmodule CeiboLandWeb.SharedView do
  use CeiboLandWeb, :view

  def render_section(section_name, assigns \\ []) do
    render(__MODULE__, "sections/#{section_name}", assigns)
  end
end
