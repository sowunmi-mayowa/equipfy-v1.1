import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { useGetEquipmentsByName } from "@/api/query";

const Spinner = ({ className = "h-4 w-4 mr-2" }) => (
  <svg
    className={className}
    viewBox="0 0 50 50"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="25"
      cy="25"
      r="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeDasharray="31.4 31.4"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 25 25"
        to="360 25 25"
        dur="0.9s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

const Search = ({ onSearch, onError }) => {
  const [text, setText] = useState("");
  const [loadingLocal, setLoadingLocal] = useState(false);

  // use the react-query hook to fetch by name; enable only when text.trim() is truthy
  const { data: hookData, isLoading } = useGetEquipmentsByName(text.trim());

  // normalize hookData whenever it changes and forward to parent via onSearch
  useEffect(() => {
    const arr = Array.isArray(hookData)
      ? hookData
      : hookData?.equipments || hookData?.data || [];
    // forward array
    onSearch?.(arr);
  }, [hookData]);

  useEffect(() => {
    setLoadingLocal(isLoading);
  }, [isLoading]);

  return (
    <div>
      <div className="relative border-[1px] border-black flex items-center h-10">
        <div className="flex items-center pl-3">
          {loadingLocal ? (
            <Spinner className="h-4 w-4 text-gray-500" />
          ) : (
            <FiSearch className="ml-1 text-gray-500" />
          )}
        </div>
        <input
          type="text"
          name="search"
          id="search"
          className="w-full outline-none placeholder:text-black placeholder:text-md placeholder:font-aeonik px-3"
          placeholder="Search Equipment"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
