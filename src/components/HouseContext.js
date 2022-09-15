import React, { createContext, useState, useEffect } from "react";

// import data
import { housesData } from "../data";

// create context
export const HouseContext = createContext();

// provider
const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData);
  const [country, setCountry] = useState("Location (any)");
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState("Property type (any)");
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState("Price range (any)");
  const [loading, setLoading] = useState(false);
  const [month, setMonth] = useState("When (any)");

  useEffect(() => {
    // return all countries
    const allCountries = houses.map((house) => {
      return house.country;
    });

    // remove duplicates
    const uniqueCountries = ["Location (any)", ...new Set(allCountries)];

    // set countries state
    setCountries(uniqueCountries);
  }, []);

  useEffect(() => {
    // return only countries
    const allProperties = houses.map((house) => {
      return house.type;
    });

    // remove duplicates
    const uniqueProperties = ["Property type (any)", ...new Set(allProperties)];

    // set countries state
    setProperties(uniqueProperties);
  }, []);

  const handleClick = () => {
    setLoading(true);
    // check the string if includes '(any)'
    const isDefault = (str) => {
      return str.split(" ").includes("(any)");
    };

    // get first string (price) and parse it to number
    const minPrice = parseInt(price.split(" ")[0]);
    // get last string (price) and parse it to number
    const maxPrice = parseInt(price.split(" ")[2]);

    const newHouses = housesData.filter((house) => {
      const housePrice = parseInt(house.price);
      // all values are selected
      if (
        house.country === country &&
        house.type === property &&
        housePrice >= minPrice &&
        housePrice <= maxPrice &&
        house.month == month
      ) {
        return house;
      }
      // all values are default
      if (
        isDefault(country) &&
        isDefault(property) &&
        isDefault(price) &&
        isDefault(month)
      ) {
        return house;
      }
      // country is not default
      if (
        !isDefault(country) &&
        isDefault(property) &&
        isDefault(price) &&
        isDefault(month)
      ) {
        return house.country === country;
      }
      // property is not default
      if (
        !isDefault(property) &&
        isDefault(country) &&
        isDefault(price) &&
        isDefault(month)
      ) {
        return house.type === property;
      }
      // price is not default
      if (
        !isDefault(price) &&
        isDefault(country) &&
        isDefault(property) &&
        isDefault(month)
      ) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house;
        }
      }
      // month is not default
      if (
        !isDefault(month) &&
        isDefault(property) &&
        isDefault(country) &&
        isDefault(price)
      ) {
        return house.month === month;
      }
      // country and property is not default
      if (
        !isDefault(country) &&
        !isDefault(property) &&
        isDefault(price) &&
        isDefault(month)
      ) {
        return house.country === country && house.type === property;
      }
      // country and price is not default
      if (
        !isDefault(country) &&
        isDefault(property) &&
        !isDefault(price) &&
        isDefault(month)
      ) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.country === country;
        }
      }
      // country and month is not default
      if (
        !isDefault(country) &&
        !isDefault(month) &&
        isDefault(price) &&
        isDefault(property)
      ) {
        return house.country === country && house.month === month;
      }
      // property and price is not default
      if (isDefault(country) && !isDefault(property) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.type === property;
        }
      }
      // property and month is not default
      if (
        !isDefault(property) &&
        !isDefault(month) &&
        isDefault(price) &&
        isDefault(country)
      ) {
        return house.type === property && house.month === month;
      }
      // price and month is not default
      if (
        isDefault(country) &&
        isDefault(property) &&
        !isDefault(price) &&
        !isDefault(month)
      ) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.month === month;
        }
      }
      //one(country) is default
      if (
        isDefault(country) &&
        !isDefault(property) &&
        !isDefault(price) &&
        !isDefault(month)
      ) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.month === month && house.type === property;
        }
      }
      //one(price) is default
      if (
        !isDefault(country) &&
        !isDefault(property) &&
        isDefault(price) &&
        !isDefault(month)
      ) {
        return (
          house.month === month &&
          house.type === property &&
          house.country === country
        );
      }
      // one(property) is default
      if (
        !isDefault(country) &&
        isDefault(property) &&
        !isDefault(price) &&
        !isDefault(month)
      ) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.month === month && house.country === country;
        }
      }
      // month is default
      if (
        !isDefault(country) &&
        !isDefault(property) &&
        !isDefault(price) &&
        isDefault(month)
      ) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.type === property && house.country === country;
        }
      }
      // all are is not default
      if (
        !isDefault(country) &&
        !isDefault(property) &&
        !isDefault(price) &&
        !isDefault(month)
      ) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return (
            house.month === month &&
            house.type === property &&
            house.country === country
          );
        }
      }
      // all are is not default
      if (
        !isDefault(country) &&
        !isDefault(property) &&
        !isDefault(price) &&
        !isDefault(month)
      ) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return (
            house.month === month &&
            house.type === property &&
            house.country === country
          );
        }
      }
    });

    setTimeout(() => {
      return (
        newHouses.length < 1 ? setHouses([]) : setHouses(newHouses),
        setLoading(false)
      );
    }, 1000);
  };

  return (
    <HouseContext.Provider
      value={{
        country,
        setCountry,
        countries,
        property,
        setProperty,
        properties,
        price,
        setPrice,
        handleClick,
        houses,
        loading,
        month,
        setMonth,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
