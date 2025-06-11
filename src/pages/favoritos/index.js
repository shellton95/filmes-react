import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './style.css';
import { toast } from "react-toastify";

function Favoritos(){
    const [filmes, setFilmes] = useState([])

    function excluirFilme(id){
        let filtroFilmes = filmes.filter( (item) => {
            return (item.id !== id)
        })

        setFilmes(filtroFilmes)

        localStorage.setItem("@prime", JSON.stringify(filtroFilmes))
        toast.success("Filme deletado com sucesso")
    }

    useEffect( () => {
        const minhaLista = localStorage.getItem("@prime")
        setFilmes(JSON.parse(minhaLista) || [])
    }, [])
    return (
        <div className="meus-filmes">
            <h1>Meus Filmes</h1>

            <ul>
                {
                    filmes.map( (filme) => {
                        return (
                            <li key={filme.id} >
                                <span>{filme.title}</span>
                                <div>
                                    <Link to={`/filme/${filme.id}`}>Ver Detalhes</Link>
                                    <button onClick={ () => excluirFilme(filme.id)}>Excluir</button>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Favoritos;