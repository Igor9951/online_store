'use client';

import { useEffect, useState } from 'react';
import addProduct from '../components/addProduct';
import { redirect } from 'next/navigation';
import { auth } from '../components/auth';
import { CldUploadButton, CldImage } from 'next-cloudinary';

export default function AdminPageClient({ categories }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [uploadedUrls, setUploadedUrls] = useState([]);

  useEffect(() => {
    async function authAdmin() {
      const checkAuth = await auth(true);
      if (!checkAuth) redirect('/');
    }
    authAdmin();
  }, []);

  const handleFileChange = async (e) => {
    const selected = Array.from(e.target.files || []);
    if (selected.length + uploadedUrls.length > 10) return;

    for (const file of selected) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) throw new Error('Помилка при завантаженні зображення');

        const data = await res.json();
        setUploadedUrls((prev) => [...prev, data.url]); // Cloudinary public_id
      } catch (err) {
        setError('❌ Помилка при завантаженні зображення');
      }
    }
  };

  const removeImage = (index) => {
    setUploadedUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const result = await addProduct({
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        categoryId: parseInt(categoryId),
        imageUrls: uploadedUrls,
      });

      if (result.success) {
        setSuccess(true);
        setName('');
        setDescription('');
        setPrice('');
        setStock('');
        setCategoryId('');
        setUploadedUrls([]);
      }
    } catch (err) {
      setError(err.message || 'Сталася помилка');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Додати товар</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Назва"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Опис"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Ціна"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Кількість на складі"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
          className="border p-2 rounded"
        >
          <option value="">Оберіть категорію</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

       <div className="flex flex-col gap-2">
  <label className="font-semibold">Фото товару (до 10)</label>

  <CldUploadButton
    uploadPreset="Product_photo" 
    options={{ maxFiles: 10 }}
    onSuccess={(result) => {
      if (result?.info?.public_id) {
        setUploadedUrls((prev) => [...prev, result.info.public_id]);
      }
    }}
    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
  >
    + Завантажити фото
  </CldUploadButton>

  {uploadedUrls.length > 0 && (
    <div className="grid grid-cols-3 gap-2 mt-4">
      {uploadedUrls.map((publicId, i) => (
        <div key={i} className="relative">
          <CldImage
            width="300"
            height="300"
            src={publicId}
            alt={`Фото товару ${i + 1}`}
            className="rounded object-cover"
          />
          <button
            type="button"
            onClick={() =>
              setUploadedUrls((prev) => prev.filter((_, idx) => idx !== i))
            }
            className="absolute top-0 right-0 text-white bg-black/50 p-1 rounded"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )}
</div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Додати
        </button>
      </form>

      {success && <p className="text-green-600 mt-2">✅ Товар додано!</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}