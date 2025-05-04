import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import '../styles/FuriaChatWelcome.css';
import furiaLogo from "../assets/images/furia-logo-header.png";

const FuriaChatWelcome = () => {
  return (
    <div className="furia-chat-entrar">
      <div className="header-wrapper">
        <header className="header">
          <div className="overlap">
            <div className="luz" />
            <div className="faixa" />
            <div className="mensagem-no-tem">
              <p className="text-wrapper">
                Esse é o FURIA Chat, o melhor lugar para você se interar nos
                últimos acontecimentos do seu time de E-Sports favorito!
              </p>
            </div>
            <div className="div">Bem vindo FURIOSO!</div>
            <div className="titulo">
              <img className="furia-logo" alt="Furia logo" src={furiaLogo} />
              <div className="text-wrapper-2">FURIA Chat</div>
              <Link to={ROUTES.HOME}>
                <button className="botao-login">
                  <div className="overlap-group">
                    <div className="text-wrapper-3">Entrar</div>
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </header>
      </div>
    </div>

  );
};

export default FuriaChatWelcome;
