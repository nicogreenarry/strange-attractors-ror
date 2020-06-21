module ApplicationHelper
  def full_title(page_title = '')
    base_title = "Chaos Attractors"

    # Use concatenation instead of interpolation because the call to `provide` converts the string into a SafeBuffer
    # object instead of an ordinary string. Interpolating and inserting into a view template then over-escapes any
    # inserted HTML, so a title such as “Help’s on the way” would be converted to “Help&amp;#39;s on the way”.
    page_title.blank? ? base_title : page_title + " | " + base_title
  end
end
