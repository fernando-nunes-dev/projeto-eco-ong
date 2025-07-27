import React from 'react';
import { Link } from 'react-router-dom';
import { ONG } from '../types/ong.types';
import './ONGCard.css';

interface ONGCardProps {
  ong: ONG;
}

const ONGCard: React.FC<ONGCardProps> = ({ ong }) => {
  const progresso = (ong.valorArrecadado / ong.valorMeta) * 100;
  const metaAtingida = ong.valorArrecadado >= ong.valorMeta;

  return (
    <div className={`card-container ${metaAtingida ? 'meta-atingida' : ''}`}>
      <img src={ong.caminhoImagem} alt={ong.nome} className="card-logo" />
      <h3 className="card-nome">{ong.nome}</h3>
      <p className="card-descricao">{ong.descricaoResumida}</p>
      
      <div className="card-progresso-info">
        <p>
          Arrecadado: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(ong.valorArrecadado)}
        </p>
        <div className="progresso-bar-container">
          <div className="progresso-bar" style={{ width: `${progresso > 100 ? 100 : progresso}%` }}></div>
        </div>
        <span>{progresso.toFixed(0)}% da meta</span>
      </div>

      <Link to={`/doar/${ong.id}`} className="card-botao-doar">
        Apoiar Causa
      </Link>
    </div>
  );
};

export default ONGCard;