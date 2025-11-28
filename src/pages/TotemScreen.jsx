import { useContext, useState } from "react";
import { SistemaContext } from "../context/SistemaContext";

function emitir(tipo) {
  const numero = emitirSenha(tipo);
  setUltima(numero);
}

export default function TotemScreen() {
  const { emitirSenha } = useContext(SistemaContext);
  const [ultima, setUltima] = useState(null);



  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>Totem – Emitir Senhas</h1>

      <button onClick={() => emitir("SP")}>PRIORITÁRIA (SP)</button><br/><br/>
      <button onClick={() => emitir("SG")}>GERAL (SG)</button><br/><br/>
      <button onClick={() => emitir("SE")}>RETIRADA DE EXAMES (SE)</button>

      {ultima && <h2>Senha emitida: {ultima}</h2>}
    </div>
  );
}
