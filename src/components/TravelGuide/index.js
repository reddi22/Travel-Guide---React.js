import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

class TravelGuide extends Component {
  state = {loader: true, travelData: []}

  componentDidMount() {
    this.getTravelData()
  }

  getTravelData = async () => {
    const url = 'https://apis.ccbp.in/tg/packages'

    const response = await fetch(url)
    const data = await response.json()
    const updateData = data.packages.map(each => ({
      id: each.id,
      name: each.name,
      imageUrl: each.image_url,
      description: each.description,
    }))

    this.setState({travelData: updateData, loader: false})
  }

  render() {
    const {loader, travelData} = this.state

    return (
      <div className="app-container">
        <h1 className="heading"> Travel Guide</h1>

        {loader ? (
          <div data-testid="loader" className="loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          <ul className="travel-cards-container">
            {travelData.map(each => (
              <li key={each.id} className="travel-card">
                <img
                  className="travel-image"
                  src={each.imageUrl}
                  alt={each.name}
                />
                <h1 className="travel-heading"> {each.name}</h1>
                <p className="travel-description"> {each.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default TravelGuide
