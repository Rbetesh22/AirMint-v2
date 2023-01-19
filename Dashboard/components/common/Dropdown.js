import { Fragment, JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, SetStateAction, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { HiCheck, HiChevronDown } from 'react-icons/hi'
import Image from "next/image";

export default function Dropdown({values, value, onChange, error}) {
  const [selected, setSelected] = useState('');
  const [expanded, setExpanded] = useState(false);

  const handleChange = (value) => {
    setSelected(value)
      if (onChange) {
        onChange(value);
      }
  };


  const rotateArrow = () => {
    const arrow = document.querySelector('.arrowicon');
    if(expanded){
      setExpanded(false);
      arrow.style.transform = 'rotate(0deg)';
    }else{
      setExpanded(true);
      arrow.style.transform = 'rotate(180deg)';
    }
  }

  return (
      <Listbox value={selected} onChange={handleChange}>
        <div style={{  marginBottom: "1.5rem"}} className={`relative bg-[#181924] z-40 `}>
          <Listbox.Button style={{ padding: "0.7rem"}} className={error ? "appearance-none block w-full px-3 py-2 border border-red-300 rounded-md shadow-sm placeholder-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" :
           "appearance-none border border-[#A1A4BD] bg-[#181924] flex items-center block w-full h-full px-3 relative rounded-md shadow-sm drop-shadow-xl focus:outline-none text-base"}>
            <span className="block truncate text-left">{selected ? selected : <div className='drop-shadow-xl color-white'>Tweet Retweets</div>}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 2xl:pr-4">
              <HiChevronDown
                className={error ? "h-5 w-5 text-red-300" :"h-5 w-5 2xl:h-8 2xl:w-8  arrowicon"}
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className={`absolute mt-1 z-50 max-h-60 w-full overflow-auto rounded-md bg-[#181924] shadow-2xl py-1 text-xs shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}>
              {values.map((value, valueIdx) => (
                <Listbox.Option
                  key={valueIdx}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-4 pr-4 ${
                      active ? 'bg-[#0070f3]' : ''
                    }`
                  }
                  value={value}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {value}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 right-0 pr-2 flex items-center text-white">
                          <HiCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
  )
}