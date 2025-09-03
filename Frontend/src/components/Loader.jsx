import { LoaderIcon } from 'lucide-react'
import React from 'react'
import { useTheme } from './../store/useTheme';

function Loader() {
  const { theme } = useTheme();

  return (
    <div className='min-h-screen flex items-center justify-center' data-theme={theme}>
            <LoaderIcon className='animate-spin size-10 text-primary'>

            </LoaderIcon>
        
    </div>
  )
}

export default Loader