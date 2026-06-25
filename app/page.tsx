"use client";
import { useEffect, useState } from "react";

export default function Home() {
  type now_content = { section: string; content: string; updated_at: Date }[];
  const [data, setData] = useState<now_content>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/now", {
          next: { revalidate: 0 },
          cache: "no-cache",
        });
        const json = await res.json();
        if (!json.error) {
          setData(json);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    fetchData();
  }, []);
  console.log(data);
  return (
    <div className="m-auto text-center w-full">
      <h1 className="bg-green-300 text-3xl">{data[0]?.content}</h1>
      <p>{data[0]?.section}</p>
    </div>
  );
}
