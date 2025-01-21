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


  if(clients.companies.length === 0) return;
  // remove duplicate companies
  clients.companies = clients.companies.filter(
    (company, index, self) => index === self.findIndex(t => t.id === company.id)
  )

  const handleClickToBackend = (url: string, client_key: string) => {
    chrome.tabs.create({ active: true, url: url + client_key })
  }

  return (
    <div className="w-full">
      {clients.companies.map((company: Company, index: number) => (
          <Accordion color='gray' className='first:mt-4 last:mb-4' collapseAll>
            <Accordion.Panel key={index} >
              <Accordion.Title className='text-black rounded-none focus:border-none focus:ring-0'>
                <div className="flex gap-4 w-full justify-between items-center z-50">
                  <div className='flex gap-4 justify-between w-[300px] items-center'>
                    <span className='font-semibold self-center'>{company.name || "Unknown"}</span>
                    <div className='flex gap-4'>
                      <CopyText showToolTip={true} toolTipLable='Company Id' content={company.id} />
                      <CopyText showToolTip={true} toolTipLable='Subscription Id' content={company.account_id} />
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
              <Accordion.Content className='p-1'>
                {company.status === 'error' && (
                  <div className='bg-orange-100 p-1 pl-2 pr-2 border border-orange-400 text-orange-700 px-4 py-3 rounded relative' role='alert'>
                    <span className='font-bold text-sm'>Warning - Missing Infomation</span>
                    <span className='block sm:inline text-xs'>{company.message}</span>
                  </div>
                )  
                }
                <div className='grid grid-cols-3'>
                  <ClerkCompanyDetails company={company} />
                  
                  <ClerkStore
                      stores={clients.stores.filter(
                        store => store.client_key === company.key
                      )}
                    />
                  
                  <ClerkUser
                      users={clients.users.filter(
                        user => user.account_id === company.account_id
                      )}
                    />
                    </div>
            
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
        ))}
    </div>
  )
}

const ClerkCompanyDetails: React.FC<{ company: Company }> = ({ company }) => {

  function timeConverter(UNIX_timestamp: number | undefined){
    if(UNIX_timestamp === undefined) return '-'
    const a = new Date(UNIX_timestamp * 1000);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const time = date + ' ' + month + ' ' + year;
    return time;
  }

  return (
    <div >
      <h2 className='font-semibold pb-2 text-center text-lg'>Company Details</h2>
      <ProductInfo label="Company Id" content={company.id} />
      <ProductInfo label="Subscription Id" content={company.account_id} />
      <div className='grid grid-cols-2 items-center ml-1'>
          <span className='font-semibold'>Public Key</span>
          <CopyText content={company.key} isKey={true} />
        </div>
      <ProductInfo label="Hubspot Id" content={company.hubspot_id} />

      <div className='mt-1 border-y border-gray-200'>         
        <>
         <ProductInfo label="Search" content={company.products?.search} />
         <ProductInfo label="Recs" content={company.products?.recommendations} />
         <ProductInfo label="Email" content={company.products?.email} />
         <ProductInfo label="Audience" content={company.products?.audience} />
         <ProductInfo label="Chat" content={company.products?.chat} />
        </>
        
       
      </div>
      <ProductInfo label="Created At" content={timeConverter(company.created_at)} />
      <ProductInfo label="Trial Expire At" content={timeConverter(company.trial_expire_at)} />
    </div>
  )
}

const ProductInfo: React.FC<{ label: string, content: string | number | undefined}> = ({ label, content }) => (
  <div className='grid grid-cols-2 items-center ml-1'>
    <span className='font-semibold'>{label}</span>
    <CopyText content={content} defaultText='0' />
  </div>
)



const ClerkStore: React.FC<{ stores: Store[] }> = ({ stores }) => {
  return (
    <div className='mx-4'>
      <h2 className='font-semibold pb-1 text-lg'>Stores</h2>

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
      <h2 className='font-semibold pb-1 text-lg'>Users</h2>

      {users.length > 0 &&
        users.map((user: User, index: number) => {
          return (
            <div key={index}>
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
