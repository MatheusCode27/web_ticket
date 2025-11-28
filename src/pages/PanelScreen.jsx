import { useContext } from "react";
import { SistemaContext } from "../context/SistemaContext";

function corSenha(senha) {
  if (senha.includes("SP")) return "#ff6b6b"; // Vermelho para Prioritária
  if (senha.includes("SG")) return "#4dabf7"; // Azul para Geral
  if (senha.includes("SE")) return "#51cf66"; // Verde para Exames
  return "#ccc"; // Cor padrão
}

export default function PanelScreen() {
  const { ultimasChamadas } = useContext(SistemaContext);

  // Função para definir a cor conforme o tipo de senha


  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>Painel de Chamadas</h1>

      {ultimasChamadas.length === 0 && <p>Nenhuma senha chamada ainda.</p>}

      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
        {ultimasChamadas.map((c, i) => (
          <div
            key={i}
            style={{
              fontSize: 24,
              padding: "15px 20px",
              borderRadius: "8px",
              backgroundColor: corSenha(c.senha),
              color: "#fff",
              fontWeight: "bold",
              boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            }}
          >
            Senha {c.senha} → Guichê {c.guiche}
          </div>
        ))}
      </div>
    </div>
  );
}
