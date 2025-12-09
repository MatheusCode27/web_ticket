import React, { createContext, useContext, useState } from "react";

const QueueContext = createContext();

export function QueueProvider({ children }) {
  const [normalCounter, setNormalCounter] = useState(0);
  const [prefCounter, setPrefCounter] = useState(0);

  const [normalQueue, setNormalQueue] = useState([]);
  const [prefQueue, setPrefQueue] = useState([]);

  const [currentTicket, setCurrentTicket] = useState(null);

  const [lastNormal, setLastNormal] = useState(null);
  const [lastPref, setLastPref] = useState(null);

  function generateTicket(type) {
    if (type === "normal") {
      const next = normalCounter + 1;
      setNormalCounter(next);

      const code = `N${String(next).padStart(3, "0")}`;
      const ticket = { code, type: "normal", createdAt: new Date() };

      setNormalQueue((q) => [...q, ticket]);
      setLastNormal(ticket);
      return ticket;
    }

    if (type === "preferencial") {
      const next = prefCounter + 1;
      setPrefCounter(next);

      const code = `P${String(next).padStart(3, "0")}`;
      const ticket = { code, type: "preferencial", createdAt: new Date() };

      setPrefQueue((q) => [...q, ticket]);
      setLastPref(ticket);
      return ticket;
    }
  }

  function callNext(type) {
    if (type === "normal") {
      if (normalQueue.length === 0) return null;
      const [next, ...rest] = normalQueue;
      setNormalQueue(rest);
      setCurrentTicket(next);
      return next;
    }

    if (type === "preferencial") {
      if (prefQueue.length === 0) return null;
      const [next, ...rest] = prefQueue;
      setPrefQueue(rest);
      setCurrentTicket(next);
      return next;
    }
  }

  const value = {
    // estado
    normalQueue,
    prefQueue,
    currentTicket,
    lastNormal,
    lastPref,
    // ações
    generateTicket,
    callNext,
  };

  return (
    <QueueContext.Provider value={value}>{children}</QueueContext.Provider>
  );
}

export function useQueue() {
  return useContext(QueueContext);
}
