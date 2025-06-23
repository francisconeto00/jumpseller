require "test_helper"

class Api::SunEventsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_sun_events_index_url
    assert_response :success
  end
end
