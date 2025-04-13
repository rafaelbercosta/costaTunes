import React from 'react';
import Header from './Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = {
    loading: false,
    favoriteSongs: [],
  };

  componentDidMount() {
    this.recover();
  }

  async handleCheckbox(music) {
    const { favoriteSongs } = this.state;
    if (favoriteSongs.some((song) => song.trackId === music.trackId)) {
      this.setState({ loading: true });
      await removeSong(music);
      const update = favoriteSongs
        .filter((e) => e.trackId !== music.trackId);
      return this.setState({
        loading: false,
        favoriteSongs: update,
      });
    }
  }

  async recover() {
    this.setState({ loading: true }, async () => {
      const receive = await getFavoriteSongs();
      this.setState({
        loading: false,
        favoriteSongs: receive,
      });
    });
  }

  render() {
    const { loading, favoriteSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div>
            <p>Músicas Favoritas</p>

            {favoriteSongs.map((music) => {
              const { trackId, img, trackName, previewUrl } = music;
              return (
                <div key={ trackId }>
                  <img
                    src={ img }
                    alt={ trackName }
                  />
                  <h3>{ trackName }</h3>
                  <audio data-testid="audio-component" src={ previewUrl } controls>
                    <track kind="captions" />
                    O seu navegador não suporta o elemento
                    <code>audio</code>
                  </audio>
                  <label htmlFor="favorites">
                    Favorita
                    <input
                      data-testid={ `checkbox-music-${trackId}` }
                      type="checkbox"
                      name="favorites"
                      id="favorites"
                      checked={ favoriteSongs.some(
                        (m) => m.trackId === trackId,
                      ) }
                      onChange={ () => this.handleCheckbox(music) }
                    />
                  </label>
                </div>
              );
            })}

          </div>
        )}
      </div>
    );
  }
}

export default Favorites;
