import React, { useState } from "react";
import { useQueue } from "../context/QueueContext";
import "./PainelScreen.css";

export default function PainelScreen() {
  const { currentTicket, callNext, normalQueue, prefQueue } = useQueue();
  const [lastCalls, setLastCalls] = useState([]);
  const [animate, setAnimate] = useState(false);

  function handleCall(type) {
    const ticket = callNext(type);

    if (ticket) {
      setAnimate(true);

      setLastCalls((prev) => [
        { code: ticket.code, type: ticket.type },
        ...prev.slice(0, 4),
      ]);

      setTimeout(() => setAnimate(false), 600);
    }
  }

  return (
    <div className="painel-root">
      <header className="painel-header">
        <h1>Painel de Atendimento</h1>
        <p>Acompanhe as chamadas em tempo real</p>
      </header>

      <div className="painel-grid">
        
        {/* SENHA ATUAL */}
        <div className={`painel-card-main ${animate ? "pulse" : ""}`}>
          <span className="label">Senha em Atendimento</span>
          <span className="ticket-code">
            {currentTicket ? currentTicket.code : "--"}
          </span>
          <span className="ticket-type">
            {currentTicket
              ? currentTicket.type === "normal"
                ? "Senha Normal"
                : "Senha Preferencial"
              : "Aguardando…"}
          </span>
        </div>

        {/* COLUNA DIREITA */}
        <div className="painel-column">
          
          {/* LISTA DE ÚLTIMAS SENHAS */}
          <div className="painel-card-list">
            <h2>Últimas Chamadas</h2>

            {lastCalls.length === 0 && (
              <p className="empty">Nenhuma senha chamada ainda.</p>
            )}

            <ul>
              {lastCalls.map((item, index) => (
                <li key={index}>
                  <strong>{item.code}</strong>{" "}
                  <span className="tag">
                    {item.type === "normal" ? "Normal" : "Preferencial"}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTROLES DO ATENDENTE */}
          <div className="painel-card-buttons">
            <h2>Chamar Próxima Senha</h2>

            <button className="btn-normal" onClick={() => handleCall("normal")}>
              Chamar Normal
            </button>

            <button className="btn-pref" onClick={() => handleCall("preferencial")}>
              Chamar Preferencial
            </button>

            <div className="fila-info">
              <p><strong>{normalQueue.length}</strong> na fila normal</p>
              <p><strong>{prefQueue.length}</strong> preferenciais</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
