import { useState } from 'react';
import axios from 'axios';

export default function BlogGen() {
  const [activities, setActivities] = useState('');
  const [additionalContext, setAdditionalContext] = useState('');
  const [blogPost, setBlogPost] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(
        'https://7isz9rk4v4.execute-api.us-east-2.amazonaws.com/prod',
        {
          activities: activities.split('\n').filter(Boolean),
          additional_context: additionalContext
        }
      );
      
      setBlogPost(JSON.parse(response.data.body).blog_post);
    } catch (err) {
      setError('Failed to generate blog post. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container">
      <h1 style={{ textAlign: 'center' }}>AI Blog Generator</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="grid">
          <label htmlFor="activities">
            Daily Activities
            <textarea
              id="activities"
              value={activities}
              onChange={(e) => setActivities(e.target.value)}
              placeholder="Enter each activity on a new line..."
              rows="4"
              required
            />
          </label>
          
          <label htmlFor="context">
            Additional Context (optional)
            <textarea
              id="context"
              value={additionalContext}
              onChange={(e) => setAdditionalContext(e.target.value)}
              placeholder="Add any additional context or details..."
              rows="3"
            />
          </label>
        </div>
        
        <button
          type="submit"
          aria-busy={isLoading}
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Blog Post'}
        </button>
      </form>

      {error && (
        <article aria-label="Error message" style={{ 
          backgroundColor: '#ffebee',
          color: '#c62828',
          border: '1px solid #ef9a9a',
          marginTop: '1rem'
        }}>
          {error}
        </article>
      )}

      {blogPost && (
        <article style={{ marginTop: '2rem' }}>
          <h2>Generated Blog Post</h2>
          <div style={{ 
            backgroundColor: 'var(--card-background-color)',
            padding: '1rem',
            borderRadius: 'var(--border-radius)'
          }}>
            {blogPost.split('\n').map((paragraph, index) => (
              paragraph ? <p key={index}>{paragraph}</p> : null
            ))}
          </div>
        </article>
      )}
    </main>
  );
}
