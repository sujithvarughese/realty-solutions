import { useEffect, useState } from 'react'
import axios from 'axios'
import { config } from '../utils/constants.js'

const UseAxios = ({ url, method }) => {

  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)
  const [data, setData] = useState(null)

  const submitData = values => setData(values)

  const fetchData = async () => {
    try {
      const res = await axiosDB({ method, url, data })
      setResponse(res.data)
      setData(null)
      console.log(res.data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (data) {
      fetchData()
    }
  }, [data])


  return { response, error, loading, submitData, fetchData }
}

export const axiosDB = axios.create({
  baseURL: config.url.API_URL,
  withCredentials: true
});
// response
axiosDB.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // console.log(error.response)
    return Promise.reject(error);
  }
);
export default UseAxios