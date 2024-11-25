import React from 'react'
import '../styles/PaymentForm.css';

const PaymentForm = () => {
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
                    <input type="text" name="name-on-card" />
                </div>
                <div className="payment-label-input">
                    <label htmlFor="cc-num">
                        Credit Card Number
                    </label>
                    <input type="text" name="cc-num" />
                </div>
                <div className="payment-label-input">
                    <div className="exp-wrapper">
                        <label htmlFor="expire">
                            Expiration Date
                        </label>
                        <input autoComplete="off" className="exp" id="month" maxLength="2" pattern="[0-9]*" inputMode="numerical" placeholder="MM" type="text" data-pattern-validate />
                        <input autoComplete="off" className="exp" id="year" maxLength="2" pattern="[0-9]*" inputMode="numerical" placeholder="YY" type="text" data-pattern-validate />
                    </div>
                    <div>
                        <label htmlFor="cvv">
                            CVV
                        </label>
                        <input type="text" name="cvv" />
                    </div>

                </div>
            </form>
        </div>
    );
}

export default PaymentForm;