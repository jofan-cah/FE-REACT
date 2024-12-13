import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';
import AddProduct from '../components/AddProduct';
import EditProduct from '../components/EditProduct';
import Footer from '../components/Footer';


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
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}products`, {
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
      <div className=" bg-gradient-to-b from-blue-500 to-blue-900 p-6">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Dashboard Produk
        </h2>
        <div className="container mx-auto bg-white rounded-lg shadow-lg p-5 md:p-8">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h3 className="text-lg md:text-xl font-semibold">Daftar Produk</h3>
            <button
              onClick={() => setIsAdding(true)}
              className="px-3 md:px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
            >
              Tambah Produk
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-blue-100 p-3 md:p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                <h4 className="text-md md:text-lg font-bold">{product.nama}</h4>
                <p className="text-sm md:text-base">Qty: {product.qty}</p>
                <div className="mt-3 flex justify-between">
                  <button
                    onClick={() => handleEdit(product)}
                    className="px-2 md:px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="px-2 md:px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {isAdding && (
            <AddProduct
              newProduct={newProduct}
              handleChange={handleChange}
              handleAdd={handleAdd}
              setIsAdding={setIsAdding}
            />
          )}
          {isEditing && (
            <EditProduct
              currentProduct={currentProduct}
              handleChange={handleChange}
              handleUpdate={handleUpdate}
              setIsEditing={setIsEditing}
            />
          )}
        </div>
      </div>


    </>


  );
};

export default Dashboard;
