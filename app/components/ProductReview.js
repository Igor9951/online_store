"use client";

import { useEffect, useState } from "react";
import { getProductReviews } from "./reviewAction";

export default function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await getProductReviews(productId);
      setReviews(data);
    };
    load();
  }, [productId]);

  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-lg font-semibold">Відгуки ({reviews.length})</h3>

      {reviews.length === 0 ? (
        <p className="text-sm text-gray-500">Ще немає відгуків.</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="border rounded p-4">
            <div className="flex items-center gap-2 mb-2">
              <p className="text-sm font-medium">{review.user.name}</p>
              <StarRow rating={review.rating} />
            </div>
            <p className="text-sm">{review.comment || "Без коментаря"}</p>
            <p className="text-xs text-gray-400 mt-1">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

// Показати рейтинг у вигляді зірочок
function StarRow({ rating }) {
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.462a1 1 0 00-.364 1.118l1.286 3.974c.3.921-.755 1.688-1.54 1.118l-3.39-2.462a1 1 0 00-1.176 0l-3.39 2.462c-.784.57-1.838-.197-1.539-1.118l1.285-3.974a1 1 0 00-.364-1.118L2.049 9.4c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.951-.69l1.286-3.974z" />
        </svg>
      ))}
    </div>
  );
}
