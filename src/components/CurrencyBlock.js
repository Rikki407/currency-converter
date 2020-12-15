import React from 'react';
import './CurrencyBlock.css';

const CurrencyBlock = ({
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    amount,
    onChangeAmount,
    inverse,
}) => {
    return (
        <div className={inverse ? 'currencyBlock inverse' : 'currencyBlock'}>
            <input
                type="number"
                className={inverse ? 'input inverse' : 'input'}
                value={amount}
                onChange={onChangeAmount}
            />
            <select
                value={selectedCurrency}
                onChange={onChangeCurrency}
                className={inverse ? 'inverse' : null}
            >
                {currencyOptions.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CurrencyBlock;
