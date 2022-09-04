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
  const [sort, setSort] = useState('');
  const [rating, setRating] = useState(null);


  //function to get products -->
  const getProducts = async () => {
    fetch(`${API}/home`, {
      headers: {
        "Content-type": "application/json",
        "auth-token": token,
        "sort-price": sort,
        "rating": rating
      }
    })
      .then((result) => result.json())
      .then((data) => {
        //setting home products state

        console.log(sort)
        setHomeProducts(data); 
        //setting searched products state
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
  const [suggestedSearch, setSuggestedSearch] = useState(null);

  useEffect(() => {
       if(searchTerm.length > 0) {
        const suggestions = homeProducts.filter((products) => {
         return products.name.toLowerCase().includes(searchTerm);
         })
         setSuggestedSearch(suggestions);
       } else {
        setSuggestedSearch(null)
       }
       
  }, [searchTerm])

  const handleSearch = async (event, searchTerm) => {
    event.preventDefault();

    const result = await homeProducts.filter((sneaker) => sneaker.name.toLowerCase().includes(searchTerm));
    if (result) {
      setSearchedProducts(result);
      console.log(result);
    }
    setSearchTerm('');
  };


 //state for sorting
  
  //function to handle sort -->
  const handleSort = async (value) => {

    setSort(value);
    getProducts()    

  }

  //steps to add rating filter

  const getRatedProducts = async (number) => {
    try {
      const result = await fetch(`${API}/home/rating`, {
        method: 'POST',
        body: JSON.stringify({rating : number}),
        headers: {
          "Content-type": "application/json",
          "auth-token": token,
        }
      })

      const data = await result.json();

      setHomeProducts(data);

    } catch (error) {
      console.log(error);
    }
  }


  const handleRating = (e) => {
    console.log(e.target.value/20);
    const rating = Number(e.target.value/20)
    setRating(rating);
    getRatedProducts(rating);
  }

 
  return (
    <div className="home-page">
      <SideBar
        handleClick={handleClick}
        clicked={clicked}
        setClicked={setClicked} 
        sort={sort}
        handleSort={handleSort} 
        handleRating={handleRating}
        />
      <div className="search-product-area">
        <SearchBar handleSearch={handleSearch} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        {suggestedSearch !== null   ?      
        <div className="suggested-search">
        {suggestedSearch.slice(0,5).map((search) => {
          return <SuggestedSearchElm search={search} />
        }) }
        </div>
        : null
        }
        <ProductsList searchedProducts={searchedProducts} homeProducts={homeProducts} />
      </div>
    </div>
  );
}


function SuggestedSearchElm({search}) {

  const style = {
    marginTop: 0,
    marginBottom: '0.6rem',

  }

  const navigate = useNavigate();

  const handleClick = (id) => {
   navigate('/home/single-product/'+id)
  }

  return (
    <>
      <div >
      <h5 className="suggested-search-item" onClick={()=>handleClick(search._id)} style={style}>{search.name}</h5>
      </div>
    </>
  )

}
