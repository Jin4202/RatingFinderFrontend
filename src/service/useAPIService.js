import React, { useEffect, useState } from "react";

/**
 * CUSTOM HOOK to call API Service functions
 */
const apiStatus = {
  loading: "loading",
  complete: "complete",
  error: "error",
};
/**
 *
 * @param {Function} service - API Service function to call upon and make request. List of API functions are in the APIService.js file
 * @param {*} dependencies - the dependencies that are needed if need to recall the api 
 * @returns
 */
const useAPIService = (service, dependencies) => {
  const [status, setStatus] = useState(apiStatus.loading);
  const [data, setData] = useState(null);

  useEffect(() => {
    service()
      .then((data) => {
        //data is an object so we need to do data.data to get the array
        setStatus(apiStatus.complete);
        setData(data.data);
      })
      .catch(() => {
        setStatus(apiStatus.error);
      });
  }, dependencies);

  // return {
  //   loading: status === apiStatus.loading,
  //   apiData: data,
  //   error: status === apiStatus.error,
  // };

  return [status === apiStatus.loading, data, status === apiStatus.error];
};

export default useAPIService;
