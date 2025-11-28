import { useContext, useState } from "react";
import { SistemaContext } from "../context/SistemaContext";

export default function AtendenteScreen() {
  const { chamarProxima } = useContext(SistemaContext);
  const [guiche, setGuiche] = useState(1);
  const [atual, setAtual] = useState(null);

  function chamar() {
    const r = chamarProxima(guiche);
    setAtual(r);
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Área do Atendente</h1>

      <label>Guichê: </label>
      <select value={guiche} onChange={e => setGuiche(e.target.value)}>
        <option value="1">Guichê 1</option>
        <option value="2">Guichê 2</option>
        <option value="3">Guichê 3</option>
      </select>

      <br/><br/>
      <button onClick={chamar}>Chamar Próxima</button>

      {atual && <h2>Chamado: {atual.senha} → Guichê {atual.guiche}</h2>}
    </div>
  );
}
