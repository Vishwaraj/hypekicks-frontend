import { useParams } from "react-router-dom";
import { SideBar, SearchBar, ProductsList } from "./SideBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../../global";

export function HomePage() {

  //to get category from url params
  const { category } = useParams();

  //state for fetched products -->
  const [homeProducts, setHomeProducts] = useState([]);
  const [searchedProducts, setSearchedProducts] = useState(null);

  
  //getting the token 
  const token = window.localStorage.getItem('token');


  //function to get products -->
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


  //function to get specific products -->
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

  
  //state to disable button after clicking -->
  const [clicked, setClicked] = useState(false);

  //button value used to get specific products -->
  const handleClick = async (event) => {
    let type = event.currentTarget.value;
    getSpecificProducts(type);
  };


  //search code -->
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
