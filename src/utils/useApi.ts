/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";

const useApi = <M extends (params: any) => Promise<any>> (
  method: M,
  ...parameters: Parameters<M>
) => {
  const [data, setData] = useState<null | Awaited<ReturnType<M>>>(null)
  const [error, setError] = useState<null | Error>(null)
  const [loading, setLoading] = useState(false)

  // Primitive to use as dependency
  const paramsJsonString = JSON.stringify(parameters)

  const getData = useCallback(async () => {

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const params: Parameters<M> = JSON.parse(paramsJsonString);
      // @ts-expect-error: TS2556
      const response = await method(...params);
      setData(response);
    } catch (e) {
      console.error(e);
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  }, [method, paramsJsonString])

  useEffect(() => {
    getData()
  }, [method, paramsJsonString, getData])

  return { data, error, loading, refresh: getData }
}

export default useApi;
