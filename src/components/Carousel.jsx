import slider1 from '/images/slider-1.png'
import slider3 from '/images/slider-3.png'
import Image from './Image'

function Carousel() {
    return (
      <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        </div>
  
        <div className="carousel-inner">
          <div className="carousel-item active">
            <Image src={slider1} className="d-block w-100" alt="First slide"/>
          </div>
  
          <div className="carousel-item">
            <Image src={slider3} className="d-block w-100" alt="Second slide"/>
          </div>
        </div>
  
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
  
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    )
}
  
export default Carousel  