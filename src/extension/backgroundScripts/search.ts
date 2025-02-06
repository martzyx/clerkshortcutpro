import DTO, { HQclerkClients } from '../../DTO'
import { HQclerkData } from '../webResources/ClerkHQScraper'

export default async function searchClerkClients(
  query: string
): Promise<HQclerkClients> {

    try {
        const rawResponse = await fetch('https://api.clerk.io/v2/client/list', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ query: query })
        })
        const clients: HQclerkData = await rawResponse.json()
        const clerkClients: HQclerkClients = {
          type: DTO.HQclerkClients,
          clients: clients.clients
        }
        return clerkClients
        
    } catch (error: unknown) {
        throw new Error(`Error in search: ${error}`);
        
    }
}
