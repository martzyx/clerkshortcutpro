import React, { useEffect, useState } from 'react'
import { Button as FlowbiteBtn, Accordion } from 'flowbite-react'
import {
  Clients,
  Company,
  User,
  Store
} from '../extension/webResources/ClerkHQScraper'
import DTO from '../DTO'
import CopyText from './CopyText'

const CLERK_BACKEND_REDIRECT = 'https://my.clerk.io/#/?client_key='
const CLERK_DETAILS_REDIRECT = 'https://hq.clerk.io/v1/customers/update/'


const ClerkClients = () => {
  const [clients, setClients] = useState<Clients>();
  useEffect(() => {
    chrome.storage.session.get(DTO.HQclerkClients).then(res => {
      const c: Clients = res[DTO.HQclerkClients];
      console.log("Clients", c);
      setClients(c);
    });
  
  }, [])

  if(clients === undefined) return

  return (
    <div className="w-full">
       
 
        <ClerkCompany companies={clients.companies} stores={clients.stores} users={clients.users}/>
   
    </div>
  )
}

const ClerkCompany: React.FC<{ companies: Company[], stores: Store[], users: User[] }> = ({
  companies,
  stores,
  users
}) => {
  if(companies.length === 0) return;
  // remove duplicate companies
  companies = companies.filter(
    (company, index, self) => index === self.findIndex(t => t.id === company.id)
  )

  const handleClickToBackend = (url: string, client_key: string) => {
    chrome.tabs.create({ active: true, url: url + client_key })
  }
  console.log(companies)
  return (
    <>
      {companies.map((company: Company, index: number) => (
          <Accordion color='gray' className='first:mt-4 last:mb-4' collapseAll>
            <Accordion.Panel key={index} >
              <Accordion.Title className='text-black rounded-none focus:border-none focus:ring-0'>
                <div className="flex gap-4 w-full justify-between items-center z-50">
                  <div className='flex gap-4 justify-between w-[300px] items-center'>
                    <span className='font-semibold self-center'>{company.name || "Unknown"}</span>
                    <div className='flex gap-4'>
                      <CopyText showToolTip={true} toolTipLable='Company ID' content={company.id} />
                      <CopyText showToolTip={true} toolTipLable='Company Key' content={company.account_id} />
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
              <Accordion.Content className='p-4'>
                {company.status === 'error' && (
                  <div className='bg-orange-100 p-1 pl-2 pr-2 border border-orange-400 text-orange-700 px-4 py-3 rounded relative' role='alert'>
                    <span className='font-bold text-sm'>Warning - Missing Infomation</span>
                    <span className='block sm:inline text-xs'>{company.message}</span>
                  </div>
                )  
                }
                <div className='grid grid-cols-3 pt-4'>
                  <ClerkCompanyDetails company={company} />
                  
                  <ClerkStore
                      stores={stores.filter(
                        store => store.client_key === company.key
                      )}
                    />
                  
                  <ClerkUser
                      users={users.filter(
                        user => user.account_id === company.account_id
                      )}
                    />
                    </div>
            
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
        ))}
    </>
  )
}

const ClerkCompanyDetails: React.FC<{ company: Company }> = ({ company }) => {
  return (
    <div>
      <div>{company.name}</div>
      <div>{company.id}</div>
      <CopyText content={company.key} isKey={true} />
    </div>
  )
}


const ClerkStore: React.FC<{ stores: Store[] }> = ({ stores }) => {
  return (
    <div>
      {stores.length > 0 &&
        stores.map((store: Store, index: number) => {
          return (
            <div key={index}> 
              <span>{store.name}</span>
              <CopyText  content={store.id} />
              <CopyText  content={store.key} isKey={true} />
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
