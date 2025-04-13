import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    user: {},
    loading: false,
  }

  componentDidMount() {
    this.recoverUser();
  }

  recoverUser = async () => {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ user, loading: false });
  }

  render() {
    const { user: { image, name, email, description }, loading } = this.state;
    return (
      <div>
        <Header />
        <Link to="/profile/edit">Editar perfil</Link>
        {loading ? <p>Carregando...</p> : (
          <div data-testid="page-profile">
            <h2> Perfil </h2>
            <div>
              <img data-testid="profile-image" src={ image } alt={ name } />
              <p>Nome</p>
              <p>{ name }</p>
              <p>Email</p>
              <p>{ email }</p>
              <p>Descrição</p>
              <p>{ description }</p>

            </div>
          </div>

        )}

      </div>
    );
  }
}

export default Profile;
