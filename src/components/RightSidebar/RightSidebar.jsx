import React from 'react'
import { useState, useEffect } from 'react';
import './RightSidebar.css';
const RightSidebar = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Replace 'YOUR_API_KEY' with your actual News API key
  const apiKey = 'c47063394ba947e686f37dd5235731c8';

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`);
        const data = await response.json();
        const maxArticles = 3;
        if (data.status === 'ok') {
          const limitedArticles = data.articles.slice(0, maxArticles); // Limit articles using slice
          setArticles(limitedArticles.map((article) => ({
            ...article,
            truncatedTitle: article.title.split(' ').slice(0, 20).join(' ') // Truncate title to 10 words
          })));
        } else {
          setError(data.message || 'Failed to fetch news');
        }
      } catch (error) {
        setError('Network error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);


  return (
      <div className="news-container bg-slate-100">
        <p className="text-xl font-bold text-center my-2">LIVE</p>
        {isLoading && <p>Loading news...</p>}
        {error && <p className="error">{error}</p>}
        {articles.length > 0 && (
          <ul>
            {articles.map((article) => (
              <div className="my-4">
                <li className="flex justify-between px-2">
                  <div className="image"> <img src={article.urlToImage} alt={article.title}  /></div>
                 
                  
                  <h5 className="text-xs my-1 ml-4">{article.truncatedTitle}...</h5>
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    <button className="px-4 py-1 my-1 text-black text-s">➜</button></a>

                </li>
                {/* <li className="align-self-end"><a href={article.url} target="_blank" rel="noopener noreferrer">
                    <button className="px-4 py-1 my-1 text-black text-s"></button>
                  </a></li> */}
              </div>
            ))}
          </ul>
        )}
      </div>
  );
};

export default RightSidebar
