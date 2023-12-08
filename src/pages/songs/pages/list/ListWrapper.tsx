import { ResourceProvider } from '../../../../context/ResourceContext'
import {ListViewProvider} from '../../core/ListViewProvider'
import {QueryRequestProvider} from '../../core/QueryRequestProvider'
import {QueryResponseProvider} from '../../core/QueryResponseProvider'
import { ConfirmationDialogContextProvider } from '../../../../context/ConfirmationDialogContext'
import {ListPage} from './ListPage'

export const ListWrapper = () => {
  return (
    <ResourceProvider>
      <QueryRequestProvider>
        <QueryResponseProvider>
          <ListViewProvider>
            <ConfirmationDialogContextProvider>
              <ListPage />
            </ConfirmationDialogContextProvider>
          </ListViewProvider>
        </QueryResponseProvider>
      </QueryRequestProvider>
    </ResourceProvider>
  )
}
