import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import StockListCard from './src/components/stockItemCard';
import TotalStockValue from './src/components/totalStocksValue';

const StockList = () => {
  const [userHoldings, setUserHoldings] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(()=>{
    fetch('https://run.mocky.io/v3/bde7230e-bc91-43bc-901d-c79d008bddc8') // api for the get request
    .then(response => response.json())
    .then(data => {
      setLoading(false)
      setUserHoldings(data?.userHolding)
    });
  },[])

  const renderItem = useCallback(({ item }) => (
    <StockListCard {...item}/>
  ),[]);

  if(isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={"large"}/>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Upstox Holdings</Text>
      <FlatList
        data={userHoldings}
        ItemSeparatorComponent={() => (
          <View style={{ backgroundColor: "grey", height: 1 }} />
        )}
        renderItem={renderItem}
        keyExtractor={(item) => item?.symbol}
      />
      <TotalStockValue userHoldings={userHoldings}/>
    </View>
  );
}

export default StockList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    backgroundColor: "grey",
    justifyContent: 'center',
  },
  heading: {
    color: "white",
    backgroundColor: "purple",
    padding: 8,
    fontWeight: "900",
    fontSize: 20
  }
});
