import { Routes, Route } from 'react-router-dom'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { urls } from './assets/constants/data'
import { ROLES } from './configs/roles'
import useTitle from './hooks/useTitle'
import Layout from './components/Layout/Layout'
import Landing from './components/Landing/Landing'
import Login from './features/Auth/Login/Login'
import Signup from './features/Auth/Login/Signup'
import Register from './features/Auth/Login/Register'
import PersistLogin from './features/Auth/Login/PersistLogin'
import RequireAuth from './features/Auth/Login/RequireAuth'
import Prefetch from './features/Auth/Prefetch'
import DashboardLayout from './components/Dashboard/DashboardLayout/DashboardLayout'
import Dashboard from './components/Dashboard/Dashboard'
import Users from './features/Users/Users'
import EditUser from './features/Users/EditUser'
import Staffs from './features/Staff/Staffs'
import EditStaff from './features/Staff/EditStaff'
import NewStaffForm from './features/Staff/NewStaffForm'
import Customers from './features/Customers/Customers'
import EditCustomer from './features/Customers/EditCustomer'
import NewCustomerForm from './features/Customers/NewCustomerForm'
import Categories from './features/Categories/Categories'
import EditCategory from './features/Categories/EditCategory'
import NewCategoryForm from './features/Categories/NewCategoryForm'
import Products from './features/Products/Products'
import EditProduct from './features/Products/EditProduct'
import NewProductForm from './features/Products/NewProductForm'
import CustomerProducts from './features/Products/CustomerProducts'

const App = () => {
  useTitle('Nigerian Breweries, Enugu')
  return(
    <Routes> {/* Routes container */}
      <Route path={urls.root} element={<Layout />}>{/* Root route */}
        {/* Public routes */}
        <Route index element={<Landing />} />
        <Route path={`/${urls.signin}`} element={<Login />} />
        <Route path={`/register/admin`} element={<Signup />} />
        <Route path={`/register`} element={<Register />} />

        {/* Protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route element={<Prefetch />}>
              {/* Dashboard route */}
              <Route path='dashboard' element={<DashboardLayout />}>
                <Route index element={<Dashboard />} /> {/* Dashboard landing */}

                {/* Users routing */}
                <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
                  <Route path='users'>
                    <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                      <Route index element={<Users />} />
                      <Route path=':id' element={<EditUser />} />
                    </Route>
                  </Route>
                </Route>

                {/* Staffs routing */}
                <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
                  <Route path='staffs'>
                    <Route index element={<Staffs />} />
                    <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                      <Route path=':id' element={<EditStaff />} />
                      <Route path='new' element={<NewStaffForm />} />
                    </Route>
                  </Route>
                </Route>

                {/* Customers routing */}
                <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Staff]} />}>
                  <Route path='customers'>
                    <Route index element={<Customers />} />
                    <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />} >
                      <Route path=':id' element={<EditCustomer />} />
                      <Route path='new' element={<NewCustomerForm />} />
                    </Route>
                  </Route>
                </Route>

                {/* Categories routing */}
                <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
                  <Route path='categories'>
                    <Route index element={<Categories />} />
                    <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Staff]} />} >
                      <Route path=':id' element={<EditCategory />} />
                      <Route path='new' element={<NewCategoryForm />} />
                    </Route>
                  </Route>
                </Route>

                {/* Products routing */}
                <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
                  <Route path='products'>
                    <Route index element={<Products />} />
                    <Route path='customer' element={<CustomerProducts />} />
                    <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Staff]} />} >
                      <Route path=':id' element={<EditProduct />} />
                      <Route path='new' element={<NewProductForm />} />
                    </Route>
                  </Route>
                </Route>

              </Route>
            </Route>
          </Route>
        </Route>

      </Route>
    </Routes>
  )
}

export default App