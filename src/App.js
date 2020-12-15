import { useEffect, useRef, useState } from 'react';
import './App.css';
import CurrencyRow from './components/CurrencyBlock';

const BASE_URL = 'https://api.frankfurter.app/latest';

function App() {
    const [currencyOptions, setCurrencyOptions] = useState([]);
    const [fromCurrency, setFromCurrency] = useState();
    const [toCurrency, setToCurrency] = useState();
    const [exchangeRate, setExchangeRate] = useState(0);
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
    const [fromAmount, setFromAmount] = useState(0);
    const [toAmount, setToAmount] = useState(0);
    const buttonRef = useRef();

    useEffect(() => {
        setFromCurrency('SELECT');
        setToCurrency('SELECT');
        setExchangeRate(0);
        fetch(BASE_URL)
            .then((res) => res.json())
            .then((data) => {
                setCurrencyOptions([
                    'SELECT',
                    data.base,
                    ...Object.keys(data.rates),
                ]);
            });
    }, []);

    const convertCurrency = () => {
        if (amountInFromCurrency) {
            setToAmount(fromAmount * exchangeRate);
        } else {
            setFromAmount(toAmount / exchangeRate);
        }
    };

    useEffect(() => {
        if (fromCurrency === 'SELECT' || toCurrency === 'SELECT') {
            buttonRef.current.disabled = true;
        } else if (fromCurrency === toCurrency) {
            buttonRef.current.disabled = false;
            setExchangeRate(1);
        } else if (fromCurrency !== null && toCurrency !== null) {
            buttonRef.current.disabled = false;
            fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
                .then((res) => res.json())
                .then((data) => setExchangeRate(data.rates[toCurrency]));
        }
    }, [fromCurrency, toCurrency]);

    const handleFromAmountChange = (e) => {
        setFromAmount(e.target.value);
        setAmountInFromCurrency(true);
    };
    const handleToAmountChange = (e) => {
        setToAmount(e.target.value);
        setAmountInFromCurrency(false);
    };

    return (
        <>
            <h1 className="glow">Currency Converter</h1>
            <div className="container">
                <div style={{ marginRight: 20 }}>
                    <CurrencyRow
                        currencyOptions={currencyOptions}
                        selectedCurrency={fromCurrency}
                        onChangeCurrency={(e) =>
                            setFromCurrency(e.target.value)
                        }
                        amount={fromAmount}
                        onChangeAmount={handleFromAmountChange}
                    />
                </div>
                <button
                    ref={buttonRef}
                    className="equals"
                    onClick={convertCurrency}
                >
                    =
                </button>
                <div style={{ marginLeft: 20 }}>
                    <CurrencyRow
                        currencyOptions={currencyOptions}
                        selectedCurrency={toCurrency}
                        onChangeCurrency={(e) => setToCurrency(e.target.value)}
                        amount={toAmount}
                        onChangeAmount={handleToAmountChange}
                        inverse
                    />
                </div>
            </div>
        </>
    );
}

export default App;
