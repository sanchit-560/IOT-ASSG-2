import { useState } from "react"
export const SearchBar = ({search})=>{
    const [query, setQuery] = useState("");
    const [brand, setBrand] = useState("");
    const [type, setType] = useState("");
    const handleSubmit = (e)=>{
       e.preventDefault()
       search({
         search: query,
         brand: brand,
         type: type
       })
    }
    return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center w-full my-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Search input bar */}
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What are you looking to drive today? ..."
              className="px-4 py-2 rounded-full focus:outline-none border border-gray-300 focus:border-[#00df9a] min-w-[300px]"/>
            <button type="submit" className="absolute top-1/2 right-3 transform -translate-y-1/2">
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