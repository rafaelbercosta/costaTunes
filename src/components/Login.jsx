import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state={
    isButtonDisabled: true,
    name: '',
    loading: 'false',
  };

  handleChange = ({ target }) => {
    this.setState({ name: target.value }, () => {
      const { name } = this.state;
      const min = 3;
      const enableButton = name.length >= min;
      this.setState({
        isButtonDisabled: !enableButton,
      });
    });
  }

  saveUser = async () => {
    const { name } = this.state;
    this.setState({ loading: true }, async () => {
      await createUser({ name });
      this.setState({ loading: false });
    });
  }

  render() {
    const { name } = this.state;
    const { isButtonDisabled } = this.state;
    const { loading } = this.state;

    return (
      <div data-testid="page-login">
        {loading === 'false' ? (
          <div>
            <label htmlFor="name">
              Login
              <input
                data-testid="login-name-input"
                type="text"
                name="name"
                value={ name }
                onChange={ this.handleChange }
              />
            </label>
            <button
              data-testid="login-submit-button"
              type="button"
              disabled={ isButtonDisabled }
              onClick={ this.saveUser }
            >
              Entrar

            </button>
          </div>
        ) : (
          <div>
            {loading === true ? (
              <h2> Carregando...</h2>
            ) : (
              <Redirect to="/search" />
            )}
          </div>

        )}

      </div>
    );
  }
}
export default Login;
