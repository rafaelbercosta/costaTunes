import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    isButtonDisabled: true,
    name: '',
    artist: '',
    loading: false,
    albuns: [],
  };

  handleChange = ({ target }) => {
    this.setState({ name: target.value }, () => {
      const { name } = this.state;
      const min = 2;
      const enableButton = name.length >= min;
      this.setState({
        isButtonDisabled: !enableButton,
      });
    });
  }

  search = async (event) => {
    event.preventDefault();
    const { name } = this.state;
    this.setState({ loading: true });
    const result = await searchAlbumsAPI(name);
    this.setState({
      artist: name,
      name: '',
      loading: false,
      albuns: result,
      isButtonDisabled: true,
      display: true,
    });
  }

  render() {
    const { name, isButtonDisabled, loading, display, albuns, artist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <p>Carregando...</p> : (
          <form>
            <label htmlFor="name">
              Artista/Banda
              <input
                data-testid="search-artist-input"
                name="name"
                value={ name }
                onChange={ this.handleChange }
                type="text"
              />
            </label>
            <button
              data-testid="search-artist-button"
              type="button"
              disabled={ isButtonDisabled }
              onClick={ this.search }
            >
              Pesquisar
            </button>

          </form>) }
        { display && (
          <div>
            <h3>
              Resultado de álbuns de:
              {' '}
              { artist }
            </h3>
            {albuns.length > 0 ? (
              <div>
                {albuns.map((album) => (
                  <div key={ album.collectionId }>
                    <div>
                      <Link
                        to={ `/album/${album.collectionId}` }
                        data-testid={ `link-to-album-${album.collectionId}` }
                      >
                        <img
                          src={ album.artworkUrl100 }
                          alt={ album.collectionName }
                        />
                      </Link>
                    </div>
                    <div className="space">
                      <div>{ album.collectionName }</div>
                      <div>{ album.artistName }</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <h4>Nenhum álbum foi encontrado</h4>
            )}
          </div>
        )}
      </div>
    );
  }
}
export default Search;
