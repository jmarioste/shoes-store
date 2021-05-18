import { useEffect, useRef, useState } from "react";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function useFetch(url) {
  const isMounted = useRef(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //useEffect will run once component is mounted.
    isMounted.current = true;
    async function init() {
      
      try {
        const response = await fetch(baseUrl + url);
        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData);
        } else {
          throw response;
        }
      } catch (error) {
        if(isMounted.current) setError(error);
      } finally {
        if(isMounted.current) setLoading(false);
      }
    }
    init();

    //return function will run once component is unmounted.
    return ()=>{
      isMounted.current = false;
    }
  }, [url]);

  return {
    data,
    loading,
    error,
  };
}
