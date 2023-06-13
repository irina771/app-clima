import React, { useState, useEffect } from "react";
import styles from "../styles/Search.module.css";
import axios from "axios";
import getApiInfo from "../helpers/getApiInfo";
const Search = ({ handleSubmit }) => {
  const [countries, setCountries] = useState([]);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(response.data);
      } catch (error) {}
    };

    loadCountries();
  }, []);

  const onSuggestHandler = async (text) => {
    setText(text);
    setSuggestions([]);

    try {
      const data = await getApiInfo(text);
      handleSubmit(data);
    } catch (error) {
      console.log(error.message);
    }
  };


  const onChangeHandler = (text) => {
    let matches = [];
    if (text.length > 0 && countries) {
      matches = countries.filter((country) => {
        const regex = new RegExp(`${text}`, "gi");
        return country.name.common.match(regex);
      });
    }
    setSuggestions(matches.slice(0, 5));
    setText(text);
  };

  return (
    <div className="flex flex-col items-center">
      <form
        action=""
        onSubmit={handleSubmit}
        className="w-full max-w-sm mt-6 flex"
      >
        <input
          className="appearance-none block w-full bg-white border border-gray-400 rounded py-1 px-2 mb-5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="text"
          onChange={(e) => onChangeHandler(e.target.value)}
          value={text}
          onBlur={() => {
            setTimeout(() => {
              setSuggestions([]);
            }, 1000);
          }}
          placeholder="Escribe el nombre de tu ciudad"
        />
        <button
          type="submit"
          className="bg-black bg-opacity-50 border-none rounded  mb-5 px-2 cursor-pointer transition duration-100"
        >
          🔍
        </button>
      </form>
      {suggestions.length > 0 && (
        <table className="w-full max-w-[80%] md:max-w-[34%] border border-gray-300 absolute mt-6 md:mt-10 lg:mt-14 lg:max-w-[30%]">
          <tbody>
            {suggestions.map((suggestion, index) => (
              <tr key={index}>
                <td
                  className={`border border-gray-300 py-1 px-3 ${styles.suggestion} bg-black bg-opacity-80 text-white`}
                  onClick={() => onSuggestHandler(suggestion.name.common)}
                >
                  {suggestion.name.common}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Search;
