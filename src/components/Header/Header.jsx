import React, { useEffect, useState } from "react";
import { fetchData } from "../../api/fetchCurrencies";
import { StyledHeader, StyledRatesWrapper } from "./Header.styled";

const Header = () => {
  const [usdToUah, setUsdToUah] = useState(null);
  const [eurToUah, setEurToUah] = useState(null);

  useEffect(() => {
    const fetchActualData = async () => {
      try {
        const usdResponce = await fetchData("USD", "UAH");
        setUsdToUah(usdResponce.toFixed(2));

        const eurToUah = await fetchData("EUR", "UAH");
        setEurToUah(eurToUah.toFixed(2));
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchActualData();
  }, []);

  return (
    <StyledHeader>
      <h1>Currency Converter</h1>
      <StyledRatesWrapper>
        <span>USD to UAH: {usdToUah}</span>
        <span>EUR to UAH: {eurToUah}</span>
      </StyledRatesWrapper>
    </StyledHeader>
  );
};

export default Header;
