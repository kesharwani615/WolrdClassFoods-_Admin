import React from 'react'
import { CirclesWithBar } from 'react-loader-spinner'

const TableLoading = () => {
  return (
    <>
      <span className="circlesWithBar_width"><CirclesWithBar
                                          height="100"
                                          width="100"
                                          color="#4fa94d"
                                          outerCircleColor="#4fa94d"
                                          innerCircleColor="#4fa94d"
                                          barColor="#4fa94d"
                                          ariaLabel="circles-with-bar-loading"
                                          wrapperStyle={{}}
                                          wrapperClass=""
                                          visible={true}
                                          /></span>
    </>
  )
}

export default TableLoading
