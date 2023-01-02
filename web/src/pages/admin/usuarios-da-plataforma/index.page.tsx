import { Searchbar } from '../../../components/Searchbar'
import { Pagination } from '../../../components/Pagination'

import {
  SearchContainer,
  Table,
  TableBody,
  TableRow,
  Separator,
  SeparatorTableRow,
} from './styles'

export default function AppUsers() {
  return (
    <>
      <SearchContainer>
        <Searchbar placeholder="Pesquisar nome" />
        <Searchbar placeholder="Pesquisar CPF" />
      </SearchContainer>

      <Pagination
        totalCountOfRegisters={100}
        currentPage={4}
        registerPerPage={10}
      />

      <Table>
        <thead>
          <TableRow>
            <th>Nome</th>
            <th>Qtd. de inscrições</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Data de criação</th>
          </TableRow>
        </thead>

        <TableBody>
          <TableRow>
            <td>João Guilherme Da Rocha</td>
            <td>5</td>
            <td>123.456.789-10</td>
            <td>(47) 9999-99999</td>
            <td>06 de outubro de 2022</td>
          </TableRow>

          <SeparatorTableRow>
            <td>
              <Separator />
            </td>
          </SeparatorTableRow>

          <TableRow>
            <td>Hadassa Mariane Rocha Da Silva Pasqual Andrade</td>
            <td>5</td>
            <td>123.456.789-10</td>
            <td>(47) 9999-99999</td>
            <td>29 de novembro de 2021</td>
          </TableRow>

          <SeparatorTableRow>
            <td>
              <Separator />
            </td>
          </SeparatorTableRow>

          <TableRow>
            <td>João Guilherme Da Rocha</td>
            <td>5</td>
            <td>123.456.789-10</td>
            <td>(47) 9999-99999</td>
            <td>06 de outubro de 2022</td>
          </TableRow>
        </TableBody>
      </Table>
    </>
  )
}
