import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';


const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false); // State untuk Tambah Produk
  const [currentProduct, setCurrentProduct] = useState({ id: '', nama: '', qty: '' });
  const [newProduct, setNewProduct] = useState({ nama: '', qty: '' }); // State untuk produk baru
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userID = localStorage.getItem('user');
  const [reload, setReload] = useState(false);


  useEffect(() => {
    if (!token) {
      navigate('/login'); // Jika tidak ada token, arahkan ke login
    } else {
      // Ambil data produk
      fetch(`${import.meta.env.VITE_APP_API_URL}products`, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.log(err));




    }
  }, [token, navigate, reload]);


  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data yang dihapus tidak dapat dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${import.meta.env.VITE_APP_API_URL}products/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.ok) {
            setProducts(products.filter((product) => product._id !== id));
            Swal.fire('Berhasil!', 'Produk telah dihapus.', 'success');

          } else {
            Swal.fire('Gagal!', 'Terjadi kesalahan saat menghapus produk.', 'error');
          }
        } catch (error) {
          Swal.fire('Error!', 'Tidak dapat terhubung ke server.', 'error');
        }

        setReload((prev) => !prev);
      }
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}_URL}products`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...newProduct,
        user: userID ? userID : 'Unknown', // Tambahkan user
      }),
    });

    if (response.ok) {
      const addedProduct = await response.json();
      setProducts([...products, addedProduct]);
      setNewProduct({ name: '', qty: '' });
      setIsAdding(false);
      setReload((prev) => !prev);
    } else {
      alert('Failed to add product');
    }
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setCurrentProduct({
      id: product._id, // Tetapkan ID ke properti id
      nama: product.nama,
      qty: product.qty,
    });

  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    console.log('Current Product Before Update:', currentProduct); // Debug di klien
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}products/${currentProduct.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...currentProduct,
        user: userID ? userID : 'Unknown', // Tambahkan user
      }),
    });

    if (response.ok) {
      const updatedProduct = await response.json();
      setProducts(
        products.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
      setIsEditing(false);
      setReload((prev) => !prev);
    } else {
      alert('Failed to update product');
    }
  };

  const handleChange = (e, isAddingForm = false) => {
    const { name, value } = e.target;
    if (isAddingForm) {
      setNewProduct((prev) => ({ ...prev, [name]: value }));
    } else {
      setCurrentProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-900 p-8">
        <h2 className="text-4xl font-extrabold text-white text-center mb-8">
          Dashboard Produk
        </h2>
        <div className="container mx-auto bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Daftar Produk</h3>
            <button
              onClick={() => setIsAdding(true)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
            >
              Tambah Produk
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-blue-100 p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              >
                <h4 className="text-lg font-bold">{product.nama}</h4>
                <p>Qty: {product.qty}</p>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleEdit(product)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {isAdding && (
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
          )}

          {isEditing && (
            <div className="mt-6 bg-white p-6 rounded-lg shadow-lg border border-gray-300">
              <h4 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                <span className="text-blue-500">
                  <i className="fas fa-edit"></i>
                </span>
                Edit Produk
              </h4>
              <form onSubmit={handleUpdate}>
                <div className="mb-4">
                  <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Produk
                  </label>
                  <input
                    type="text"
                    id="nama"
                    name="nama"
                    value={currentProduct.nama}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
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
                    value={currentProduct.qty}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                    placeholder="Masukkan jumlah produk"
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    className="w-full bg-red-500 text-white py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
                    onClick={() => setIsEditing(false)}
                  >
                    <i className="fas fa-times mr-2"></i>Batal
                  </button>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                  >
                    <i className="fas fa-check-circle mr-2"></i>Update Produk
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>


    </>


  );
};

export default Dashboard;
