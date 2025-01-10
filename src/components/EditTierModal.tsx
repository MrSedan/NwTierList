import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/shallow';
import useStore from '../store';

export const EditTierModal = () => {
  const [tierLevel, setTierLevel, editTierLevel] = useStore(
    useShallow(state => [state.editingTierLevel, state.setEditingTierLevel, state.editTierLevelName]),
  );
  const [newName, setNewName] = useState('');
  useEffect(() => {
    if (tierLevel) setNewName(tierLevel.name);
  }, [tierLevel]);
  return (
    <div
      className={`top-0 left-0 w-screen h-screen z-50 bg-black bg-opacity-50 ${tierLevel ? 'fixed' : 'hidden'}`}
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        setTierLevel(null);
      }}
    >
      <div
        className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex w-2/5 h-1/4 bg-[#2d3436] ps-8 pe-8 pt-8 pb-8 z-50 rounded-3xl flex-row gap-4 justify-center items-center text-white border-white border-2`}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {tierLevel && (
          <div className='flex flex-col gap-4 justify-start items-center'>
            <input
              type='text'
              defaultValue={tierLevel.name}
              placeholder='Tier Name'
              className='text-black'
              onChange={e => setNewName(e.target.value)}
            ></input>
            <button
              onClick={() => {
                editTierLevel(tierLevel.id as string, newName);
                setTierLevel(null);
              }}
            >
              Save
            </button>
            <button onClick={() => setTierLevel(null)}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};
