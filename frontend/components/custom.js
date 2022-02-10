import { useState, useEffect } from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/quotes'

export function useQuotes() {
  const [quotes, setQuotes] = useState([])
  useEffect(() => {
    axios.get(URL)
      .then(res => {
        setQuotes(res.data.quotes)
      })
      .catch(err => {
        debugger
      })
  }, [])
  return quotes
}

export function useForm(...inputNames) {
  const [form, setForm] = useState(() => { // callback that returns the initial state
    let initialState = {}
    inputNames.forEach(name => {
      initialState[name] = window.localStorage.getItem(name) || ''
    })
    return initialState
  })
  const onChange = evt => {
    const { name, value } = evt.target
    window.localStorage.setItem(name, value)
    setForm({ ...form, [name]: value })
  }
  return [form, onChange]
}

export function useStateLS(key, initialValue) {
  const setIt = val => window.localStorage.setItem(key, JSON.stringify(val))
  const [value, setValue] = useState(() => {
    const item = window.localStorage.getItem(key)
    if (item) {
      return JSON.parse(item)
    }
    setIt(initialValue)
    return initialValue
  })
  const setValueLS = newValue => {
    setIt(newValue)
    setValue(newValue)
  }
  return [value, setValueLS]
}

export function useFormImproved(key, formValues) {
  const [form, setForm] = useStateLS(key, formValues)
  const onChange = evt => {
    const { name, value } = evt.target
    setForm({ ...form, [name]: value })
  }
  return [form, onChange]
}