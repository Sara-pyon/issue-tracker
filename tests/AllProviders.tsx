import { Theme } from "@radix-ui/themes";
import React, { PropsWithChildren } from 'react'

const AllProviders = ({children}: PropsWithChildren) => {
  return (
    <Theme>
        {children}
    </Theme>
  )
}

export default AllProviders