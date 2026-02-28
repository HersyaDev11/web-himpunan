import { useState } from 'react';
import usePrograms from '../../hooks/usePrograms';
import ProgramForm from './ProgramForm';
import DeleteConfirmModal from './DeleteConfirmModal';

export default function Dashboard({ onLogout }) {
  const { programs, addProgram, updateProgram, deleteProgram, reorderPrograms } = usePrograms();
  const [showForm, setShowForm] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleAdd = (data) => {
    addProgram(data);
    setShowForm(false);
  };

  const handleEdit = (data) => {
    updateProgram(editingProgram.id, data);
    setEditingProgram(null);
  };

  const handleDelete = () => {
    deleteProgram(deleteTarget.id);
    setDeleteTarget(null);
  };

  const moveUp = (idx) => {
    if (idx === 0) return;
    const ids = programs.map((p) => p.id);
    [ids[idx - 1], ids[idx]] = [ids[idx], ids[idx - 1]];
    reorderPrograms(ids);
  };

  const moveDown = (idx) => {
    if (idx === programs.length - 1) return;
    const ids = programs.map((p) => p.id);
    [ids[idx], ids[idx + 1]] = [ids[idx + 1], ids[idx]];
    reorderPrograms(ids);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-green-200/50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-green-900">Portal Pengurus</h1>
            <p className="text-green-600 text-sm">HIMA TI - Kelola Program</p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-xl transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            Keluar
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-green-900">Daftar Program</h2>
            <p className="text-green-600/60 text-sm">{programs.length} program terdaftar</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Tambah Program
          </button>
        </div>

        {/* Empty State */}
        {programs.length === 0 && (
          <div className="bg-white rounded-2xl border border-green-200/50 shadow-sm p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <p className="text-green-900 font-semibold mb-1">Belum ada program</p>
            <p className="text-green-600/50 text-sm">Klik "Tambah Program" untuk menambahkan program baru</p>
          </div>
        )}

        {/* Program List */}
        {programs.length > 0 && (
          <div className="space-y-3">
            {programs.map((prog, idx) => (
              <div
                key={prog.id}
                className="bg-white rounded-xl border border-green-200/50 shadow-sm p-4 flex items-center gap-4"
              >
                {/* Thumbnail */}
                <img
                  src={prog.gambar}
                  alt={prog.judul}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-green-900 truncate">{prog.judul}</h3>
                  <p className="text-green-600/60 text-sm truncate">{prog.deskripsi}</p>
                  {prog.link && (
                    <a href={prog.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-xs hover:underline">
                      {prog.link}
                    </a>
                  )}
                </div>

                {/* Priority badge */}
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 font-bold text-sm flex items-center justify-center">
                  {idx + 1}
                </span>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => moveUp(idx)}
                    disabled={idx === 0}
                    className="p-2 rounded-lg hover:bg-green-50 text-green-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Naikkan prioritas"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>
                  </button>
                  <button
                    onClick={() => moveDown(idx)}
                    disabled={idx === programs.length - 1}
                    className="p-2 rounded-lg hover:bg-green-50 text-green-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Turunkan prioritas"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setEditingProgram(prog)}
                    className="p-2 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                    title="Edit"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setDeleteTarget(prog)}
                    className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                    title="Hapus"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Add Form Modal */}
      {showForm && (
        <ProgramForm
          onSubmit={handleAdd}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Edit Form Modal */}
      {editingProgram && (
        <ProgramForm
          program={editingProgram}
          onSubmit={handleEdit}
          onCancel={() => setEditingProgram(null)}
        />
      )}

      {/* Delete Confirm Modal */}
      {deleteTarget && (
        <DeleteConfirmModal
          programName={deleteTarget.judul}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
