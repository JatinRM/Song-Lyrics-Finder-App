import React, { useEffect } from 'react';
import { useState } from 'react';
import './SongInfo.css';

const SongInfo = ( {lyrics, loading, isError, song, artist} ) => {
	const [imageUrl, setImageUrl] = useState('');
	const [artistLink, setArtistLink] = useState('');
	const [isHover, setIsHover] = useState(true);

	useEffect ( () => {
		const fetchArtistImage = async() => {
			try {
				if(song && artist) {
					const imageLink = `https://api.vagalume.com.br/search.php?apikey=kulibfkbekfbek&art=${artist}&extra=artpic&nolyrics=1`;
					const response = await fetch(imageLink);
					const data = await response.json();
					setImageUrl(data.art.pic_medium);
				}
			} catch (error) {
				
			}

		}

		const fetchFromLastFm = async () => {
			try {
				const lastFmApi = 'be6e834888853da739b0cd53f66084d8';
				if (artist) {
					const lastFmLink = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=${lastFmApi}&format=json`
					const response = await fetch(lastFmLink);
					const data = await response.json();
					setArtistLink(data.artist.url);
				}
			} catch (error) {
				console.log('Error : ' + error)
			}
		}

		fetchArtistImage();
		fetchFromLastFm();
	}, [artist, song]);

	const mouseOver = () => {
		setIsHover(false);
	}

	const mouseOut = () => {
		setIsHover(true);
	}

	return (
		<div>
			<div className="gridContainer">
				<div className='showLyrics'>
					{loading ? <p>Loading....</p> : ''}
					<span className='lyricsText'>{lyrics}</span>
				</div>
				{isError ? '' :
					<>
						<div className="artistInfo">
							<div className="artistImage">
								<img src={imageUrl} alt="" />
							</div>
							<div className="showSong">
								<span> {song} </span>
								<a className='artistLink' href={artistLink}><span onMouseOver={mouseOver} onMouseOut={mouseOut}>{isHover? artist : 'Go to artist'}</span> </a>
							</div>
						</div>
					</>
				}

			</div>
		</div>
	)
}

export default SongInfo
