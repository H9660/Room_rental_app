import React, { createContext, useState, useEffect } from "react";

// import data
import { housesData } from "../data";

// create context
export const HouseContext = createContext();

// provider
const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData);
  // for the locations
  const [country, setCountry] = useState("Location (any)");
  const [countries, setCountries] = useState([]);

  // for the dates
  const [date, setDate] = useState("Move in date (any)");
  const dates = [
    "Move in date (any)",
    "Jan-2023",
    "Feb-2023",
    "Mar-2023",
    "Apr-2023",
    "May-2023",
    "Jun-2023",
    "Jul-2023",
    "Aug-2023",
    "Sep-2023",
    "Oct-2023",
    "Nov-2023",
    "Dec-2023",
  ];

  // for the property type
  const [property, setProperty] = useState("Property type (any)");
  const [properties, setProperties] = useState([]);

  // for the prices
  const [price, setPrice] = useState("Price range (any)");

  const [loading, setLoading] = useState(false); // to load the webpage

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

  useEffect(() => {
    // return only countries
    const alldates = houses.map((house) => {
      return house.date;
    });

    // set countries state
  }, []);
  // for the move in date

  // // remove duplicates
  // const uniqueProperties = ["Property type (any)", ...new Set(allProperties)];

  // // set countries state

  const handleClick = () => {
    // this
    setLoading(true);
    // check the string if includes '(any)'
    const isDefault = (str) => {
      // is the defauklt value is selected
      return str.split(" ").includes("(any)");
    };

    // get first string (price) and parse it to number
    const minPrice = parseInt(price.split(" ")[0]);
    // get last string (price) and parse it to number
    const maxPrice = parseInt(price.split(" ")[2]);

    // const date=houses.date;
    const newHouses = housesData.filter((house) => {
      const housePrice = parseInt(house.price);
      const housedate = house.date;
      // all values are selected
      if (
        house.country === country &&
        house.date == housedate &&
        house.type === property &&
        housePrice >= minPrice &&
        housePrice <= maxPrice
      ) {
        return house;
      }

      // *************************THE ACTUAL SEARCHING LOGIC***********************

      // all values are default
      if (
        isDefault(country) &&
        isDefault(property) &&
        isDefault(price) &&
        isDefault(date)
      ) {
        return house;
      }
      // country is not default
      if (
        !isDefault(country) &&
        isDefault(property) &&
        isDefault(price) &&
        isDefault(date)
      ) {
        return house.country === country;
      }
      // date is not default
      if (
        !isDefault(date) &&
        isDefault(country) &&
        isDefault(property) &&
        isDefault(price)
      ) {
        return house.date === date;
      }
      // property is not default
      if (
        !isDefault(property) &&
        isDefault(country) &&
        isDefault(price) &&
        isDefault(date)
      ) {
        return house.type === property;
      }
      // price is not default
      if (
        !isDefault(price) &&
        isDefault(country) &&
        isDefault(property) &&
        isDefault(date)
      ) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house;
        }
      }

      // country and date is not default
      if (
        !isDefault(country) &&
        isDefault(property) &&
        isDefault(price) &&
        !isDefault(date)
      ) {
        if (house.date === date) {
          return house.country === country;
        }
      }
      // country and property is not default
      if (
        !isDefault(country) &&
        !isDefault(property) &&
        isDefault(price) &&
        isDefault(date)
      ) {
        return house.country === country && house.type === property;
      }
      // country and price is not default
      if (
        !isDefault(country) &&
        isDefault(property) &&
        !isDefault(price) &&
        isDefault(date)
      ) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.country === country;
        }
      }

      // date and property is not default
      if (
        isDefault(country) &&
        !isDefault(property) &&
        isDefault(price) &&
        !isDefault(date)
      ) {
        return house.date === date && house.type === property;
      }
      // date and price is not default
      if (
        isDefault(country) &&
        isDefault(property) &&
        !isDefault(price) &&
        !isDefault(date)
      ) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.date === date;
        }
      }

      // property and price is not default
      if (
        isDefault(country) &&
        !isDefault(property) &&
        !isDefault(price) &&
        isDefault(date)
      ) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.type === property;
        }
      }

      // now handling 3 cases at a time

      // country, date and property not default
      if (
        !isDefault(country) &&
        !isDefault(property) &&
        !isDefault(date) &&
        isDefault(price)
      ) {
        return (
          house.type === property &&
          house.country === country &&
          house.date === date
        );
      }

      // country, date and price not default
      if (
        !isDefault(country) &&
        isDefault(property) &&
        !isDefault(date) &&
        !isDefault(price)
      ) {
        if (housePrice >= minPrice && housePrice <= maxPrice)
          return house.country === country && house.date === date;
      }

      // country, property, price not default

      if (
        !isDefault(country) &&
        !isDefault(property) &&
        isDefault(date) &&
        !isDefault(price)
      ) {
        if (housePrice >= minPrice && housePrice <= maxPrice)
          return house.type === property && house.date === date;
      }

      // date, property and price not default
      if (
        isDefault(country) &&
        !isDefault(property) &&
        !isDefault(date) &&
        !isDefault(price)
      ) {
        if (housePrice >= minPrice && housePrice <= maxPrice)
          return house.type === property && house.date === date;
      }

    
    });

    setTimeout(() => {
      return (
        newHouses.length < 1 ? setHouses([]) : setHouses(newHouses),
        setLoading(false)
      );
    }, 1000); // control the spinning wheel on loading
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
        date,
        setDate,
        dates,
        price,
        setPrice,
        handleClick,
        houses,
        loading,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
