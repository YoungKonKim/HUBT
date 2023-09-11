import { Text, View, FlatList, StyleSheet } from 'react-native';
import CarInfoItem from './CarInfoItem';
import PropTypes from 'prop-types';
import { GRAY } from '../colors';
import { useEffect } from 'react';
import event, { EventTypes } from '../event';
import { useUserState } from '../contexts/UserContext';
import useCarInfo from '../hooks/useCarInfo';

const CarInfoList = ({ isMyCarInfo }) => {
  const [user] = useUserState();
  const {
    data,
    fetchNextPage,
    refetch,
    refetching,
    deleteCarInfo,
    updateCarInfo,
  } = useCarInfo(isMyCarInfo && user.uid);

  // Data가변경(입력,수정,삭제)되고나면 화면의 목록을 업데이트하기위한작업
  useEffect(() => {
    event.addListener(EventTypes.REFRESH, refetch);
    event.addListener(EventTypes.DELETE, deleteCarInfo);
    //수정된자료만 화면목록에서 변경해주려면 변경된자료를 넘겨주는 방법을 찾아야함.
    // event.addListener(EventTypes.UPDATE, updateCarInfo);

    return () => event.removeAllListeners();
  }, [refetch, deleteCarInfo, updateCarInfo]);

  return (
    <View>
      <Text style={styles.title}>(내차 리스트)</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => <CarInfoItem carinfo={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator}></View>}
        onEndReached={fetchNextPage}
        refreshing={refetching}
        refetch={refetch}
      />
    </View>
  );
};

CarInfoList.propTypes = {
  isMyCarInfo: PropTypes.bool,
};

const styles = StyleSheet.create({
  separator: {
    marginVertical: 20,
    borderBottomColor: GRAY.LIGHT,
    borderBottomWidth: 0.5,
  },
  title: {
    marginTop: 20,
    fontSize: 17,
    fontWeight: '700',
    left: 20,
    marginBottom: 10,
  },
});

export default CarInfoList;
