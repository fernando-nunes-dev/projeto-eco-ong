import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useONGs } from '../contexts/ONGsContext';
import './Doacao.css';

const Doacao: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { ongs, realizarDoacao } = useONGs();
  const [valorDoacao, setValorDoacao] = useState('');

  const ong = useMemo(() => ongs.find(o => o.id.toString() === id), [ongs, id]);

  const handleDoacao = (event: React.FormEvent) => {
    event.preventDefault();
    const valor = parseFloat(valorDoacao);
    
    if (!ong || !valor || valor <= 0) return;

    realizarDoacao(ong.id, valor);

    alert(`Obrigado por doar ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)} para a ${ong.nome}!`);
    navigate('/');
  };
  
  if (!ong) {
    return <div className="loading-container">Carregando...</div>;
  }

  const progresso = (ong.valorArrecadado / ong.valorMeta) * 100;

  return (
    <div className="doacao-page-container">
      <div className="doacao-card">
        <img src={ong.caminhoImagem} alt={ong.nome} className="doacao-logo" />
        <h2>{ong.nome}</h2>
        <p className="doacao-descricao-completa">{ong.descricao}</p>
        
        <div className="doacao-info-arrecadacao">
          <div className="valores">
            <span>
              <strong>Arrecadado:</strong> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(ong.valorArrecadado)}
            </span>
            <span>
              <strong>Meta:</strong> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(ong.valorMeta)}
            </span>
          </div>
          <div className="doacao-progresso-bar-container">
            <div className="doacao-progresso-bar" style={{ width: `${progresso > 100 ? 100 : progresso}%` }}></div>
          </div>
        </div>
        
        <form onSubmit={handleDoacao} className="doacao-form">
          <label htmlFor="valor">Quero doar (R$):</label>
          <input
            type="number"
            id="valor"
            value={valorDoacao}
            onChange={(e) => setValorDoacao(e.target.value)}
            placeholder="50,00"
            required
            min="1"
            step="0.01"
          />
          <div className="botoes-container">
            <button type="submit" className="botao-confirmar">Confirmar Doação</button>
            <button type="button" onClick={() => navigate('/')} className="botao-cancelar">
              Voltar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Doacao;