import classNames from 'classnames';
import Footer from '../Footer'
import Header from '../Header';



const BasicLayout = ({children, className}) => {
    return (
        <div className="layout_container flex flex-col items-center justify-between">
            <Header/>
            <div className="container">
                <div class="lines">
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                </div>
                <div className={classNames("h1",{
                    [className] : className
                })}>
                    {children}
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default BasicLayout
