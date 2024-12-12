import React from 'react';

const AddProduct = ({ newProduct, handleChange, handleAdd, setIsAdding }) => {
  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-lg border border-gray-300">
      <h4 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
        <span className="text-green-500">
          <i className="fas fa-plus-circle"></i>
        </span>
        Tambah Produk
      </h4>
      <form onSubmit={handleAdd}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nama Produk
          </label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={newProduct.nama}
            onChange={(e) => handleChange(e, true)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-300"
            placeholder="Masukkan nama produk"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="qty" className="block text-sm font-medium text-gray-700 mb-2">
            Jumlah Produk (Qty)
          </label>
          <input
            type="number"
            id="qty"
            name="qty"
            value={newProduct.qty}
            onChange={(e) => handleChange(e, true)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-300"
            placeholder="Masukkan jumlah produk"
            required
          />
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            className="w-full bg-red-500 text-white py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
            onClick={() => setIsAdding(false)}
          >
            <i className="fas fa-times mr-2"></i>Batal
          </button>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
          >
            <i className="fas fa-check-circle mr-2"></i>Tambah Produk
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
