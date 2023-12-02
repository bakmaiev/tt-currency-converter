import React, { useEffect, useState } from "react";
import Select from "react-select";
import { NumericFormat } from "react-number-format";
import { options } from "../../helpers/constants";
import { fetchData } from "../../api/fetchCurrencies";
import {
  StyledInput,
  StyledLabel,
  StyledMain,
  StyledSelect,
  StyledWrapper,
} from "./Converter.styled";

const Converter = () => {
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState(options[0]);
  const [toCurrency, setToCurrency] = useState(options[1]);
  const [exchangeRates, setExchangeRates] = useState(1);
  const [lastChanged, setLastChanged] = useState(null);

  const handleAmountChange = (e) => {
    const { value } = e.target;

    if (e.target.name === "fromAmount") {
      setFromAmount(value);
      setLastChanged("fromAmount");
    }

    if (e.target.name === "toAmount") {
      setToAmount(value);
      setLastChanged("toAmount");
    }
  };

  const handleFromCurrencyChange = (selectedOption) => {
    setFromCurrency(selectedOption);
  };

  const handleToCurrencyChange = (selectedOption) => {
    setToCurrency(selectedOption);
  };

  useEffect(() => {
    const fetchCurrencies = async (base, target) => {
      try {
        const data = await fetchData(base, target);
        setExchangeRates(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchCurrencies(fromCurrency.value, toCurrency.value);
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (lastChanged === "fromAmount") {
      setToAmount(fromAmount * exchangeRates);
    }

    if (lastChanged === "toAmount") {
      setFromAmount(toAmount / exchangeRates);
    }
  }, [exchangeRates, fromAmount, toAmount, lastChanged]);

  return (
    <StyledMain>
      <StyledWrapper>
        <div>
          <StyledLabel>
            <StyledInput
              name="fromAmount"
              value={fromAmount}
              onChange={handleAmountChange}
              allowNegative={false}
              decimalScale={2}
              placeholder="Enter amount"
            />
          </StyledLabel>
          <StyledSelect
            name="fromCurrency"
            options={options}
            value={fromCurrency}
            onChange={handleFromCurrencyChange}
          />
        </div>
        <div>
          <StyledLabel>
            <StyledInput
              name="toAmount"
              value={toAmount}
              onChange={handleAmountChange}
              allowNegative={false}
              decimalScale={2}
            />
          </StyledLabel>
          <StyledSelect
            name="toCurrency"
            options={options}
            value={toCurrency}
            onChange={handleToCurrencyChange}
          />
        </div>
      </StyledWrapper>
    </StyledMain>
  );
};

export default Converter;
