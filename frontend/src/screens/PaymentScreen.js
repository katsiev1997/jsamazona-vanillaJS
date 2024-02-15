import CheckoutSteps from "../components/CheckoutSteps";
import { getPayment, getUserInfo, setPayment } from "../localStorage";
import { hideLoading, showLoading, showMessage } from "../utils";

const PaymentScreen = {
  after_render: () => {
    document
      .getElementById("payment-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        setPayment({
          paymentMethod: document.querySelector("input[name='payment-method']:checked").value,
        });
        document.location.hash = "/placeorder";
      });
  },
  render: () => {
    const { name } = getUserInfo();
    if (!name) {
      document.location.hash = "/";
    }

    return `
    ${CheckoutSteps.render({ step1: true, step2: true, step3: true })}
        <div class="form-container">
            <form id="payment-form">
                <ul class="form-items">
                   <li>
                    <div>
                      <input type="radio" name="payment-method" id="paypal"" value="Paypal" checked />
                      <label for="paypal">PayPal</label>
                    </div>
                   </li>
                   <li>
                    <div>
                      <input type="radio" name="payment-method" id="stripe"" value="Stripe" />
                      <label for="stripe">Stripe</label>
                    </div>
                   </li>
                    <li>
                        <button type="submit" class="primary"> Continue </button>
                    </li>
                </ul>
            </form>
        </div> 
        `;
  },
};

export default PaymentScreen;
