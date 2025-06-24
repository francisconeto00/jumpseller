module TimeFormatter
  extend ActiveSupport::Concern

  def format_time(value)
    value.is_a?(Time) ? value.strftime("%H:%M:%S") : value
  end
end
