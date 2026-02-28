import { useState, useCallback } from 'react';

const STORAGE_KEY = 'himati_programs';

function loadPrograms() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return parsed.sort((a, b) => a.prioritas - b.prioritas);
  } catch {
    return [];
  }
}

function savePrograms(programs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(programs));
}

export default function usePrograms() {
  const [programs, setPrograms] = useState(loadPrograms);

  const refresh = useCallback(() => {
    setPrograms(loadPrograms());
  }, []);

  const addProgram = useCallback((data) => {
    const current = loadPrograms();
    const maxPrioritas = current.length > 0
      ? Math.max(...current.map((p) => p.prioritas))
      : 0;
    const newProgram = {
      id: crypto.randomUUID(),
      judul: data.judul,
      deskripsi: data.deskripsi,
      gambar: data.gambar,
      link: data.link || '',
      prioritas: maxPrioritas + 1,
      createdAt: new Date().toISOString(),
    };
    const updated = [...current, newProgram];
    savePrograms(updated);
    setPrograms(updated.sort((a, b) => a.prioritas - b.prioritas));
    return newProgram;
  }, []);

  const updateProgram = useCallback((id, data) => {
    const current = loadPrograms();
    const updated = current.map((p) =>
      p.id === id ? { ...p, ...data, id } : p
    );
    savePrograms(updated);
    setPrograms(updated.sort((a, b) => a.prioritas - b.prioritas));
  }, []);

  const deleteProgram = useCallback((id) => {
    const current = loadPrograms();
    const filtered = current.filter((p) => p.id !== id);
    const reindexed = filtered
      .sort((a, b) => a.prioritas - b.prioritas)
      .map((p, idx) => ({ ...p, prioritas: idx + 1 }));
    savePrograms(reindexed);
    setPrograms(reindexed);
  }, []);

  const reorderPrograms = useCallback((orderedIds) => {
    const current = loadPrograms();
    const reordered = orderedIds
      .map((id, idx) => {
        const prog = current.find((p) => p.id === id);
        return prog ? { ...prog, prioritas: idx + 1 } : null;
      })
      .filter(Boolean);
    savePrograms(reordered);
    setPrograms(reordered);
  }, []);

  return { programs, addProgram, updateProgram, deleteProgram, reorderPrograms, refresh };
}
