'use client';

import css from '@/app/notes/page.module.css';
import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';

import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import SearchBox from '@/components/SearchBox/SearchBox';
import { fetchNotes } from '@/lib/api';

function Notes() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchInputValue, setSearchInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 500);

  // Обробник зміни значення в SearchBox
  const handleSearchChange = (value: string) => {
    setSearchInputValue(value);
    debouncedSearch(value);
  };

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ['notes', currentPage, searchQuery],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        search: searchQuery,
      }),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchInputValue} onChange={handleSearchChange} />

        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}

        <button onClick={openModal} className={css.button}>
          Create note +
        </button>
      </header>

      <main className={css.main}>
        {isLoading && <p>Loading notes...</p>}
        {isError && <p>Error loading notes.</p>}

        {data && data.notes.length > 0 ? (
          <NoteList notes={data.notes} />
        ) : (
          isSuccess && <p>No notes found.</p>
        )}
      </main>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}

export default Notes;
