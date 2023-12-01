import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { NumericFormat } from "react-number-format";

const baseURL =
  "https://v6.exchangerate-api.com/v6/cbf2b2fbd6dba4e42adbd5e7/latest/USD";

const options = [
  { value: "UAH", label: "UAH" },
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "PLN", label: "PLN" },
  { value: "GBP", label: "GBP" },
];

const Converter = () => {
  const [exchangeRates, setExchangeRates] = useState({
    UAH: 0,
    USD: 0,
    EUR: 0,
    PLN: 0,
    GBP: 0,
  });
  const [fromAmount, setFromAmount] = useState(1);
  const [toAmount, setToAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState(options[0]);
  const [toCurrency, setToCurrency] = useState(options[1]);

  const handleAmountChange = (e) => {
    if (e.target.name === "fromAmount") {
      setFromAmount(e.target.value);
    }

    if (e.target.name === "toAmount") {
      setToAmount(e.target.value);
    }
  };

  const handleFromCurrencyChange = (selectedOption) => {
    setFromCurrency(selectedOption);
  };

  const handleToCurrencyChange = (selectedOption) => {
    setToCurrency(selectedOption);
  };

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const { data } = await axios.get(baseURL);
        setExchangeRates({
          UAH: data.conversion_rates.UAH.toFixed(2),
          USD: data.conversion_rates.USD.toFixed(2),
          EUR: data.conversion_rates.EUR.toFixed(2),
          PLN: data.conversion_rates.PLN.toFixed(2),
          GBP: data.conversion_rates.GBP.toFixed(2),
        });
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchCurrencies();
  }, []);

  return (
    <main>
      <h1>Currency Converter</h1>

      <div>
        <label>
          <NumericFormat
            name="fromAmount"
            value={fromAmount}
            onChange={handleAmountChange}
            allowNegative={false}
            thousandSeparator=","
            decimalScale={2}
          />
        </label>
        <Select
          name="fromCurrency"
          options={options}
          value={fromCurrency}
          onChange={handleFromCurrencyChange}
        />
      </div>
      <div>
        <label>
          <NumericFormat
            name="toAmount"
            value={toAmount}
            onChange={handleAmountChange}
            allowNegative={false}
            thousandSeparator=","
            decimalScale={2}
          />
        </label>
        <Select
          name="toCurrency"
          options={options}
          value={toCurrency}
          onChange={handleToCurrencyChange}
        />
      </div>
    </main>
  );
};

export default Converter;
