import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/AuthSlice'

function Header() {
  const [isShowed, setShowed] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onClick = (e) => {
    isShowed === '' ? setShowed('show') : setShowed('')
  }

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }

  return (
    <nav className='navbar navbar-expand-md border-bottom'>
      <div className='container'>

        <div className='logo'>
          <Link to='/' className='navbar-brand'>Book Record</Link>
        </div>

        <button
          className='navbar-toggler'
          type='buton'
          data-bs-toggle='collapse'
          data-bs-target='#to-collapse'
          aria-expanded='false'
          onClick={onClick}
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className={'navbar-collapse collapse' + isShowed} id='to-collapse'>
          <ul className='navbar-nav ms-auto'>

            {user ? (
              <li className='nav-item'>
                <button className='btn btn-danger' onClick={onLogout}>
                  <i className='bi bi-person'></i> Logout
                </button>
              </li>
            ) : (
              <>
                <li className='nav-item'>
                  <Link to='/login' className='nav-link' onClick={onClick}>
                    <i className='bi bi-person'></i> Login
                  </Link>
                </li>

                <li className='nav-item'>
                  <Link to='/register' className='nav-link' onClick={onClick}>
                  <i className='bi bi-person'></i> Register
                </Link>
                </li>
              </>
            )}

            {/* <li className='nav-item'>
              <Link to='/login' className='nav-link' onClick={onClick}>
                <i className='bi bi-person'></i> Login
              </Link>
            </li>

            <li className='nav-item'>
              <Link to='/register' className='nav-link' onClick={onClick}>
              <i className='bi bi-person'></i> Register
            </Link>
            </li> */}

          </ul>
        </div>

      </div>
    </nav>
  )
}

export default Header