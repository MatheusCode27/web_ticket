import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const SistemaContext = createContext();

export default function SistemaProvider({ children }) {
  // FILAS
  const [filaSP, setFilaSP] = useState([]);
  const [filaSG, setFilaSG] = useState([]);
  const [filaSE, setFilaSE] = useState([]);

  // ÚLTIMAS 5 CHAMADAS
  const [ultimasChamadas, setUltimasChamadas] = useState([]);

  // CONTROLE DE ALTERNÂNCIA
  const [ultimaFoiSP, setUltimaFoiSP] = useState(false);

  // GERAR NÚMERO DA SENHA
  function gerarNumero(tipo) {
    const agora = new Date();
    const YY = String(agora.getFullYear()).slice(2);
    const MM = String(agora.getMonth() + 1).padStart(2, "0");
    const DD = String(agora.getDate()).padStart(2, "0");

    const contador =
      tipo === "SP" ? filaSP.length + 1 :
      tipo === "SG" ? filaSG.length + 1 :
                      filaSE.length + 1;

    const SQ = String(contador).padStart(3, "0");

    return `${YY}${MM}${DD}-${tipo}${SQ}`;
  }

  // EMITIR SENHA
  function emitirSenha(tipo) {
    const numero = gerarNumero(tipo);
    const nova = { numero, tipo, data: new Date().toISOString() };

    if (tipo === "SP") setFilaSP([...filaSP, nova]);
    if (tipo === "SG") setFilaSG([...filaSG, nova]);
    if (tipo === "SE") setFilaSE([...filaSE, nova]);

    return numero;
  }

  // CHAMAR PRÓXIMA SENHA
  function chamarProxima(guiche) {
    let senha = null;

    // Alternância: se última foi SP → SE/SG
    if (ultimaFoiSP) {
      if (filaSE.length > 0) {
        senha = filaSE[0];
        setFilaSE(filaSE.slice(1));
      } else if (filaSG.length > 0) {
        senha = filaSG[0];
        setFilaSG(filaSG.slice(1));
      }
      setUltimaFoiSP(false);
    }

    // Se última NÃO foi SP → tentar SP
    else {
      if (filaSP.length > 0) {
        senha = filaSP[0];
        setFilaSP(filaSP.slice(1));
        setUltimaFoiSP(true);
      } else if (filaSE.length > 0) {
        senha = filaSE[0];
        setFilaSE(filaSE.slice(1));
      } else if (filaSG.length > 0) {
        senha = filaSG[0];
        setFilaSG(filaSG.slice(1));
      }
    }

    if (!senha) return null;

    const registro = { senha: senha.numero, guiche };
    const novas = [registro, ...ultimasChamadas].slice(0, 5);
    setUltimasChamadas(novas);

    return registro;
  }

  return (
    <SistemaContext.Provider value={{
      emitirSenha,
      chamarProxima,
      ultimasChamadas
    }}>
      {children}
    </SistemaContext.Provider>
  );
}
