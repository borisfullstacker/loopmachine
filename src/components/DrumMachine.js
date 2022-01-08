import React, { useState } from 'react'
import { Pad } from './Pad'
import { FaPause, FaPlay } from 'react-icons/fa';

import './style.css'

const DrumMachine = props => {

    const audio = ['1.mp3', '2.mp3', '3.mp3', '4.mp3', '5.mp3', '6.mp3', '7.mp3', '8.mp3', '9.mp3'];
    const [playback, setPlayback] = useState(false)


    const togglePlayback = () => {
        setPlayback(!playback);
    }
    
    return (
        <div className='main-container'>
            <div className='inner-container'>
                {
                    audio.map((sample, index) => (
                        <Pad key={index} path={'/assets/sound/' + sample} playback={playback} togglePlayback={togglePlayback}></Pad>
                    ))
                }
            </div>
            <div className='btn-container'>
            
                <button onClick={togglePlayback}>
                      {playback? <FaPause/>:<FaPlay/>}
                </button>

            </div>
        </div>

    )
}


export default DrumMachine
