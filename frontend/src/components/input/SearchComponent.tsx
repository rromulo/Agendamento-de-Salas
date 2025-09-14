import React, { Dispatch, SetStateAction, useState } from 'react';
import { useDebounce } from '@/hooks/debounce';

interface ISearchComponentProps {
  onSearch: (term: string, page: number, limit: number) => void;
  delay?: number;
  placeHolder?: string;
  className?: string;
  page?: number;
  limit?: number;
  setValue: Dispatch<SetStateAction<string>>;
  value: string;
}

export const SearchComponent: React.FC<ISearchComponentProps> = ({
  onSearch,
  delay = 1000,
  placeHolder,
  className,
  page = 1,
  limit = 20,
  setValue,
  value
}) => {
  const debouncedSearch = useDebounce(onSearch, delay);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    debouncedSearch(newValue, page, limit);
  };

  return (
    <input
      type='text'
      value={value}
      onChange={handleInputChange}
      placeholder={placeHolder}
      className={`${className} border-1 border-gray-300 rounded-md p-2`}
    />
  );
};