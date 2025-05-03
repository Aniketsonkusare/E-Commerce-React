import { Typography } from 'antd'
import React from 'react'

function Footer() {
  return (
    <div className='AppFooter'>
        <Typography.Link href='http://google.com/' target='_blank'>
          Privacy Policy
        </Typography.Link>
        <Typography.Link href='http://facebook.com/' target='_blank'>
          Terms & Conditions
        </Typography.Link>
        <Typography.Link href='http://instagram.com/' target='_blank'>
          Return Policy
        </Typography.Link>
        <Typography.Link href='+1234567 890' target='_blank'>
          +1234567 890
        </Typography.Link>
    </div>
  )
}

export default Footer
