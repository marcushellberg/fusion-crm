import { appState } from "Frontend/store/appstate";
import { customElement, html, internalProperty } from "lit-element";
import "@vaadin/vaadin-login/vaadin-login-form";
import { View } from "../view";

@customElement("login-view")
export class LoginView extends View {
  @internalProperty()
  private error = false;

  connectedCallback() {
    super.connectedCallback();
    this.classList.add(
      "v-flex",
      "v-flex-column",
      "v-items-center",
      "v-justify-center"
    );
  }

  render() {
    return html`
      <h1>Vaadin CRM</h1>
      <vaadin-login-form
        no-forgot-password
        @login=${this.login}
        .error=${this.error}
      >
      </vaadin-login-form>
      <b>Log in with: user/userpass</b>
    `;
  }

  async login(e: CustomEvent) {
    try {
      await appState.login(e.detail.username, e.detail.password);
    } catch (e) {
      this.error = true;
    }
  }
}