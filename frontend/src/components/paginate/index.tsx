'use client'
import { Dispatch, SetStateAction } from "react"
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

type paginateInterface = {
  currentPage: number
  totalPages: number
}

type PaginationProps = {
  pagination: paginateInterface | null
  handleOnClick: Dispatch<SetStateAction<string>>
  className?: string
}

export function Pagination({ pagination, handleOnClick, className }: PaginationProps) {
  if (!pagination) return null

  const { currentPage, totalPages } = pagination

  const goToPrev = () => {
    if (currentPage > 1) handleOnClick((currentPage - 1).toString())
  }

  const goToNext = () => {
    if (currentPage < totalPages) handleOnClick((currentPage + 1).toString())
  }

  return (
    <div className={`flex justify-center items-center gap-3 ${className || ""} w-full m-auto mt-5`}>
      {/* Botão anterior */}
      {
        currentPage > 1 && (
          <button
            onClick={goToPrev}
            className="rounded-md bg-black p-2 text-white disabled:opacity-30"
          >
            <BiChevronLeft size={20} />
          </button>
        )
      }
      

      {/* Página atual */}
      <span className="rounded-lg bg-black px-4 py-2 text-white font-medium">
        {currentPage}
      </span>

      {/* Botão próximo */}
      {
        currentPage !== totalPages && (
          <button
            onClick={goToNext}
            className="rounded-md bg-black p-2 text-white disabled:opacity-30"
          >
            <BiChevronRight size={20} />
          </button>
        )
      }
      
    </div>
  )
}
