import { useState } from "react";

export default function AtendenteScreen() {
  const [guiche, setGuiche] = useState("1");

  return (
    <div className="container">
      <h1>Área do Atendente</h1>

      <label style={{ fontSize: "18px" }}>Selecione o guichê:</label>
      <br />

      <select
        className="select"
        value={guiche}
        onChange={(e) => setGuiche(e.target.value)}
      >
        <option value="1">Guichê 1</option>
        <option value="2">Guichê 2</option>
        <option value="3">Guichê 3</option>
      </select>

      <br />
      <br />

      <button className="button">Chamar Próxima Senha</button>
    </div>
  );
}
