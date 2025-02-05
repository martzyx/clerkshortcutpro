import React, { useEffect } from 'react'
import DTO, { SearchClients } from '../DTO'
const Dashboard = () => {

useEffect(() => {
  chrome.tabs.query({ active: true, currentWindow: true }).then(c => console.log("current tab ", c));
  const s: SearchClients = {
    type: DTO.SearchClients,
    query: "buffetti"
}
chrome.runtime.sendMessage(s)

}, [])

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard