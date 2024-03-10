import React, { useState, useEffect, useCallback, ReactNode } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { stressStatistics } from "../components/data/info-data";

const StressStatsDisplay = () => {
  const [items, setItems] = useState<{ id: string; title: string; percentage?: string; description: string; link?: string; citation?: string; doi?: string; }[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(() => {
    if (items.length >= stressStatistics.length) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      const newItems = stressStatistics.slice(items.length, items.length + 5);
      setItems(prevItems => [...prevItems, ...newItems]);
    }, 1500);
  }, [items]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>You have seen all the data!</b>
        </p>
      }
    >
      {items.map((item) => (
        <div key={item.id} className="p-4 mb-4 border-b border-black">
          <h2 className="text-xl font-semibold">{item.title}</h2>
          {item.percentage && <p className="text-lg">{item.percentage}</p>}
          <p>{item.description}</p>
          {item.citation && <cite>{item.citation}</cite>}
          {item.link && (
            <a
              href={item.link.toString()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Click for reference redirect
            </a>
          )}
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default StressStatsDisplay;
