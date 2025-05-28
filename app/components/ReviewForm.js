"use client";

import { useState } from "react";
import { addReview } from "./reviewAction";

export default function ReviewForm({ productId }) {
  const [status, setStatus] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      await addReview(productId, formData);
      setStatus("Успішно додано відгук!");
      window.location.reload();
    } catch (e) {
      setStatus("Помилка: не вдалося додати відгук");
    }
  };

  return (
    <form action={handleSubmit} className="space-y-2 mt-4">
      <textarea
        name="comment"
        className="w-full border p-2 rounded"
        placeholder="Ваш коментар"
        required
      />
      <select name="rating" defaultValue="5" className="border p-1 rounded">
        {[5, 4, 3, 2, 1].map((r) => (
          <option key={r} value={r}>
            {r} ⭐
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-1 rounded"
      >
        Надіслати
      </button>
      {status && <p className="text-sm text-green-600">{status}</p>}
    </form>
  );
}
