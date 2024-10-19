"use client"

import { useEffect, useState } from "react"
import { ThumbsUp, ThumbsDown, Meh } from "lucide-react"
import Sentiment from 'sentiment'  // Assuming Sentiment.js is installed
import Navbar2 from "../components/Navbar/Navbar2"

export default function Review() {
  const [feedbacks, setFeedbacks] = useState([])
  const [totalSentimentScore, setTotalSentimentScore] = useState(null)

  const sentimentAnalyzer = new Sentiment()

  // Fetch feedback data from backend
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/feedback/getallfeedback");
        const data = await response.json();

        // Assuming data is an array of feedback objects
        const updatedFeedbacks = data.map((item, index) => ({
          id: index + 1, // or however you want to assign IDs
          description: item.message, // Append message from backend to description
          sentiment: null,
          score: null
        }));

        setFeedbacks(updatedFeedbacks);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  const analyzeSentiment = (id) => {
    setFeedbacks(feedbacks.map(feedback => {
      if (feedback.id === id) {
        const analysis = sentimentAnalyzer.analyze(feedback.description)
        const score = Math.max(Math.min(analysis.score, 5), -5) // Limit score between -5 and +5
        const sentiment = score === 0 ? 'neutral' : score > 0 ? 'positive' : 'negative'
        return { ...feedback, sentiment, score }
      }
      return feedback
    }))
  }

  const analyzeAll = () => {
    let totalScore = 0
    const updatedFeedbacks = feedbacks.map(feedback => {
      if (feedback.sentiment === null) {
        const analysis = sentimentAnalyzer.analyze(feedback.description)
        const score = Math.max(Math.min(analysis.score, 5), -5) // Limit score between -5 and +5
        const sentiment = score === 0 ? 'neutral' : score > 0 ? 'positive' : 'negative'
        totalScore += score
        return { ...feedback, sentiment, score }
      }
      totalScore += feedback.score || 0
      return feedback
    })
    setFeedbacks(updatedFeedbacks)
    setTotalSentimentScore(totalScore)
  }

  return (
    <div className="review-container">
      <Navbar2/>
      <h1 className="review-title">User Feedbacks</h1>
      <div className="feedback-list">
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className="feedback-card">
            <h2 className="feedback-user">Anonymous User</h2>
            <p className="feedback-description">{feedback.description}</p>
            <div className="feedback-actions">
              <button 
                className="btn btn-analyze" 
                onClick={() => analyzeSentiment(feedback.id)}
                disabled={feedback.sentiment !== null}
              >
                {feedback.sentiment === null ? 'Analyze Sentiment' : 'Analysis Complete'}
              </button>
              {feedback.sentiment && (
                <div className={`sentiment-result ${feedback.sentiment}`}>
                  {feedback.sentiment === 'positive' ? (
                    <ThumbsUp size={20} />
                  ) : feedback.sentiment === 'negative' ? (
                    <ThumbsDown size={20} />
                  ) : (
                    <Meh size={20} />
                  )}
                  <span>
                    {feedback.sentiment.charAt(0).toUpperCase() + feedback.sentiment.slice(1)} (Score: {feedback.score})
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="analyze-all-container">
        <button className="btn btn-analyze-all" onClick={analyzeAll}>
          Analyze All
        </button>
        {totalSentimentScore !== null && (
          <span className="total-score">Total Sentiment Score: {totalSentimentScore}</span>
        )}
      </div>

      <style jsx>{`
        .review-container {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }

        .review-title {
          color: #232F4B;
          font-size: 28px;
          margin-bottom: 20px;
          text-align: center;
        }

        .feedback-list {
          display: grid;
          gap: 20px;
        }

        .feedback-card {
          background-color: #fff;
          border-radius: 6px;
          box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
          padding: 20px;
          transition: transform 0.3s ease;
        }

        .feedback-card:hover {
          transform: translateY(-5px);
        }

        .feedback-user {
          color: #232F4B;
          font-size: 18px;
          margin-bottom: 10px;
        }

        .feedback-description {
          color: #666;
          margin-bottom: 15px;
          line-height: 1.6;
        }

        .feedback-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .btn {
          background: linear-gradient(270deg, rgba(239, 95, 52, .75), #E34212);
          color: #fff;
          border: none;
          padding: 10px 15px;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.3s ease;
          font-size: 14px;
        }

        .btn:hover:not(:disabled) {
          background: linear-gradient(270deg, #E34212, rgba(239, 95, 52, .75));
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .sentiment-result {
          display: flex;
          align-items: center;
          gap: 5px;
          font-weight: bold;
        }

        .sentiment-result.positive {
          color: #4CAF50;
        }

        .sentiment-result.negative {
          color: #F44336;
        }

        .sentiment-result.neutral {
          color: #FFC107;
        }

        .analyze-all-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          margin-top: 30px;
        }

        .total-score {
          font-size: 18px;
          color: #232F4B;
        }

        @media screen and (max-width: 600px) {
          .review-container {
            padding: 10px;
          }

          .feedback-card {
            padding: 15px;
          }

          .feedback-actions {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
