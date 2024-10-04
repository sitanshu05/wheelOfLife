import { Route, Routes } from 'react-router-dom'
import { ROUTES } from './RouterConfig';
import Home from '../pages/Home';
import Soul from '../pages/Soul';
import Body from '../pages/Body';
import Mind from '../pages/Mind';
import Romance from '../pages/Romance';
import Family from '../pages/Family';
import Friends from '../pages/Friends';
import Mission from '../pages/Mission';
import Growth from '../pages/Growth';
import Money from '../pages/Money';
import Joy from '../pages/Joy';
import Wheel from '../pages/Wheel';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import AllWheels from '../pages/AllWheels';
import Profile from '../pages/Profile';
import ProtectedRoutes from "../utils/ProtectedRoutes"
import ChangePassword from '../pages/ChangePassword';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
const Router = () => {

    const RouteWithRole : React.FunctionComponent<{ Element: React.FunctionComponent }> = ({ Element }) => {
        return <Element/>
     
      }

      return (
        <Routes>
            <Route path={ROUTES.Home} element={<RouteWithRole Element={Home} />}></Route>
            <Route path={ROUTES.Soul} element={<RouteWithRole Element={Soul} />}></Route>
            <Route path={ROUTES.Body} element={<RouteWithRole Element={Body} />}></Route>
            <Route path={ROUTES.Mind} element={<RouteWithRole Element={Mind} />}></Route>
            <Route path={ROUTES.Romance} element={<RouteWithRole Element={Romance} />}></Route>
            <Route path={ROUTES.Family} element={<RouteWithRole Element={Family} />}></Route>
            <Route path={ROUTES.Friends} element={<RouteWithRole Element={Friends} />}></Route>
            <Route path={ROUTES.Mission} element={<RouteWithRole Element={Mission} />}></Route>
            <Route path={ROUTES.Growth} element={<RouteWithRole Element={Growth} />}></Route>
            <Route path={ROUTES.Money} element={<RouteWithRole Element={Money} />}></Route>
            <Route path={ROUTES.Joy} element={<RouteWithRole Element={Joy} />}></Route>
            <Route path={ROUTES.Wheel} element={<RouteWithRole Element={Wheel} />}></Route>
            <Route path={ROUTES.ForgotPassword} element={<RouteWithRole Element={ForgotPassword} />}></Route>
            <Route path={ROUTES.ResetPassword} element={<RouteWithRole Element={ResetPassword} />}></Route>
            <Route element={<ProtectedRoutes/>}>
              <Route path={ROUTES.AllWheels} element={<RouteWithRole Element={AllWheels} />}></Route>
              <Route path={ROUTES.Profile} element={<RouteWithRole Element={Profile} />}></Route>
              <Route path={ROUTES.ChangePassword} element={<RouteWithRole Element={ChangePassword} />}></Route>
            </Route>
            <Route path={ROUTES.Login} element={<RouteWithRole Element={Login} />}></Route>
            <Route path={ROUTES.SignUp} element={<RouteWithRole Element={SignUp} />}></Route>
        </Routes>
      )
}

export default Router;