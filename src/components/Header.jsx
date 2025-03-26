import logo from '../images/Chef_Claude_Icon.png'

export default function Header(){
    return(
        <header>
        <img className='logo' src={logo}/>
        <h1 className="HeaderTitle">Chef Claude</h1>
        </header>
    )
}