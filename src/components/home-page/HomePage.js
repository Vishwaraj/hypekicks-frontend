import { useParams } from "react-router-dom";
import { SideBar, SearchBar, ProductsList } from "./SideBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../../global";

export function HomePage() {
  const { category } = useParams();

  const [homeProducts, setHomeProducts] = useState([]);
  const [searchedProducts, setSearchedProducts] = useState(null);

  const token = window.localStorage.getItem('token');

  const getProducts = async () => {
    fetch(`${API}/home`, {
      headers: {
        "Content-type": "application/json",
        "auth-token": token 
      }
    })
      .then((result) => result.json())
      .then((data) => {
        setHomeProducts(data);
        setSearchedProducts(null);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const navigate = useNavigate();

  const getSpecificProducts = async (type) => {
    fetch(`${API}/home/${type}`, {
      headers: {
        "Content-type": "application/json",
        "auth-token": token 
      }
    })
      .then((result) => result.json())
      .then((data) => {
        console.log(data);
        setHomeProducts(data);
        setSearchedProducts(null);
      })
      .then(() => navigate("/home/" + type));
  };

  const [clicked, setClicked] = useState(false);

  const handleClick = async (event) => {
    let type = event.currentTarget.value;
    getSpecificProducts(type);
  };


  //search code
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (event, searchTerm) => {
    event.preventDefault();

    const result = await homeProducts.filter((sneaker) => sneaker.name.toLowerCase().includes(searchTerm));
    if (result) {
      setSearchedProducts(result);
      console.log(result);
    }
    setSearchTerm('');
  };

 
  return (
    <div className="home-page">
      <SideBar
        handleClick={handleClick}
        clicked={clicked}
        setClicked={setClicked} />
      <div className="search-product-area">
        <SearchBar handleSearch={handleSearch} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <ProductsList searchedProducts={searchedProducts} homeProducts={homeProducts} />
      </div>
    </div>
  );
}
