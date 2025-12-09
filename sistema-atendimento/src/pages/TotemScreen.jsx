import React, { useEffect, useState } from "react";
import { useQueue } from "../context/QueueContext";
import "./TotemScreen.css";

export default function TotemScreen() {
  const { generateTicket, lastNormal, lastPref } = useQueue();
  const [now, setNow] = useState(new Date());
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  function handleGenerate(type) {
    const ticket = generateTicket(type);
    if (!ticket) return;

    setFeedback(`Senha ${ticket.code} gerada com sucesso!`);

    setTimeout(() => setFeedback(""), 2500);
  }

  const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const timeFormatter = new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="totem-root">
      <header className="totem-header">
        <div>
          <h1>Totem de Atendimento</h1>
          <p>Retire sua senha e aguarde ser chamado</p>
        </div>

        <div className="totem-clock">
          <span className="clock-time">{timeFormatter.format(now)}</span>
          <span className="clock-date">{dateFormatter.format(now)}</span>
        </div>
      </header>

      <div className="totem-layout">
        {/* Lado esquerdo - senha atual gerada no totem */}
        <section className="totem-ticket-panel">
          <span className="panel-label">Última senha retirada</span>

          <div className="panel-ticket-box">
            <span className="ticket-code">
              {lastNormal?.code ||
                lastPref?.code ||
                "--"}
            </span>
            <span className="ticket-type">
              {lastNormal
                ? "Senha Normal"
                : lastPref
                ? "Senha Preferencial"
                : "Nenhuma senha retirada"}
            </span>
          </div>

          <p className="panel-footer">
            Toque apenas uma vez e aguarde sua vez no painel.
          </p>
        </section>

        {/* Lado direito - botões de gerar senha */}
        <section className="totem-actions">
          <h2>Toque em uma das opções para gerar sua senha:</h2>

          <div className="actions-grid">
            <button
              className="ticket-btn ticket-btn-normal"
              onClick={() => handleGenerate("normal")}
            >
              <span className="btn-title">Senha Normal</span>
              <span className="btn-subtitle">Atendimento geral</span>
            </button>

            <button
              className="ticket-btn ticket-btn-pref"
              onClick={() => handleGenerate("preferencial")}
            >
              <span className="btn-title">Senha Preferencial</span>
              <span className="btn-subtitle">
                Idosos, gestantes, PCD, etc.
              </span>
            </button>
          </div>

          {feedback && <div className="toast">{feedback}</div>}
        </section>
      </div>
    </div>
  );
}
