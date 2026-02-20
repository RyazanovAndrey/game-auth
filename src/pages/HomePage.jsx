import { RiAtLine, RiGitRepositoryPrivateLine, RiUserLine } from "@remixicon/react"
import { useState } from "react"
import { useAuth } from "../context/AuthProvider"
import { useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"

const HomePage = () => {

  const [mode, setMode] = useState('login')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const [loading, setLoading] = useState(false)

  const { login, register } = useAuth()

  const navigate = useNavigate()

  const toggleMode = () => {
    setMode(mode == 'login' ? 'register' : 'login')
    setErrorMessage(null)
  }

  const changeName = (event) => {
    setErrorMessage(null)
    setName(event.target.value)
  }

  const changeEmail = (event) => {
    setErrorMessage(null)
    setEmail(event.target.value)
  }

  const changePassword = (event) => {
    setErrorMessage(null)
    setPassword(event.target.value)
  }

  const loadingSpinRegister = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setMode('login')
    }, 4000)
  }

  const loadingSpinLogin = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/dashboard')
    }, 3000)
  }


  const handleSubmit = (event) => {
    event.preventDefault()

    const currentEmail = /^\S+@\S+\.\S+$/
    let response = null

    if (!email || !password) {
      return setErrorMessage('All fields are required!')
    }

    if (mode == 'register' && !name) {
      return setErrorMessage('The login field is empty!')
    }

    if (!currentEmail.test(email)) {
      return setErrorMessage('Incorrect email!')
    }

    if (password.length <= 3) {
      return setErrorMessage('Password must be at least 3 digits!')
    }

    if (mode == 'register') {
      response = register(name, email, password)

    } else {
      response = login(email, password)
    }

    if (!response.success) {
      return setErrorMessage(response.message)
    }

    if (mode == 'register') {
      loadingSpinRegister()
    } else {
      loadingSpinLogin()
    }

  }

  return (
    <section className="grid place-items-center min-h-screen">
      <div className="bg-white w-1/2 grid grid-cols-2 border border-gray-700">
        <div className="left-col"></div>
        <div className="bg-form px-8 py-3 text-center text-white">
          <h2 className="text-3xl mb-5">{mode == 'login' ? 'Welcome' : 'Register'}</h2>
          {errorMessage ? <p className="text-red-500">{errorMessage}</p> : <p className="text-gray-400">{mode == 'login' ? 'Please enter your email and password' : 'Please enter your name, email and password'}</p>}

          <form action="" className="space-y-2 mt-5" onSubmit={handleSubmit}>
            {mode == 'register' && (
              <>
                <div className="relative">
                  <input type="text" onChange={changeName} placeholder="Name" className={errorMessage ? 'input-filed error' : 'input-filed'} />
                  <RiUserLine className="absolute top-0 left-3 translate-y-[70%] icon" size={18} />
                </div>
              </>
            )}
            <div className="relative">
              <input type="text" onChange={changeEmail} placeholder="Email" className={errorMessage ? 'input-filed error' : 'input-filed'} />
              <RiAtLine className="absolute top-0 left-3 translate-y-[70%] icon" size={18} />
            </div>
            <div className="relative">
              <input type="password" onChange={changePassword} placeholder="Password" className={errorMessage ? 'input-filed error' : 'input-filed'} />
              <RiGitRepositoryPrivateLine className="absolute top-0 left-3 translate-y-[70%] icon" size={18} />
            </div>
            <div className="flex gap-x-2 items-center">
              {mode == 'login' ? (
                <>
                  <input type="checkbox" id="check-1" />
                  <label htmlFor="check-1" className="cursor-pointer">Remember me</label>
                </>
              ) : <>
                <input type="checkbox" id="check-1" />
                <label htmlFor="check-1" className="cursor-pointer">I agree to the Terms & Conditions</label>
              </>}
            </div>
            <button type="submit" className="bg-btn w-full h-10 rounded-md cursor-pointer">
              {loading && mode == 'login' && <Spinner />}
              {loading && mode == 'register' && <Spinner />}
              {mode == 'login' && !loading && 'Login'}
              {mode == 'register'&& !loading && 'Register'}
            </button>
          </form>

          <p className="text-gray-400 underline cursor-pointer my-5">Forget password?</p>
          <div className="grid grid-cols-[1fr_100px_1fr] items-center">
            <hr />
            <div className="">{mode == 'login' ? 'Or' : 'Or register with'}</div>
            <hr />
          </div>
          {mode == 'login' ? (
            <div className="text-gray-400">Don`t have an account? <span onClick={toggleMode} className="text-btn underline cursor-pointer">Register now!</span></div>
          ) : (
            <div className="text-gray-400">Already have an account? <span onClick={toggleMode} className="text-btn underline cursor-pointer">Login</span></div>
          )}
        </div>
      </div>
    </section>
  )
}

export default HomePage