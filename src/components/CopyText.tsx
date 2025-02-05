import React, { useState } from 'react'
import { Button as FlowbiteBtn, Tooltip } from 'flowbite-react'


const CopyText: React.FC<{ toolTipLable?: string, content: string | number | undefined, defaultText?: string, isKey?: boolean, showToolTip?: boolean}> = 
({ toolTipLable, content, defaultText, isKey = false, showToolTip = false}) => {
  const [copy, setCopy] = useState(toolTipLable)


  if(content === undefined || content === ''){
    return (
      <span className='text-center min-w-[76px]'>{defaultText ? defaultText : '-'}</span>
    )
  }
  
  const ORIGINAL_CONTENT = content
  const handleCopyClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    navigator.clipboard.writeText(ORIGINAL_CONTENT.toString());
    setCopy('Copied!')
    setTimeout(() => {
      setCopy(toolTipLable)
    }, 1000)
  }

  if(content.toString().length > 8 && isKey) content = content.toString().substring(0, 3) + '...' + content.toString().substring(content.toString().length - 3)

    if(showToolTip){
      return (
        <Tooltip style='light' content={copy} placement="top" trigger="hover">
          <FlowbiteBtn 
          onClick={(event: React.MouseEvent) => handleCopyClick(event)}
          color='gray' className='border-none hover:border focus:border-none focus:ring-0 self-center' size='xs'>
            {content ? content : defaultText ? defaultText : '-'}
          </FlowbiteBtn>
        </Tooltip>
      )
    }

  return (
      <FlowbiteBtn 
      onClick={(event: React.MouseEvent) => handleCopyClick(event)}
      color='gray' className='border-none hover:border focus:border-none focus:ring-0 self-center' size='xs'>
        {content}
      </FlowbiteBtn>
  )
}

export default CopyText