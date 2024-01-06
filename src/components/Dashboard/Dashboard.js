import useAuth from '../../hooks/useAuth'
import AdminOverview from './Overview/AdminOverview'
import StaffOverview from './Overview/StaffOverview'
import CustomerOverview from './Overview/CustomerOverview'

const Dashboard = () => {
  const { user } = useAuth()

  let content = <CustomerOverview />
  if(user?.status === 'Admin'){
    content =  <AdminOverview />
  }else if(user.status === 'Staff'){
    content =  <StaffOverview />
  }
  return content
}

export default Dashboard