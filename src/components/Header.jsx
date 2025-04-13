import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
    state = {
      login: '',
      loading: false,
    }

    componentDidMount() {
      this.returnUser();
    }

    async returnUser() {
      this.setState({ loading: true }, async () => {
        const user = await getUser();
        this.setState({
          login: user.name,
          loading: false,
        });
      });
    }

    render() {
      const { login,
        loading } = this.state;
      return (
        <header data-testid="header-component">
          { loading ? <h1> Carregando...</h1>
            : (
              <h1 data-testid="header-user-name">{ login }</h1>
            )}
          <nav>
            <Link data-testid="link-to-search" to="/search">Pesquisar</Link>
            <Link data-testid="link-to-favorites" to="/favorites">Músicas favoritas</Link>
            <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
          </nav>
        </header>
      );
    }
}

export default Header;
