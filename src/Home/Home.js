import './Home.css'
import todoGirl from './todoGirl.png'

const Home = (props) => {
    return (
        <div className='landing'>
            <div className="hero-section">
                <div className="hero">
                    Create Todos and 
                    never <br/> miss a task!
                </div>
                <br/>
                <button className="get-started-btn">Get Started</button>
            </div>
            <div className="image-section">
                <img src={todoGirl} alt="girl_with_todos" height="450px"/>
            </div>
        </div>
      );
}
 
export default Home;