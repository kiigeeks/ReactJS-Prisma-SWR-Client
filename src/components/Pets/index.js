import React, { useState } from 'react';
import { useSWRConfig } from 'swr';
import AddPets from './addPets';
import Collection from './collection';

const Pets = () => {
  const [addModal, setAddModal] = useState(false)

  const {mutate} = useSWRConfig();

  return (
    <React.Fragment>

      {addModal && 
        <AddPets setAddModal={setAddModal} mutate={mutate}/>
      }

      <div className='h-full w-full flex flex-col px-7 py-5 justify-center items-center'>
        <div className="flex self-end px-3">
          <span onClick={() => setAddModal(true)} className='px-2.5 py-2 bg-green-500 hover:bg-green-400 cursor-pointer rounded-md text-base lg:text-sm text-gray-100 hover:text-gray-50'>Add Pet</span>
        </div>
        <Collection></Collection>
      </div>
    </React.Fragment>
  )
}

export default Pets