import { useState, useEffect } from 'react'
import axios from 'axios'
import './AboutUs.css'

/**
 * A React component that shows the About Us page, with all of its content fetched from the back-end.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const AboutUs = props => {
  const [aboutUs, setAboutUs] = useState(null)
  const [error, setError] = useState('')

  // fetch the About Us content from the back-end once, when the component first loads
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_HOSTNAME}/about-us`)
      .then(response => {
        // axios bundles up all response data in response.data property
        setAboutUs(response.data)
      })
      .catch(err => {
        setError('Failed to load the About Us page from the server.')
      })
  }, []) // putting a blank array as second argument will cause this function to run only once when component first loads

  if (error) return <p className="AboutUs-error">{error}</p>
  if (!aboutUs) return <p>Loading...</p>

  return (
    <>
      <h1>{aboutUs.title}</h1>
      <img
        className="AboutUs-photo"
        src={aboutUs.githubImageURL}
        alt="Gangwon Suh"
      />
      {aboutUs.paragraphs.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </>
  )
}

// make this component available to be imported into any other file
export default AboutUs
