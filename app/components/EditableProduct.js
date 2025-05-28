'use client'
import { deleteProduct, updateProductField} from '@/app/components/ProductAction';
import { useState } from 'react';
import dynamic from 'next/dynamic'
const ProductImageManager = dynamic(() => import('./ProductImageManager'), {
  ssr: true,
})

export default function EditableProduct({ product,categories}) {
  const [editingField, setEditingField] = useState(null);
  const [fieldValue, setFieldValue] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEditClick = (field, currentValue) => {
    setEditingField(field);
    setFieldValue(String(currentValue));
  };

  const handleSubmit = async (formData) => {
    const field = formData.get('field');
    const value = formData.get('value');
    await updateProductField(product.id, field, value);
    setEditingField(null);
  };

  const handleDelete = async () => {
    if (confirm('Підтвердити видалення товару?')) {
      setIsDeleting(true);
      await deleteProduct(product.id);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold">{product.name}</h1>

      {['name', 'description', 'price', 'stock'].map((field) => (
        <div key={field}>
          <label className="block text-gray-600">{field}</label>
          {editingField === field ? (
            <form action={handleSubmit} className="flex gap-2 mt-1">
              <input
                name="value"
                value={fieldValue}
                onChange={(e) => setFieldValue(e.target.value)}
                className="border px-2 py-1 w-full rounded"
              />
              <input type="hidden" name="field" value={field} />
              <button className="bg-green-600 text-white px-3 py-1 rounded">💾</button>
              <button
                type="button"
                onClick={() => setEditingField(null)}
                className="text-gray-500"
              >
                ✕
              </button>
            </form>
          ) : (
            <div className="flex justify-between items-center mt-1">
              <span>{String(product[field])}</span>
              <button
                onClick={() => handleEditClick(field, product[field])}
                className="text-blue-600 underline text-sm"
              >
                ✏️ редагувати
              </button>
            </div>
          )}
        </div>
      ))}

      {/* Категорія */}
      <div>
        <label className="block text-gray-600">Категорія</label>
        {editingField === 'categoryId' ? (
          <form action={handleSubmit} className="flex gap-2 mt-1">
            <select
              name="value"
              value={fieldValue}
              onChange={(e) => setFieldValue(e.target.value)}
              className="border px-2 py-1 rounded w-full"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <input type="hidden" name="field" value="categoryId" />
            <button className="bg-green-600 text-white px-3 py-1 rounded">💾</button>
            <button
              type="button"
              onClick={() => setEditingField(null)}
              className="text-gray-500"
            >
              ✕
            </button>
          </form>
        ) : (
          <div className="flex justify-between items-center mt-1">
            <span>{product.category.name}</span>
            <button
              onClick={() => handleEditClick('categoryId', product.categoryId)}
              className="text-blue-600 underline text-sm"
            >
              ✏️ редагувати
            </button>
          </div>
        )}
      </div>

      <ProductImageManager product={product} />

      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mt-4"
      >
        {isDeleting ? 'Видалення...' : '🗑 Видалити товар'}
      </button>
    </div>
  );
}