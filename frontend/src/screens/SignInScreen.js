import { signin } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";

const SignInScreen = {
  after_render: () => {
    document
      .getElementById("singin-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        const data = await signin({
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
        });
        if (data.error) {
          alert(data.error);
        } else {
          setUserInfo(data);
          document.location.hash = "/";
        }
      });
  },
  render: () => {
    if (getUserInfo().name) {
      document.location.hash = "/";
    }
    return `
        <div class="form-container">
            <form id="singin-form">
                <ul class="form-items">
                    <li>
                        <h1>Sing-in</h1>
                    </li>
                    <li>
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" />
                    </li>
                    <li>
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" />
                    </li>
                    <li>
                        <button type="submit" class="primary"> Sign in </button>
                    </li>
                    <li>
                        <div>
                            New user?
                            <a href="/#/register">Create your account</a>
                        </div>
                    </li>
                </ul>
            </form>
        </div> 
        `;
  },
};

export default SignInScreen;