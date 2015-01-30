class FeedbacksController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def create
    Feedback.create feedback_params.merge(ip: request.remote_ip)

    respond_to do |format|
      format.js { render nothing: true, status: 201 }
    end
  end

  private

    def feedback_params
      params.require(:feedback).permit(:name, :email, :phone)
    end
end