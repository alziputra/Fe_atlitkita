import { FaSearch } from "react-icons/fa";
import PropTypes from "prop-types";

const Search = ({ searchQuery, onSearchChange, placeholder }) => {
  return (
    <div className="relative w-full max-w-xs">
      <span className="absolute inset-y-0 left-0 pl-2 flex items-center text-gray-400">
        <FaSearch />
      </span>
      <input
        type="text"
        className="input input-sm pl-8 border-2 border-black w-full bg-[#F5F5DC] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
        placeholder={placeholder}
        value={searchQuery}
        onChange={onSearchChange}
      />
    </div>
  );
};

Search.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default Search;
