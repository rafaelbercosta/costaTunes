import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

export default class Album extends React.Component {
  state = {
    musics: [],
    loading: true,
    artist: '',
    title: '',
    img: '',
  }

  componentDidMount() {
    this.searchMusics();
  }

  async searchMusics() {
    const { match: { params: { id } } } = this.props;
    const musicList = await getMusics(id);
    const { artistName, collectionName, url } = musicList[0];
    this.setState({
      musics: musicList,
      loading: false,
      artist: artistName,
      title: collectionName,
      img: url,
    });
  }

  render() {
    const { musics, loading, artist, img, title } = this.state;
    const trackList = musics.filter((music) => music.kind === 'song');

    return (
      <div data-testid="page-album">
        <Header />
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div>
            <section>
              <p data-testid="artist-name">{ artist }</p>
              <p data-testid="album-name">{ title }</p>
              <img src={ img } alt={ title } />
            </section>
            <section>
              { trackList.map((track) => {
                const { trackName, trackId, previewUrl } = track;
                return (
                  <MusicCard
                    key={ trackId }
                    trackId={ trackId }
                    trackName={ trackName }
                    previewUrl={ previewUrl }
                    musics={ musics }
                  />
                );
              })}
            </section>
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
