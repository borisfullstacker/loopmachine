import React, { useEffect, useState, useRef } from 'react'
import Spinner from 'react-bootstrap/Spinner'

import './style.css'

export const Pad = ({ path, playback, togglePlayback }) => {

    const [audio, setAudio] = useState(new Audio(path))
    const [isPlaying, setPlay] = useState(false);
    const [initialLoader, showInitialLoader] = useState(true);
    const [musicLoader, showMusicLoader] = useState(false);
    const [volume, setVolume] = useState(0);


    const timeFunction = (e) => {
        const buffer = 0.30 // syncs audio tracks
        if (e.currentTarget.currentTime >= e.currentTarget.duration - buffer) {
            setTimeout(() => {
                setVolume(1)
                showMusicLoader(false)
                audio.removeEventListener('timeupdate', timeFunction);
            }, 10);
        }
    }

    const audioLoader = () => {
        showInitialLoader(false)
        audio.removeEventListener("canplaythrough", audioLoader);

    }

    useEffect(() => {
        audio.loop = true
        audio.addEventListener("canplaythrough", audioLoader);

    }, [])

    useEffect(() => {
        if (playback) {
            audio.play()
        } else {
            audio.pause()
        }
    }, [playback])

    useEffect(() => {
        if (isPlaying) {
            audio.volume = volume

        } else {
            audio.volume = 0
        }
    }, [volume])

    useEffect(() => {
        if (isPlaying) {
            audio.addEventListener('timeupdate', timeFunction);
            showMusicLoader(true)

        } else {
            setVolume(0)
            showMusicLoader(false)
        }
    }, [isPlaying])

    const followClick = () => {
        if (!initialLoader) {

            if (!playback) {
                togglePlayback(true)
            }
            setPlay(!isPlaying)
        }

    }

    return (
        <div className='pad' onClick={followClick}>
            {isPlaying && !musicLoader && <span className='play'>playing</span>}
            {!isPlaying && <span className='mute'>muted</span>}
            {(initialLoader || musicLoader) && <div className='spinner-container'><Spinner variant="secondary" animation="border" /></div>}
        </div>
    )
}
