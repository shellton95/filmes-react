import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from '../../services/api'
import './style.css';

function Filme(){
    const {id} = useParams(); //pegando o id q esta na url
    const [filme, setFilme] = useState([])
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    async function loadFilme(){
        await api.get(`movie/${id}`, {
            params: {
                api_key: "28fc232cc001c31e8a031f419d0a14ca",
                language: "pt-BR",
            }
        })
        .then( (response) => {
            setFilme(response.data)
            setLoading(false)
        })
        .catch( (e) => {
            console.log(e)
            navigate("/", {replace: true}); // aqui é para navegar para a tela de home caso n encontre o filme
            return
        })
    }

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@prime")

        let filmesSalvos = JSON.parse(minhaLista) || []

        const hasFilme = filmesSalvos.some( (filmes) => filmes.id == filme.id)

        if(hasFilme){
            toast.warn("Esse filme ja esta na lista")
            return
        }

        filmesSalvos.push(filme)
        localStorage.setItem("@prime", JSON.stringify(filmesSalvos))
        toast.success("Filme salvo com sucesso")
    }

    useEffect(() => {
        loadFilme();

        return () => {
            console.log("aqui estou desmontado a tela quando sair")
        }
    }, [])


    if(loading){
        return (
            <div className="filme-info">
                <h2>Carregando Filme...</h2>
            </div>
        )
    }
    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}  alt={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" href={`https://youtube.com/results?search_query=${filme.title} trailer`}>Trailer</a>
                </button>
                
            </div>
        </div>
    )
}

export default Filme;



