import { DotsThree } from "phosphor-react"
import { theme } from "../../../stitches.config"
import { Container, PaginationItem } from "./styles"

interface PaginationProps {
  totalCountOfRegisters: number;
  registerPerPage?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

const siblingsCount = 2

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => from + index + 1)
    .filter(page => page > 0)
}

export function Pagination({
  totalCountOfRegisters,
  registerPerPage = 10,
  currentPage = 1,
  onPageChange,
}: PaginationProps) {
  const lastPage = Math.ceil(totalCountOfRegisters / registerPerPage)

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : []

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
        currentPage,
        Math.min(currentPage + siblingsCount, lastPage),
      )
      : []

  return (
    <Container>
      {currentPage > 1 + siblingsCount && (
        <>
          <PaginationItem>1</PaginationItem>
          {currentPage > 1 + siblingsCount && (
            <span>
              <DotsThree size={24} color={theme.colors.gray900.value} weight="light" />
            </span>
          )}
        </>
      )}

      {previousPages.length > 0 &&
        previousPages.map(page => (
          <PaginationItem key={page}>{page}</PaginationItem>
        ))}

      <PaginationItem isCurrentPage={true}>{currentPage}</PaginationItem>

      {nextPages.length > 0 &&
        nextPages.map(page => (
          <PaginationItem key={page}>{page}</PaginationItem>
        ))}

      {currentPage + siblingsCount < lastPage && (
        <>
          {currentPage + 1 + siblingsCount < lastPage && (
            <span>
              <DotsThree size={24} color={theme.colors.gray900.value} weight="light" />
            </span>
          )}
          <PaginationItem>{lastPage}</PaginationItem>
        </>
      )}
    </Container>
  )
}
