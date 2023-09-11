import { useRef } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { getCarInfos } from '../api/carinfo';

const useCarInfo = (uid) => {
  const [data, setData] = useState([]);
  const [refetching, setRefetching] = useState(false);

  const isLoadingRef = useRef(null);

  const fetchNextPage = useCallback(async () => {
    if (!isLoadingRef.current) {
      isLoadingRef.current = true;
      const list = await getCarInfos(uid);
      if (list.length > 0) {
        setData(list);
      }
      isLoadingRef.current = false;
    }
  }, [uid]);

  const refetch = async () => {
    setRefetching(true);
    await fetchNextPage();
    setRefetching(false);
  };

  useEffect(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const deleteCarInfo = ({ id }) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  //Database는 수정했고 화면만 업데이트하면돼
  //setData를 만들때 변경되지않은것을 그대로하고 변경된 것만 수정
  const updateCarInfo = (carinfo) => {
    setData((prev) =>
      prev.map((item) => (item.id === carinfo.id ? carinfo : item))
    );
  };
  return {
    data,
    fetchNextPage,
    refetch,
    refetching,
    deleteCarInfo,
    updateCarInfo,
  };
};

export default useCarInfo;
