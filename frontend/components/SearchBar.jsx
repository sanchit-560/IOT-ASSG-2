import { useState,useEffect,useCallback } from "react"
import debounce from "lodash.debounce"; // using this package to introduce debounce functionality, which will limit the api calls

export const SearchBar = ({onSearch,onSubmit,clearSuggestions})=>{
    const [query, setQuery] = useState("");
    const [brand, setBrand] = useState("");
    const [type, setType] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    // so basically we are sending  on Search, onSubmit and clearSuggestions props to the parent component 

   // Debounced Search function
   const debouncedSearch = useCallback(
    debounce((query, brand, type) => {
      onSearch({ search: query, brand, type });
    }, 400),
    [onSearch]
  );
  
  // This will called whenever the query, brand or type changes and then  
  useEffect(() => {
    if(query.trim()!==""){
      debouncedSearch(query, brand, type);
    }
    else if(suggestions.length > 0){
      clearSuggestions();
    }
    return () => debouncedSearch.cancel();
  }, [query, brand, type, debouncedSearch, clearSuggestions, suggestions.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    debouncedSearch.flush();
    onSubmit({ search: query, brand, type }); 
  };
    return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center w-full mt-32 space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Search input bar */}
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What are you looking to drive today? ..."
              className="px-4 py-2 rounded-full focus:outline-none border border-gray-300 focus:border-[#00df9a] min-w-[400px]"/>
            <button type="submit" className="absolute top-1/2 right-3 transform -translate-y-1/2">
             🔍
            </button>
          </div>

          {/* DropDown menu for selecting brand type and car type */}
          <select value={brand} onChange={(e) => setBrand(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-[#00df9a]">
            <option value="">All Brands</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="BMW">BMW</option>
            <option value="Ford">Ford</option>
          </select>

          <select value={type} onChange={(e) => setType(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-[#00df9a]">
            <option value="">All Types</option>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Convertible">Convertible</option>
          </select>
        </div>
      </div>
    </form>
  );
}