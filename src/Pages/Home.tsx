import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SideBar from "./../Components/SideBar";

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
}

interface User {
  first_name: string;
  last_name: string;
  email: string;
  profile_image_url: string;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
  
    if (!token) {
      navigate("/");
    } else {
      axios
        .get("https://test1.focal-x.com/api/items", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => setProducts(response.data))
        .catch((err) => console.error(err));
  
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  }, [navigate]);

  return (
    <div className="flex flex-row w-full h-[100vh]">
      <div className="w-full grid grid-cols-5 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4">
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p className="text-sm text-gray-600">${product.price}</p>
            <img src={product.image_url} alt={product.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;