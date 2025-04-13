import React from 'react';
import propTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends React.Component {
  state = {
    loading: false,
    isChecked: false,
  }

  componentDidMount() {
    this.checking();
  }

  favoriteChange = (trackId) => {
    this.setState((prevState) => ({
      isChecked: !prevState.isChecked,
    }), async () => {
      const { isChecked } = this.state;
      this.setState({ loading: true });
      if (isChecked) {
        // Adiciona a música aos favoritos
        await addSong(trackId);
      } else {
        // Remove a música dos favoritos
        await removeSong(trackId);
      }
      this.setState({ loading: false });
    });
  }

  async checking() {
    const { trackId } = this.props;
    const favoriteSongs = await getFavoriteSongs();
    const isFavorite = favoriteSongs.some((e) => e.trackId === trackId);
    if (isFavorite) {
      this.setState({
        isChecked: true,
      });
    }
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, isChecked } = this.state;

    return (
      <div>
        {loading ? (<p>Carregando...</p>
        ) : (
          <div>
            <h3>{ trackName }</h3>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
            <label htmlFor="favorite">
              Favorita
              <input
                type="checkbox"
                name="favorite"
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ () => this.favoriteChange(trackId) }
                checked={ isChecked }
              />
            </label>
          </div>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: propTypes.shape().isRequired,
  previewUrl: propTypes.string.isRequired,
  trackId: propTypes.number.isRequired,
};
