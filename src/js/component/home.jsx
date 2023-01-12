import React, { useState, useEffect, useRef } from "react";

// include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

// create your first component
const Home = () => {
  const [playList, setplayList] = useState([]);
  const reproductor = useRef();
  let playButton = useRef();
  let pauseButton = useRef();
  let [posicionMusica, setPosicionMusica] = useState(0);

  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/sound/songs")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        return setplayList(data);
      });
  }, []);

  function seleccionarMusica(url) {
    reproductor.current.src = `https://assets.breatheco.de/apis/sound/${url}`;

    // reproductor.current.play();
	play();
  }

  function cambiarIcono() {
    if (reproductor.current.pause) {
		reproductor.current.play();
      setvalorIcono("fafa-pause");
    } else {
		reproductor.current;
    }
  }

  function atras() {
	if (posicionMusica >0) 
   { setPosicionMusica(posicionMusica--);}
	const url = playList[posicionMusica].url;
    reproductor.current.src = `https://assets.breatheco.de/apis/sound/${url}`;
    // reproductor.current.play();
	play()
  }
  function adelante() {
    setPosicionMusica(posicionMusica++);
	const url = playList[posicionMusica].url;
    reproductor.current.src =  `https://assets.breatheco.de/apis/sound/${url}`;
    // reproductor.current.play();
play()  
}


const subirVolumen = () => {
  reproductor.current.volume += 0.10;
}
const bajarVolumen = () => {
  reproductor.current.volume -= 0.10;

}


  const play = () => {
    reproductor.current.play();
	playButton.current.style.display='none';
	pauseButton.current.style.display = 'block';
  }

  const pause = () => {
    reproductor.current.pause();
	playButton.current.style.display='block';
	pauseButton.current.style.display = 'none';
  }
  return (
    <div className="container-text-center">
      <ul className="list-group group-flash mb-3">
        {playList.map((song) => (
          <button
            className="btn btn-dark text-start rounded-0"
            type="button"
            onClick={() => seleccionarMusica(song.url)}
            key={song.id}
          >
            {song.id}
            {song.name}-
          </button>
        ))}{" "}
      </ul>

      <div className="d-flex justify-content-center bg-secondary fixed-bottom">
        <button onClick={atras}>
          <i
            className="fa fa-backward mx-2"
            style={{
              widgh: "50%",
              height: "25%",
            }}
          ></i>
        </button>
        <button onClick={play} ref={playButton}>
          <i
            className="fa fa-play rounded"
            style={{
              widgh: "50%",
              height: "25%",
            }}
          ></i>
        </button>
		<button onClick={pause} ref={pauseButton} style={{display:'none'}}>
          <i
            className="fa fa-pause"
            style={{
              widgh: "50%",
              height: "25%"
            }}
          ></i>
        </button>
        <audio id="reproductor" ref={reproductor}></audio>
        <button onClick={adelante}>
          <i
            className=" fa fa-forward mx-2"
            style={{
              widgh: "50%",
              height: "25%",
            }}
          ></i>
        </button>

        <button className="fas fa-volume-down" onClick={bajarVolumen}>

          
        </button>
        <button className="fas fa-volume-up" onClick={subirVolumen}>

          
</button>

      </div>
    </div>
  );
};

export default Home;
