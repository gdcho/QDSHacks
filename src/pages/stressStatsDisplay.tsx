import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { stressStatistics } from '../components/data/info-data';

const StressStatsDisplay = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchData(); 
  }, []);

  const fetchData = () => {
    if (items.length >= stressStatistics.length) {
      setHasMore(false);
      return;
    }

    // Simulate an API call
    setTimeout(() => {
      const newItems = stressStatistics.slice(items.length, items.length + 5);
      setItems([...items, ...newItems]);
    }, 1500); 
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>You have seen all the data!</b>
        </p>
      }
    >
      {items.map((item) => (
  <div 
    key={item.id} 
    className="p-4 mb-4 border-b border-black" // This adds a bottom border to each item
  >
    <h2 className="text-xl font-semibold">{item.title}</h2>
    {item.percentage && <p className="text-lg">{item.percentage}</p>}
    <p>{item.description}</p>
    {item.citation && <cite>{item.citation}</cite>}
    {item.link && (
      <a href={item.link} target="_blank" rel="noopener noreferrer">Click for reference redirect</a>
    )}
  </div>
))}

    </InfiniteScroll>
  );
};

export default StressStatsDisplay;
