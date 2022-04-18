module Api
    module V1
        class ReviewsController < ApplicationController
            # protect_from_forgery with: :null_session
            
                def create
                    review = airline.reviews.new(reviews_params)
                    if review.save
                        render json: ReviewSerializer.new(review).serialized_json
                    else
                        render json: {errors: review.errors.messages} 
                    end
                end
                def destroy
                    review = Review.find(params[:id])
                    if review.destroy
                        head :no_content
                    else
                        render json: {errors: review.errors.messages} 
                    end
                end

                private
                def airline
                    @airline = Airline.find(params[:airline_id])
                end
                def reviews_params
                    params.require(:review).permit(:title, :description, :score, :airline_id)
                end
            end
        

    end
    
end