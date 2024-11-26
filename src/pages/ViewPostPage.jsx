import React from 'react'
import Navbar from '../components/NavBar'
import ViewPost from '../components/ViewPost'

const ViewPostPage = () => {
  return (
    <>
         <Navbar />
         <div style={{ marginTop: '20px' }}>
            <ViewPost></ViewPost>
        </div>
    </>
  )
}

export default ViewPostPage