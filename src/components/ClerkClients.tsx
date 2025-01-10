import React, { useEffect, useState } from 'react'
import { Button as FlowbiteBtn, Accordion } from 'flowbite-react'
import {
  Clients,
  Company,
  User,
  Store
} from '../extension/webResources/ClerkHQScraper'
import DTO from '../DTO'
import ToolTipCopyText from './ToolTipCopyText'

const CLERK_BACKEND_REDIRECT = 'https://my.clerk.io/#/?client_key='
const CLERK_DETAILS_REDIRECT = 'https://hq.clerk.io/v1/customers/update/'


const ClerkClients = () => {
  const [clients, setClients] = useState<Clients>({ companies: [], stores: [], users: [] })
  const [tab, setTab] = useState<number>(1)
  useEffect(() => {
    chrome.storage.session.get(DTO.HQclerkClients, result => {
      setClients(result[DTO.HQclerkClients])
    })
  }, [])

  return (
    <div className="w-full">
       
      <div className="flex text-sm">
        <FlowbiteBtn
          color="gray"
          className="rounded-r-none"
          onClick={() => setTab(1)}
        >
          Companies
        </FlowbiteBtn>
        <FlowbiteBtn
          color="gray"
          className="rounded-l-none"
          onClick={() => setTab(2)}
        >
          Users
        </FlowbiteBtn>
      </div>
      {tab === 1 && (
        <ClerkCompany companies={clients.companies} stores={clients.stores} />
      )}
      {tab === 2 && <ClerkUser users={clients.users} />}
    </div>
  )
}

const ClerkCompany: React.FC<{ companies: Company[], stores: Store[] }> = ({
  companies,
  stores
}) => {
  if(companies.length === 0) return;
  // remove duplicate companies
  companies = companies.filter(
    (company, index, self) => index === self.findIndex(t => t.id === company.id)
  )

  const handleClickToBackend = (url: string, client_key: string) => {
    chrome.tabs.create({ active: true, url: url + client_key })
  }

  return (
    <>
      {companies.map((company: Company, index: number) => (
          <Accordion color='gray' className='first:mt-4 last:mb-4' collapseAll>
            <Accordion.Panel key={index} >
              <Accordion.Title className='text-black rounded-none focus:border-none focus:ring-0'>
                <div className="flex gap-4 w-full justify-between items-center">
                  <div className='flex gap-4 justify-between w-[300px] items-center'>
                    <span className='font-semibold self-center'>{company.name || "Unknown"}</span>
                    <div className='flex gap-4'>
                      <ToolTipCopyText toolTipLable='Company ID' content={company.id} defaultText='Unknown ID'/>
                      <ToolTipCopyText toolTipLable='Company Key' content={company.account_id} defaultText='Unknown Key'/>
                    </div>
                  </div>
                  
                    <div className='flex ml-4'>
                  <FlowbiteBtn
                    color="gray"
                    size="sm"
                    className='rounded-r-none min-w-10'
                    onClick={() => handleClickToBackend(CLERK_BACKEND_REDIRECT , company.key)}
                    >
                    Backend
                    </FlowbiteBtn>
                  <FlowbiteBtn
                    color="gray"
                    size="sm"
                    className='rounded-l-none min-w-10'
                    onClick={() => handleClickToBackend(CLERK_DETAILS_REDIRECT , company.key)}

                    >
                    Details
                    </FlowbiteBtn>
                  </div>
                </div>
              </Accordion.Title>
              <Accordion.Content>
                <ClerkStore
                  stores={stores.filter(
                    store => store.client_key === company.key
                  )}
                />
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
        ))}
    </>
  )
}

const ClerkStore: React.FC<{ stores: Store[] }> = ({ stores }) => {
  return (
    <div>
      {stores.length > 0 &&
        stores.map((store: Store, index: number) => {
          return (
            <div key={index}>
              <div>{store.name}</div>
              <div>{store.id}</div>
              <div>{store.key}</div>
            </div>
          )
        })}
    </div>
  )
}

const ClerkUser: React.FC<{ users: User[] }> = ({ users }) => {
  return (
    <div>
      {users.length > 0 &&
        users.map((user: User, index: number) => {
          return (
            <div key={index}>
              <div>{user.name}</div>
              <div>{user.user.email}</div>
              <div>{user.store}</div>
              <div>{user.enabled ? 'Enabled' : 'Disabled'}</div>
            </div>
          )
        })}
    </div>
  )
}

export default ClerkClients
