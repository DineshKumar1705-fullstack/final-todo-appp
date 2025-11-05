"use client";
import React, { useState, useEffect } from "react";
import styles from "@/app/articles/style.module.css";
import Link from "next/link";

type Article = {
  title: string;
  link: string;
  pubDate: string;
  description?: string;
  source_id?: string;
  image_url?: string;
  category?: string;
  sentiment?: string;
};

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [query, setQuery] = useState("india");
  const [loading, setLoading] = useState(false);
  const [isOn, setIsOn] = useState(false);

  useEffect(()=>{
    document.body.style.backgroundColor = isOn ? "black" : "white";
    document.body.style.color = isOn ? "white":"black;"
  },[isOn])

  const getNews = async (searchTerm: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://newsdata.io/api/1/latest?apikey=pub_0d57e28b401341848bd6a2b430233be5&q=${searchTerm}`
      );
      const data = await res.json();
      console.log("API Response:", data);
      console.log(res)

      if (data.status === "success" && Array.isArray(data.results)) {
        setArticles(data.results);
      } else {
        setArticles([]);
      }
    } catch (error) {
      console.error("Fetch failed:", error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNews(query);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() !== "") {
      getNews(query);
    }
  };

  return (
    <>
    <main className="p-8 w-[90%] mx-auto">
      <h1 className="text-3xl font-bold text-center text-red-500 mb-8">
        🗞️ Latest News
      </h1>
      <div className="flex justify-end">
          <input type="checkbox" id="toggle" className={styles.input} checked={isOn} onChange={() => setIsOn(!isOn)}/>
          <label htmlFor="toggle" className={styles.switch}></label>
          
      </div>

      <form
        onSubmit={handleSearch}
        className="flex justify-center items-center gap-3 mb-10"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Here"
          className="border border-gray-400 rounded-lg px-4 py-2 w-72 focus:outline-none focus:ring-2 focus:ring-blue-500 text-green-600"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      
      {loading ? (
        <p className="text-center text-gray-500">Loading news...</p>
      ) : articles.length === 0 ? (
        <p className="text-center text-gray-500">
          No news articles available for "{query}".
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-white border border-gray-300 rounded-xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col max-w-sm mx-auto h-full"
            >
              
              {article.image_url ? (
                <img
                  src={article.image_url}
                  alt="news"
                  className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image Available
                </div>
              )}

              <div className="p-4 flex flex-col justify-between flex-1">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-orange-700 mb-2 line-clamp-2">
                    {article.title}
                  </h2>

                  <p className="text-gray-700 text-sm mb-3 line-clamp-3">
                    {article.description || "No description available."}
                  </p>

                  <div className="text-sm text-gray-500 mb-2">
                    <p>
                       Source:{" "}
                      <span className="font-medium text-gray-700">
                        {article.source_id || "Unknown"}  
                      </span>
                    </p>
                    <p> {new Date(article.pubDate).toLocaleString()}</p>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {article.category && (
                      <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-md text-xs font-medium">
                        {article.category}
                      </span>
                    )}
                    {article.sentiment && (
                      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-md text-xs font-medium">
                        Sentiment: {article.sentiment}
                      </span>
                    )}
                  </div>
                </div>

                
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Read More →
                </a>
                
              </div>
            </div>
          ))}
        </div>
      )}
      {!loading&&
       <footer>
          <div className="bg-cyan-600 w-full border rounded mt-5">
              <div className="flex justify-center">
                <Link style={{background:'grey', padding:'2px', borderRadius:'5px', fontSize:'20px', textDecoration:'underline'}} href={`/feedback`}>Feed back</Link>
              </div>
              <h1 className="text-black flex justify-center ">Copyrights &copy; 2025</h1>
          </div>
      </footer>
}
    </main>
    
    

      </>
  );
}



