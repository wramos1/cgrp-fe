import React from 'react'
import '../styles/PaymentForm.css';

const PaymentForm = ({ setPaymentCard, paymentCard }) => {

    const formatCardNumber = (number) => {
        return number.replace(/(\d{4})(?=\d)/g, '$1 ');
    };

    const handleFieldChange = (field, value) => {
        const rawValue = value.replace(/\s/g, ''); // Remove spaces for validation
        const regex = /^\d*$/;
        if (field === 'cardNumber') {
            if (regex.test(rawValue) === true && rawValue.length <= 16) {
                setPaymentCard((prev) => ({
                    ...prev,
                    [field]: value
                }))
            }
        }
        else if (field === 'cvv') {
            if (regex.test(rawValue) && rawValue.length <= 4) {
                setPaymentCard((prev) => ({
                    ...prev,
                    [field]: value
                }))
            }
        }
        else if (field === 'nameOnCard') {
            setPaymentCard((prev) => ({
                ...prev,
                [field]: value
            }))
        }
        else {
            setPaymentCard((prev) => ({
                ...prev,
                [field]: value
            }))
        }
    }



    return (
        <div className="payment-form-section">
            <h1 className="payment-title">
                Payment Details
            </h1>

            <form className="payment-form">
                <div className="payment-label-input">
                    <label htmlFor="name-on-card">
                        Name on Card
                    </label>
                    <input
                        required
                        type="text"
                        name="name-on-card"
                        placeholder='John Doe'
                        maxLength={24}
                        onChange={(e) => handleFieldChange('nameOnCard', e.target.value)}
                        value={paymentCard['nameOnCard']}
                    />
                </div>
                <div className="payment-label-input">
                    <label htmlFor="cc-num">
                        Credit Card Number
                    </label>
                    <input
                        required
                        type="text"
                        name="cc-num"
                        maxLength={19}
                        placeholder="1234 5678 9012 3456"
                        onChange={(e) => handleFieldChange('cardNumber', e.target.value)}
                        value={formatCardNumber(paymentCard['cardNumber'])}
                    />
                </div>
                <div className="payment-label-input">
                    <div className="exp-wrapper">
                        <label htmlFor="expire">
                            Expiration Date
                        </label>
                        <div className="exp-selects">
                            <select
                                required
                                className="exp"
                                value={paymentCard['expiryMonth']}
                                placeholder="MM"
                                onChange={(e) => handleFieldChange('expiryMonth', e.target.value)}
                            >
                                <option
                                    value=""
                                    disabled
                                >
                                    MM
                                </option>
                                {[...Array(12)].map((_, index) => {
                                    const month = (index + 1).toString().padStart(2, '0');
                                    return (
                                        <option key={month} value={month}>
                                            {month}
                                        </option>
                                    );
                                })}
                            </select>
                            <select
                                required
                                className="exp"
                                value={paymentCard['expiryYear']}
                                onChange={(e) => handleFieldChange('expiryYear', e.target.value)}
                            >
                                <option
                                    value=""
                                    disabled
                                >
                                    YY
                                </option>
                                {[...Array(6)].map((_, index) => {
                                    const year = (24 + index).toString();
                                    return (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>

                    </div>
                    <div className='cvv-wrapper'>
                        <label htmlFor="cvv">
                            CVV
                        </label>
                        <input
                            required
                            maxLength={4}
                            placeholder="123"
                            type="text"
                            name="cvv"
                            value={paymentCard["cvv"]}
                            onChange={(e) => handleFieldChange('cvv', e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'e' || e.key === '+' || e.key === '-') {
                                    e.preventDefault();
                                }
                            }}
                        />
                    </div>

                </div>
            </form>
        </div>
    );
}

export default PaymentForm;