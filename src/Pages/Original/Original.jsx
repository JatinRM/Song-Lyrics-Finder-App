import React, { useState, useRef, useEffect } from 'react';
import './Original.css';
import SongInfo from '../SongInfo/SongInfo';


const Original = () => {
	const [song, setSong] = useState();
	const [artist, setArtist] = useState();
	const [lyrics, setLyrics] = useState('');
	const [loading, setLoading] = useState(false);
	const [isError, setIsError] = useState(true);
	const songRef = useRef(null);
	const artistRef = useRef(null);

	useEffect(() => {
		const fetchData = async () => {
			if (song && artist) {
				setLoading(true);
				const link = `https://api.vagalume.com.br/search.php?apikey=660a4395f992ff67786584e238501aa&art=${artist}&mus=${song}`;
				try {
					const response = await fetch(link);
					const data = await response.json();
					if (data.mus[0].text) {
						let lyricsText = data.mus[0].text;
						let lyricsLines = lyricsText.split('\n')
						if (lyricsLines[0] && lyricsLines[0].includes('Paroles de')) {
							lyricsLines.shift();
						}
						lyricsText = lyricsLines.join('\n')
						setLyrics(lyricsText)
						setIsError(false)

					} else {
						setLyrics('Lyrics not found.');
					}
				} catch (error) {
					setLyrics('Error fetching lyrics.');
					console.error('Error:', error);
				}
				finally {
					setLoading(false);
				}
			}

		};

		fetchData();
	}, [song, artist])

	const submitAction = () => {
		const artistValue = artistRef.current.value.split(' ').map(word =>
			word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
		).join(' ');
		const songValue = songRef.current.value
		setSong(songValue)
		setArtist(artistValue)
	}


	const handleSubmit = () => {
		submitAction();
	}

	const handleKeyPress = (event) => {
		if (event.key === 'Enter' && songRef.current.value && artistRef.current.value) {
			submitAction();
		}
	}

	return (
		<div>

			<div className={song && artist ? 'container cont1' : 'container cont2'} id='box'>
				<div className="songBox">
					<input onKeyDown={handleKeyPress} className='song' ref={songRef} placeholder='Song' type="text" />
				</div>
				<div className="artistBox">
					<input onKeyDown={handleKeyPress} className='artist' ref={artistRef} placeholder='Artist' type="text" />
				</div>
			</div>
			<div className="buttonBox">
				<button className='submitBtn' onClick={handleSubmit}>Submit</button>
			</div>
			
			<SongInfo lyrics={lyrics} 
				loading={loading} 
				isError={isError} 
				song={song}
				artist={artist} />
		</div>
	)
}

export default Original
