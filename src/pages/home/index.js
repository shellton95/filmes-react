import { useEffect, useState } from "react";
import api from '../../services/api'
import { Link } from "react-router-dom";
import './style.css';

function Home(){
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    async function loadFilmes() {
        const response = await api.get("movie/now_playing", {
            params: {
                api_key: "28fc232cc001c31e8a031f419d0a14ca",
                language: "pt-BR",
                page: 1
            }
        })
        //console.log(response.data);
        setFilmes(response.data.results)
        setLoading(false);
    }
    
    useEffect( () => {
        loadFilmes();
    }, [])
    
    if(loading){
        return (
            <div className="loading">
                <h2>Carregando Filmes...</h2>
            </div>
        )
    }
    return(
        <div className="container">
            <div className="lista-filmes">
                {filmes.map( (filme) => {
                    return (
                        <article key={filme.id}>
                            <strong> {filme.title} </strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                            <Link to={`/filme/${filme.id}`} >Acessar</Link>
                        </article>
                    )
                } )}
            </div>
        </div>
    )
}

export default Home;