import { Searchbar } from "../../../components/Searchbar"
import { Pagination } from "../../../components/Pagination"

import { SearchContainer } from "./styles"

export default function AppUsers() {
  return (
    <>
      <SearchContainer>
        <Searchbar placeholder="Pesquisar nome" />
        <Searchbar placeholder="Pesquisar CPF" />
      </SearchContainer>

      <Pagination totalCountOfRegisters={100} currentPage={4} registerPerPage={10} />
    </>
  )
}