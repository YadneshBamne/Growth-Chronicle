import { useUser } from '@clerk/clerk-react'
import React from 'react'

const Onboarding = () => {
  const { user } = useUser();
  console.log(user);
  return (
    <div>
      Onboarding
    </div>
  )
}

export default Onboarding
