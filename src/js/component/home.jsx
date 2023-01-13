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
  let [repetir, setRepetir] = useState(false);

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

const repetirMusica = () => {
  setRepetir(!repetir);
  //reproductor.current.loop = repetir;
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
        <audio id="reproductor" ref={reproductor} loop={repetir}></audio>
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


<button className="" onClick={repetirMusica}> 

<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-repeat" viewBox="0 0 16 16">
  <path stroke={repetir ? 'red' : 'black'} stroke-width="1.5" d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192Zm3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z"/>
</svg>
</button>


      </div>
    </div>
  );
};

export default Home;
