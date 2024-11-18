const PaymentForm = () => {
    return (
        <div className="payment-form-section">
            <h1 className="payment-title">
                Payment Details
            </h1>

            <form className="payment-form">
                <div className="name-on-card">
                    <label htmlFor="name-on-card">
                        Name on Card
                    </label>
                    <input type="text" name="name-on-card" />
                </div>
                <div className="cc-number">
                    <label htmlFor="cc-num">
                        Credit Card Number
                    </label>
                    <input type="text" name="cc-num" />
                </div>
                <div className="cv-exp">
                    <label htmlFor="expire">
                        Expiration Date
                    </label>
                    <input type="text" name="expire" />
                    <label htmlFor="cvv">
                        CVV
                    </label>
                    <input type="text" name="cvv" />
                </div>
            </form>
        </div>
    );
}

export default PaymentForm;