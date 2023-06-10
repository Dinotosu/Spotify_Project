import React from 'react'
import { FooterListItem } from './FooterListItem'

export const TheFooterList = () => {
  return (
        <ul>
          {['Cookies', 'Privacy'].map((label, index) => 
            <FooterListItem key={index}>{label}</FooterListItem>)}
        </ul>
  )
}
